import { 
  Component, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy, 
  HostListener,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// --- THREE.js Imports ---
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';

@Component({
  selector: 'app-3d-animation-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="canvas-wrapper" #wrapper>
      <canvas #canvas></canvas>
      <div #interactionHint class="interaction-hint"></div>
    </div>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
      display: block;
      position: relative;
      min-height: 500px;
      background: transparent;
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .canvas-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      min-height: 500px;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .interaction-hint {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      padding: 16px 24px;
      font-size: 15px;
      font-weight: 400;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      text-align: center;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      letter-spacing: 0.5px;
    }

    @keyframes fadeInOut {
      0%, 100% { opacity: 0; }
      10%, 90% { opacity: 1; }
    }

    @media (max-width: 768px) {
      :host {
        min-height: 400px;
      }
      
      .canvas-wrapper {
        min-height: 400px;
      }

      .interaction-hint {
        font-size: 14px;
        padding: 14px 20px;
        border-radius: 14px;
      }
    }

    @media (max-width: 480px) {
      :host {
        min-height: 300px;
      }
      
      .canvas-wrapper {
        min-height: 300px;
      }
    }
  `]
})
export class ThreeDAnimationDemoComponent implements AfterViewInit, OnDestroy {
  // --- DOM Element References ---
  @ViewChild('canvas', { static: false }) private canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('interactionHint') private interactionHintRef!: ElementRef<HTMLDivElement>;
  @ViewChild('wrapper') private wrapperRef!: ElementRef<HTMLDivElement>;

  // --- THREE.js Core Components ---
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private bloomPass!: UnrealBloomPass;
  private bokehPass!: BokehPass;
  private lensDistortionPass!: ShaderPass;

  // --- Lights (store as references) ---
  private pointLight1!: THREE.PointLight;
  private pointLight2!: THREE.PointLight;

  // --- Geometries & Collections ---
  private celestialObjects: THREE.Mesh[] = [];
  private confettiParticles: THREE.Mesh[] = [];
  private planetGeometries: {
    large: THREE.BoxGeometry;
    medium: THREE.BoxGeometry;
    small: THREE.BoxGeometry;
    tiny: THREE.BoxGeometry;
  } | null = null;
  private particleGeometry: THREE.BoxGeometry | null = null;
  private groundGeometry: THREE.PlaneGeometry | null = null;

  // --- Animation & Interaction State ---
  private cameraAngle = 0;
  private cameraRadius = 30;
  private cameraHeight = 15;
  private bobbleTime = 0;
  private mouse = { x: 0, y: 0 };
  private targetRotation = { x: 0, y: 0 };
  private currentRotation = { x: 0, y: 0 };
  private isInteracting = false;
  private touchStartX = 0;
  private touchStartY = 0;
  private hasInteracted = false;
  private resizeTimeout: any;
  private animationFrameId: number = 0;
  private isBrowser = false;
  private intersectionObserver: IntersectionObserver | null = null;

  // --- i18n & Constants ---
  private translations: { [key: string]: { desktop: string, mobile: string } } = {
    'pt-BR': {
      desktop: 'Mova o mouse para explorar',
      mobile: 'Deslize ou incline para explorar'
    },
    'en-US': {
      desktop: 'Move your mouse to explore',
      mobile: 'Swipe or tilt to explore'
    }
  };
  private t: { desktop: string, mobile: string };
  private readonly isMobile: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = this.isBrowser && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const userLang = this.isBrowser ? (navigator.language || (navigator as any).userLanguage || 'pt-BR') : 'pt-BR';
    const lang = userLang.startsWith('en') ? 'en-US' : 'pt-BR';
    this.t = this.translations[lang];
  }

  // --- Angular Lifecycle Hooks ---

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      console.log('3D Animation: Not in browser, skipping initialization');
      return;
    }
    
    console.log('3D Animation: Component initialized, starting Three.js setup');
    
    try {
      this.initThree();
      this.initInteraction();
      this.animate();
    } catch (error) {
      console.error('3D Animation: Error during initialization:', error);
    }
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    
    // Stop animation loop
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // Clean up event listeners
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.requestPermission);
    }

    // Disconnect intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    // Dispose of all Three.js objects
    try {
      if (this.planetGeometries) {
        Object.values(this.planetGeometries).forEach(geo => geo.dispose());
      }
      if (this.particleGeometry) {
        this.particleGeometry.dispose();
      }
      if (this.groundGeometry) {
        this.groundGeometry.dispose();
      }

      if (this.scene) {
        this.scene.traverse((object) => {
          const asMesh = object as THREE.Mesh;
          if (asMesh.geometry) {
            asMesh.geometry.dispose();
          }
          if (asMesh.material) {
            const materials = Array.isArray(asMesh.material) ? asMesh.material : [asMesh.material];
            materials.forEach(material => {
              if ('map' in material && material.map) (material.map as THREE.Texture).dispose();
              material.dispose();
            });
          }
        });
      }
      
      if (this.renderer) {
        this.renderer.dispose();
      }
      if (this.composer) {
        (this.composer as any).dispose();
      }
      if (this.scene) {
        this.scene.clear();
      }
    } catch (e) {
      console.error("Error during Three.js cleanup:", e);
    }
  }

  // --- HostListeners for Window Events ---

  @HostListener('window:resize')
  onWindowResize(): void {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (!this.canvasRef) return;
      
      const canvas = this.canvasRef.nativeElement;
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || 500;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.composer.setSize(width, height);
      
      (this.bokehPass.uniforms as any)['aspect'].value = width / height;
      this.lensDistortionPass.uniforms['aspectRatio'].value = width / height;
      this.bloomPass.resolution.set(width, height);
    }, 100);
  }

  @HostListener('window:mousemove', ['$event'])
  onWindowMouseMove(event: MouseEvent): void {
    this.hideHintOnInteraction();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.targetRotation.x = this.mouse.y * 0.5;
    this.targetRotation.y = this.mouse.x * 0.5;
  }

  @HostListener('window:touchstart', ['$event'])
  onWindowTouchStart(event: TouchEvent): void {
    this.hideHintOnInteraction();
    if (event.touches.length === 1) {
      this.isInteracting = true;
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  }

  @HostListener('window:touchmove', ['$event'])
  onWindowTouchMove(event: TouchEvent): void {
    if (event.touches.length === 1 && this.isInteracting) {
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;
      
      const deltaX = (touchX - this.touchStartX) / window.innerWidth;
      const deltaY = (touchY - this.touchStartY) / window.innerHeight;
      
      this.targetRotation.y += deltaX * 2;
      this.targetRotation.x -= deltaY * 2;
      this.targetRotation.x = Math.max(-1, Math.min(1, this.targetRotation.x));
      
      this.touchStartX = touchX;
      this.touchStartY = touchY;
    }
  }

  @HostListener('window:touchend')
  onWindowTouchEnd(): void {
    this.isInteracting = false;
  }

  @HostListener('window:deviceorientation', ['$event'])
  onWindowDeviceOrientation(event: DeviceOrientationEvent): void {
    this.hideHintOnInteraction();
    if (event.beta !== null && event.gamma !== null) {
      this.targetRotation.x = (event.beta - 90) / 90;
      this.targetRotation.y = event.gamma / 90;
      this.targetRotation.x = Math.max(-1, Math.min(1, this.targetRotation.x));
      this.targetRotation.y = Math.max(-1, Math.min(1, this.targetRotation.y));
    }
  }

  // --- Initialization Methods ---

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.parentElement?.clientHeight || 500;

    console.log('Initializing Three.js with dimensions:', width, 'x', height);

    // Initialize geometries first
    this.planetGeometries = {
      large: new THREE.BoxGeometry(1, 1, 1),
      medium: new THREE.BoxGeometry(1, 1, 1),
      small: new THREE.BoxGeometry(1, 1, 1),
      tiny: new THREE.BoxGeometry(1, 1, 1)
    };
    this.particleGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.groundGeometry = new THREE.PlaneGeometry(200, 200);

    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000510, 30, 120);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 15, 30);
    this.camera.lookAt(0, 0, 0);

    // Renderer with canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.setClearColor(0x000000, 0); // Transparent
    this.renderer.shadowMap.enabled = false;

    console.log('Renderer initialized');

    // Render Target & Composer
    const depthTexture = new THREE.DepthTexture(width, height);
    depthTexture.type = THREE.UnsignedShortType;
    const renderTarget = new THREE.WebGLRenderTarget(width, height, {
      format: THREE.RGBAFormat,
      depthTexture: depthTexture,
      depthBuffer: true
    });
    this.renderer.setRenderTarget(renderTarget);

    this.composer = new EffectComposer(this.renderer, renderTarget);
    this.composer.renderTarget1 = renderTarget;

    // Lighting
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const directionalLight = new THREE.DirectionalLight(0xffa500, 1.5);
    directionalLight.position.set(10, 20, 10);
    this.scene.add(directionalLight);
    
    this.pointLight1 = new THREE.PointLight(0xff00ff, 2, 50);
    this.pointLight1.position.set(-15, 10, -15);
    this.scene.add(this.pointLight1);
    
    this.pointLight2 = new THREE.PointLight(0x00ffff, 2, 50);
    this.pointLight2.position.set(15, 10, 15);
    this.scene.add(this.pointLight2);

    console.log('Lights added');

    // Create Objects
    this.createCelestialObjects();
    this.createConfetti();

    console.log('Objects created:', this.celestialObjects.length, 'celestial,', this.confettiParticles.length, 'particles');

    // Ground
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0520, metalness: 0.2, roughness: 0.9,
      emissive: 0x1a0a3a, emissiveIntensity: 0.3,
      transparent: true, opacity: 0.3
    });
    const ground = new THREE.Mesh(this.groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -20;
    this.scene.add(ground);

    // Post-processing Passes
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
    this.composer.addPass(this.bloomPass);

    this.bokehPass = new BokehPass(this.scene, this.camera, {
      focus: 25.0, aperture: 0.0001, maxblur: 0.01
    });
    this.composer.addPass(this.bokehPass);

    this.initLensDistortionPass();
    
    console.log('Three.js initialization complete');
  }

  private initLensDistortionPass(): void {
    const lensDistortionShader = {
      uniforms: {
        'tDiffuse': { value: null },
        'strength': { value: 0.15 },
        'height': { value: 1.0 },
        'aspectRatio': { value: window.innerWidth / window.innerHeight },
        'cylindricalRatio': { value: 1.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float strength;
        uniform float aspectRatio;
        varying vec2 vUv;
        void main() {
            vec2 h = vec2(vUv.x, vUv.y);
            vec2 center = vec2(0.5, 0.5);
            float r2 = (aspectRatio * (h.x - center.x)) * (aspectRatio * (h.x - center.x)) 
                       + ((h.y - center.y) * (h.y - center.y));
            float f = 1.0 + r2 * strength;
            vec2 distortedUv = f * (h - center) + center;
            if (distortedUv.x < 0.0 || distortedUv.x > 1.0 || distortedUv.y < 0.0 || distortedUv.y > 1.0) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); // Transparent
            } else {
                gl_FragColor = texture2D(tDiffuse, distortedUv);
            }
        }`
    };
    this.lensDistortionPass = new ShaderPass(lensDistortionShader);
    this.composer.addPass(this.lensDistortionPass);
  }

  private initInteraction(): void {
    // Set hint text
    if (this.interactionHintRef && this.isBrowser) {
      this.interactionHintRef.nativeElement.textContent = this.isMobile ? this.t.mobile : this.t.desktop;
    }

    // Show initial hint
    this.showHintTemporarily(4000);

    // iOS 13+ Gyroscope permission
    if (this.isBrowser && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      document.addEventListener('click', this.requestPermission, { once: true });
    }

    // Intersection observer for re-showing hint on scroll
    this.initIntersectionObserver();
  }

  private initIntersectionObserver(): void {
    if (!this.isBrowser || !this.wrapperRef) return;

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && this.hasInteracted) {
          this.showHintTemporarily();
        }
      });
    }, { threshold: 0.1 });

    this.intersectionObserver.observe(this.wrapperRef.nativeElement);
  }

  private requestPermission = (): void => {
    if (!this.isBrowser) return;
    
    (DeviceOrientationEvent as any).requestPermission()
      .then((permissionState: string) => {
        if (permissionState === 'granted') {
          console.log('Device orientation permission granted');
        }
      })
      .catch(console.error);
  }

  // --- Object Creation Methods ---

  private createCelestialObjects(): void {
    if (!this.planetGeometries) return;
    
    const planetColors = [
      { color: 0xff6b35, emissive: 0xff4400 }, { color: 0x4a90e2, emissive: 0x2266cc },
      { color: 0xffd700, emissive: 0xffaa00 }, { color: 0x9b59b6, emissive: 0x7733aa },
      { color: 0x1abc9c, emissive: 0x00aa77 }, { color: 0xe74c3c, emissive: 0xcc2211 },
      { color: 0xf39c12, emissive: 0xdd7700 }, { color: 0x3498db, emissive: 0x1166aa }
    ];

    // Planets
    for (let i = 0; i < 8; i++) {
      const planetData = planetColors[i % planetColors.length];
      const radius = Math.random() * 3 + 1.5;
      const material = new THREE.MeshStandardMaterial({
        color: planetData.color, metalness: 0.3, roughness: 0.7,
        emissive: planetData.emissive, emissiveIntensity: 0.4
      });
      const planet = new THREE.Mesh(this.planetGeometries.large, material);
      planet.scale.setScalar(radius);
      
      const angle = (i / 8) * Math.PI * 2;
      const distance = Math.random() * 25 + 15;
      planet.position.set(Math.cos(angle) * distance, Math.random() * 20 - 10, Math.sin(angle) * distance);
      
      planet.userData = {
        rotationSpeed: Math.random() * 0.01 + 0.002,
        orbitSpeed: Math.random() * 0.001 + 0.0005,
        orbitRadius: distance, orbitAngle: angle, orbitHeight: planet.position.y
      };
      this.scene.add(planet);
      this.celestialObjects.push(planet);
    }
    
    // Asteroids/Moons
    for (let i = 0; i < 15; i++) {
      const radius = Math.random() * 0.8 + 0.3;
      const planetData = planetColors[Math.floor(Math.random() * planetColors.length)];
      const material = new THREE.MeshStandardMaterial({
        color: planetData.color, metalness: 0.5, roughness: 0.8,
        emissive: planetData.emissive, emissiveIntensity: 0.3
      });
      const asteroid = new THREE.Mesh(this.planetGeometries.small, material);
      asteroid.scale.setScalar(radius);
      asteroid.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50);
      asteroid.userData = {
        rotationSpeed: Math.random() * 0.02 + 0.005,
        orbitSpeed: Math.random() * 0.002 + 0.001,
        orbitRadius: Math.sqrt(asteroid.position.x ** 2 + asteroid.position.z ** 2),
        orbitAngle: Math.atan2(asteroid.position.z, asteroid.position.x),
        orbitHeight: asteroid.position.y
      };
      this.scene.add(asteroid);
      this.celestialObjects.push(asteroid);
    }
    
    // Stars
    for (let i = 0; i < 50; i++) {
      const starRadius = Math.random() * 0.3 + 0.1;
      const starColor = Math.random() > 0.5 ? 0xffffff : (Math.random() > 0.5 ? 0xffffaa : 0xaaaaff);
      const material = new THREE.MeshBasicMaterial({
        color: starColor, transparent: true, opacity: Math.random() * 0.5 + 0.5
      });
      const star = new THREE.Mesh(this.planetGeometries.tiny, material);
      star.scale.setScalar(starRadius);
      star.position.set((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 100);
      star.userData = {
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        baseOpacity: material.opacity
      };
      this.scene.add(star);
      this.celestialObjects.push(star);
    }
  }

  private createConfetti(): void {
    if (!this.particleGeometry) return;
    
    const confettiColors = [0xff006e, 0xffbe0b, 0xfb5607, 0x8338ec, 0x3a86ff, 0x06ffa5, 0xff69b4, 0x00ffff];
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 0.3 + 0.1;
      const material = new THREE.MeshBasicMaterial({
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        transparent: true,
        opacity: Math.random() * 0.6 + 0.3
      });
      const particle = new THREE.Mesh(this.particleGeometry, material);
      particle.scale.setScalar(size);
      particle.position.set((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 80);
      particle.userData = {
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.03),
        rotationSpeed: new THREE.Vector3((Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05)
      };
      this.scene.add(particle);
      this.confettiParticles.push(particle);
    }
  }

  // --- Animation Loop ---
  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    const time = Date.now() * 0.001;
    const sinTime = Math.sin(time * 0.7);
    const cosTime = Math.cos(time * 0.5);
    const lerpFactor = 0.1;
    
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * lerpFactor;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * lerpFactor;
    
    // Camera
    this.bobbleTime += 0.01;
    this.cameraAngle += 0.003 + this.currentRotation.y * 0.01;
    this.camera.position.x = Math.cos(this.cameraAngle) * this.cameraRadius;
    this.camera.position.z = Math.sin(this.cameraAngle) * this.cameraRadius;
    this.camera.position.y = (this.cameraHeight + Math.sin(this.bobbleTime) * 2 + Math.cos(this.bobbleTime * 0.7) * 1) + this.currentRotation.x * 10;
    this.camera.lookAt(this.currentRotation.y * 5, 5 + this.currentRotation.x * 5, 0);
    
    // Animate Objects
    for (const obj of this.celestialObjects) {
      const userData = obj.userData;
      if (userData['rotationSpeed']) {
        obj.rotation.y += userData['rotationSpeed'] + this.currentRotation.y * 0.005;
        obj.rotation.x += userData['rotationSpeed'] * 0.3 + this.currentRotation.x * 0.005;
      }
      if (userData['orbitSpeed'] && userData['orbitRadius']) {
        userData['orbitAngle'] += userData['orbitSpeed'] + this.currentRotation.y * 0.002;
        obj.position.x = Math.cos(userData['orbitAngle']) * userData['orbitRadius'];
        obj.position.z = Math.sin(userData['orbitAngle']) * userData['orbitRadius'];
        obj.position.y = userData['orbitHeight'] + Math.sin(userData['orbitAngle'] * 2) * 2;
      }
      if (userData['twinkleSpeed']) {
        userData['twinklePhase'] += userData['twinkleSpeed'];
        (obj.material as THREE.MeshBasicMaterial).opacity = userData['baseOpacity'] + Math.sin(userData['twinklePhase']) * 0.3;
      }
    }
    
    // Animate Particles
    for (const particle of this.confettiParticles) {
      const pos = particle.position;
      const vel = particle.userData['velocity'];
      pos.add(vel);
      if (pos.x > 40) pos.x = -40; else if (pos.x < -40) pos.x = 40;
      if (pos.y > 30) pos.y = -30; else if (pos.y < -30) pos.y = 30;
      if (pos.z > 40) pos.z = -40; else if (pos.z < -40) pos.z = 40;
    }
    
    // Animate Lights
    if (this.pointLight1) {
      this.pointLight1.position.x = sinTime * 20;
      this.pointLight1.position.z = cosTime * 20;
    }
    if (this.pointLight2) {
      this.pointLight2.position.x = Math.cos(time * 0.6) * 20;
      this.pointLight2.position.z = Math.sin(time * 0.8) * 20;
    }
    
    // Render
    this.composer.render();
  }

  // --- Utility Methods ---
  private hideHintOnInteraction(): void {
    if (!this.hasInteracted && this.interactionHintRef) {
      this.hasInteracted = true;
      // No need to hide, let it fade out naturally
    }
  }

  private showHintTemporarily(duration: number = 2000): void {
    if (!this.interactionHintRef) return;
    const hint = this.interactionHintRef.nativeElement;
    hint.style.display = 'block';
    hint.style.opacity = '1';
    setTimeout(() => {
      hint.style.opacity = '0';
    }, duration);
  }
}
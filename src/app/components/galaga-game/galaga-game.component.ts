import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';

// --- REQUIRED NPM IMPORTS ---
// npm install three cannon-es i18next
// npm install @types/three --save-dev
import * as THREE from 'three';
// Note: The original used cannon.js, but cannon-es is the modern npm package.
// The original script didn't actually USE cannon.js, so I've omitted the import.
// If you need physics, `import * as CANNON from 'cannon-es';`
import i18next from 'i18next';

// FontAwesome imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faRedo, faArrowLeft, faArrowRight, faCrosshairs } from '@fortawesome/free-solid-svg-icons';

// --- Type definitions for THREE.js objects with custom userData ---
type GameObject = THREE.Object3D & {
  userData: {
    radius: number;
    velocity?: THREE.Vector3;
    life?: number;
    [key: string]: any;
  };
};
type PlayerShip = THREE.Object3D & {
  userData: {
    radius: number;
    lastShot?: number;
  };
};
type EnemyShip = THREE.Object3D & {
  userData: {
    type: string;
    radius: number;
    health: number;
    maxHealth: number;
    inFormation: boolean;
    formationIndex?: number;
    diveTarget?: THREE.Vector3 | null;
    lastShot?: number;
    lastTeleport?: number;
    lastLaser?: number;
    kamikazeMode?: boolean;
  };
};
// ---

@Component({
  selector: 'app-galaga-arcade',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div #gameContainer id="game-container">
      <!-- Restart Button - Bottom Left -->
      <div class="absolute bottom-4 left-4 z-10">
        <button *ngIf="hasDoneDamage" (click)="$event.stopPropagation(); restartGame()" class="control-button" >
          <fa-icon [icon]="faRedo" class="text-white text-xl"></fa-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 30vh;
      position: relative;
      background: transparent;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      border-radius: 16px;
    }

    #game-container {
      width: 100%;
      height: 100%;
      position: relative;
      border-radius: 16px;
      overflow: hidden;
    }

    canvas {
      display: block;
      border-radius: 16px;
    }
    
    /* Re-scoping Tailwind's 'hidden' class for the component */
    .hidden {
      display: none;
    }

    /* Apple-style UI elements */
    .apple-ui {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 400;
      letter-spacing: 0.5px;
      color: #ffffff;
    }

    .apple-ui-bold {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 600;
      letter-spacing: 0.3px;
      color: #ffffff;
    }

    .apple-glass {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .apple-button {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: #ffffff;
      font-weight: 500;
      letter-spacing: 0.5px;
      padding: 12px 24px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    .apple-button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .control-button {
      background: rgba(245, 166, 35, 0.8);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 2px solid rgba(245, 166, 35, 0.6);
      border-radius: 8px;
      color: #ffffff;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(245, 166, 35, 0.3);
    }

    .control-button:hover {
      background: rgba(245, 166, 35, 0.9);
      transform: scale(1.05);
      box-shadow: 0 4px 16px rgba(245, 166, 35, 0.4);
    }

    .control-button:active {
      transform: scale(0.95);
    }

    /* NOTE: All Tailwind classes (e.g., 'absolute', 'text-white') 
     in the template will only apply if Tailwind is configured 
     in your Angular project.
    */

    @media (max-width: 768px) {
      .apple-glass {
        padding: 12px 20px;
        border-radius: 12px;
      }
      
      .apple-ui, .apple-ui-bold {
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .apple-glass {
        padding: 10px 16px;
        border-radius: 10px;
      }
      
      .apple-ui, .apple-ui-bold {
        font-size: 12px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalagaArcadeComponent implements AfterViewInit, OnDestroy {
  // --- DOM Element References ---
  @ViewChild('gameContainer') private gameContainer!: ElementRef<HTMLDivElement>;

  // --- Game State Properties ---
  public score = 0;
  public lives = 3;
  public wave = 1;
  public hasDoneDamage = false;

  // FontAwesome icon
  faHeart = faHeart;
  faRedo = faRedo;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faCrosshairs = faCrosshairs;

  // --- THREE.js Core ---
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private raycaster = new THREE.Raycaster();

  // --- Game Object Collections ---
  private player!: PlayerShip;
  private enemies: EnemyShip[] = [];
  private projectiles: GameObject[] = [];
  private particles: GameObject[] = [];
  private buttonHitboxes: GameObject[] = [];

  // --- Button Animation ---
  private buttonShakeTimers: number[] = [0, 0, 0, 0]; // For 4 buttons
  private buttonOriginalPositions: THREE.Vector3[] = [];
  private buttonScreenPositions: { x: number; y: number; width: number; height: number }[] = [];

  // --- Timers & Controls ---
  private targetPlayerX = 0;
  private enemyMoveTimer = 0;
  private diveAttackTimer = 0;
  private animationFrameId: number = 0;
  private isMobile = false;
  private isGameWon = false;

  // --- Audio ---
  private hitSound: HTMLAudioElement | undefined;
  private shootSound: HTMLAudioElement | undefined;
  private startSound: HTMLAudioElement | undefined;
  private winSound: HTMLAudioElement | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.initTranslations();
  }

  // --- i18n Helper ---
  public t(key: string): string {
    return i18next.t(key);
  }

  private initTranslations(): void {
    const detectedLang = navigator.language.startsWith('pt') ? 'pt-BR' : 'en';
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

    i18next.init({
      lng: detectedLang,
      fallbackLng: 'en',
      resources: {
        'pt-BR': {
          translation: {
            "title": "Arcade Espacial Three.js",
            "score": "SCORE",
            "lives": "",
            "wave": "WAVE",
            "instruction": "Move mouse • Click to shoot",
            "gameOver": "GAME OVER",
            "finalScore": "Final Score:",
            "playAgain": "Play Again",
            "spaceArcade": "SPACE ARCADE",
            "description": "Destroy the voxel enemies before they reach you!",
            "startGame": "START GAME",
          }
        },
        'en': {
          translation: {
            "title": "Three.js Space Arcade",
            "score": "SCORE",
            "lives": "",
            "wave": "WAVE",
            "instruction": "Move mouse • Click to shoot",
            "gameOver": "GAME OVER",
            "finalScore": "Final Score:",
            "playAgain": "Play Again",
            "spaceArcade": "SPACE ARCADE",
            "description": "Destroy the voxel enemies before they reach you!",
            "startGame": "START GAME",
          }
        }
      }
    }, (err, t) => {
      // Update mobile instructions after init
      if (this.isMobile) {
        i18next.addResourceBundle(detectedLang, 'translation', {
          "description": detectedLang === 'pt-BR' ? 'Destrua os inimigos voxel!' : 'Destroy the voxel enemies!',
          "instruction": detectedLang === 'pt-BR' ? 'Mova • Toque para atirar' : 'Move • Tap to shoot'
        }, true, true);
      }
    });
  }

  // --- Angular Lifecycle Hooks ---

  ngAfterViewInit(): void {
    this.initAudio();
    this.ngZone.runOutsideAngular(() => {
      this.initScene();
      this.createPlayer();
      this.setupLighting();
      this.startGame();
      this.setupIntersectionObserver();
      // Call resize once to set correct aspect ratio
      this.onResize();
    });
  }

  private initAudio(): void {
    if (typeof Audio !== 'undefined') {
      this.hitSound = new Audio('hit.m4a');
      this.shootSound = new Audio('shoot.m4a');
      this.startSound = new Audio('game%20start.m4a');
      this.winSound = new Audio('game%20win.m4a');

      // Set volumes (Low standard, shoot lower than hit)
      this.hitSound.volume = 0.2;
      this.shootSound.volume = 0.05;
      this.startSound.volume = 0.1;
      this.winSound.volume = 0.1;

      // Preload
      this.hitSound.load();
      this.shootSound.load();
      this.startSound.load();
      this.winSound.load();
    }
  }

  private playAudio(audio: HTMLAudioElement | undefined): void {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.warn('Audio play failed', e));
    }
  }

  ngOnDestroy(): void {
    // Stop the animation loop
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    // Dispose of Three.js objects
    try {
      this.scene.traverse((object) => {
        const asMesh = object as THREE.Mesh;
        if (asMesh.geometry) {
          asMesh.geometry.dispose();
        }
        if (asMesh.material) {
          const materials = Array.isArray(asMesh.material) ? asMesh.material : [asMesh.material];
          materials.forEach(material => {
            if ((material as any).map) (material as any).map.dispose();
            material.dispose();
          });
        }
      });
      this.renderer.dispose();
      this.scene.clear();
    } catch (e) {
      console.error("Error during Three.js cleanup:", e);
    }
  }

  private intersectionObserver: IntersectionObserver | undefined;

  private setupIntersectionObserver() {
    if (!this.gameContainer?.nativeElement) return;

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!this.animationFrameId) {
            this.animate();
          }
        } else {
          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = 0;
          }
        }
      });
    });

    this.intersectionObserver.observe(this.gameContainer.nativeElement);
  }

  // --- HostListeners for Window Events ---
  // (Replaces all document/window.addEventListener calls)

  @HostListener('window:resize')
  onResize(): void {
    const rect = this.gameContainer.nativeElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const aspect = width / height;
    if (!this.camera) return;

    // Adjust camera bounds with padding for mobile/tablet
    const isCompact = width < 1024;
    const padding = isCompact ? 0.5 : 0;

    if (aspect > 1) {
      this.camera.left = -4 * aspect + padding;
      this.camera.right = 4 * aspect - padding;
      this.camera.top = 3;
      this.camera.bottom = -3;
    } else {
      this.camera.left = -4 + padding;
      this.camera.right = 4 - padding;
      this.camera.top = 3 / aspect;
      this.camera.bottom = -3 / aspect;
    }
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    if (this.enemies.length > 0) {
      this.createEnemyFormation();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target && target.tagName === 'BUTTON') return;
    if (!this.camera || !this.gameContainer) return;

    const rect = this.gameContainer.nativeElement.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const normalizedX = relativeX / rect.width;
    const worldWidth = this.camera.right - this.camera.left;

    this.targetPlayerX = normalizedX * worldWidth + this.camera.left;
    this.targetPlayerX = Math.max(this.camera.left, Math.min(this.camera.right, this.targetPlayerX));
  }

  @HostListener('document:click', ['$event'])
  onClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target && target.tagName === 'BUTTON') return;
    if (!this.camera || !this.gameContainer) return;

    const rect = this.gameContainer.nativeElement.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const normalizedX = relativeX / rect.width;
    const worldWidth = this.camera.right - this.camera.left;

    const clickX = normalizedX * worldWidth + this.camera.left;
    const clamped = Math.max(this.camera.left, Math.min(this.camera.right, clickX));
    this.targetPlayerX = clamped;
    this.player.position.x = clamped;
    this.shoot();
  }

  @HostListener('document:touchstart', ['$event'])
  onTouchStart(e: TouchEvent): void {
    const target = e.target as HTMLElement;
    if (target && target.tagName === 'BUTTON') return;
    if (!this.camera || !this.gameContainer) return;

    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.gameContainer.nativeElement.getBoundingClientRect();
    const relativeX = touch.clientX - rect.left;
    const normalizedX = relativeX / rect.width;
    const worldWidth = this.camera.right - this.camera.left;

    const touchX = normalizedX * worldWidth + this.camera.left;
    const clamped = Math.max(this.camera.left, Math.min(this.camera.right, touchX));
    this.targetPlayerX = clamped;
    this.player.position.x = clamped;
    this.shoot();
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(e: TouchEvent): void {
    const target = e.target as HTMLElement;
    if (target && target.tagName === 'BUTTON') return;
    if (!this.camera || !this.gameContainer) return;

    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.gameContainer.nativeElement.getBoundingClientRect();
    const relativeX = touch.clientX - rect.left;
    const normalizedX = relativeX / rect.width;
    const worldWidth = this.camera.right - this.camera.left;

    this.targetPlayerX = normalizedX * worldWidth + this.camera.left;
    this.targetPlayerX = Math.max(this.camera.left, Math.min(this.camera.right, this.targetPlayerX));
  }

  @HostListener('window:deviceorientation', ['$event'])
  onDeviceOrientation(event: DeviceOrientationEvent): void {
    if (!this.isMobile || !this.camera) return;
    const gamma = event.gamma || 0;
    const halfWidth = (this.camera.right - this.camera.left) / 2;
    const center = (this.camera.right + this.camera.left) / 2;
    this.targetPlayerX = (gamma / 90) * halfWidth + center;
    this.targetPlayerX = Math.max(this.camera.left, Math.min(this.camera.right, this.targetPlayerX));
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    // Ignore if typing in an input or textarea
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    const gameKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyA', 'KeyD', 'KeyW', 'KeyS'];
    if (gameKeys.includes(e.code)) {
      e.preventDefault();
    }

    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft();
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.moveRight();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'KeyW':
      case 'KeyS':
        this.shoot();
        break;
    }
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = null;

    this.camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 1000);
    this.camera.position.set(0, 0, 10);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const width = this.gameContainer.nativeElement.clientWidth || window.innerWidth;
    const height = this.gameContainer.nativeElement.clientHeight || window.innerHeight;
    this.renderer.setSize(width, height);
    this.gameContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  public startGame(): void {
    this.wave = 1;
    this.score = 0;
    this.lives = 3;
    this.hasDoneDamage = false;
    this.createEnemyFormation();
  }

  public restartGame(): void {
    this.playAudio(this.startSound);
    [...this.enemies, ...this.projectiles, ...this.particles].forEach(obj => {
      this.scene.remove(obj);
    });

    this.enemies = [];
    this.projectiles = [];
    this.particles = [];

    this.startGame();
  }

  private createButtonHitboxes(): void {
    this.buttonHitboxes.forEach(hitbox => this.scene.remove(hitbox));
    this.buttonHitboxes = [];
    this.buttonOriginalPositions = [];

    const buttonScreenPositions = [
      { x: 16, y: 16, width: 48, height: 48 },
      { x: 80, y: 16, width: 48, height: 48 },
      { x: 144, y: 16, width: 48, height: 48 },
      { x: 16, y: 80, width: 48, height: 48 }
    ];

    this.buttonScreenPositions = buttonScreenPositions;
  }

  private shakeButton(buttonIndex: number): void {
    const button = this.buttonScreenPositions[buttonIndex];
    const canvas = this.renderer.domElement;

    const worldX = ((button.x + button.width / 2) / canvas.clientWidth - 0.5) * 2 * 4;
    const worldY = -((button.y + button.height / 2) / canvas.clientHeight - 0.5) * 2 * 3;

    this.createButtonHitEffect(new THREE.Vector3(worldX, worldY, 0));
  }

  private createButtonHitEffect(position: THREE.Vector3): void {
    const particleCount = 6;
    const size = 0.03;
    const color = 0xffaa00;
    const velocityMag = 0.2;
    const life = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({ color })
      );
      particle.position.copy(position);
      particle.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * velocityMag,
          (Math.random() - 0.5) * velocityMag,
          (Math.random() - 0.5) * velocityMag
        ),
        life: life,
        radius: size / 2
      };
      this.scene.add(particle);
      this.particles.push(particle as unknown as GameObject);
    }
  }

  private createVoxelModel(positions: number[][], color: number, scale: number): THREE.Group {
    const group = new THREE.Group();
    positions.forEach(pos => {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(scale, scale, scale),
        new THREE.MeshLambertMaterial({ color })
      );
      cube.position.set(pos[0] * scale, pos[1] * scale, pos[2] * scale);
      group.add(cube);
    });
    return group;
  }

  private createPlayer(): void {
    const playerPositions = [[0, 0, 0], [-1, 0, 0], [1, 0, 0], [0, 1, 0]];
    const ship = this.createVoxelModel(playerPositions, 0x10051c, 0.1);
    ship.userData = { radius: 0.28 };
    this.player = ship as unknown as PlayerShip;
    this.player.position.y = -2.2;
    this.scene.add(this.player);
  }

  private setupLighting(): void {
    this.scene.add(new THREE.AmbientLight(0x404040, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(0, 0, 10);
    this.scene.add(dir);

    const pl1 = new THREE.PointLight(0xff0040, 0.12, 30);
    pl1.position.set(-5, 5, 5);
    this.scene.add(pl1);
    const pl2 = new THREE.PointLight(0x0040ff, 0.12, 30);
    pl2.position.set(5, 5, 5);
    this.scene.add(pl2);

    this.createButtonHitboxes();
  }

  private createEnemyFormation(): void {
    this.enemies.forEach(e => this.scene.remove(e));
    this.enemies = [];

    const isCompact = window.innerWidth < 1024;

    if (isCompact) {
      this.createVoxelTextEnemy("CHAME A ATENÇÃO", 0, 2.2);
      this.createVoxelTextEnemy("E ENCANTE", 0, 1.4);
      this.createVoxelTextEnemy("COM INTERAÇÕES", 0, 0.6);
      this.createVoxelTextEnemy("UNICAS", 0, -0.2);
    } else {
      this.createVoxelTextEnemy("CHAME A ATENÇÃO E ENCANTE", 0, 1.8);
      this.createVoxelTextEnemy("COM INTERAÇÕES UNICAS", 0, 0.3);
    }
  }

  private createVoxelTextEnemy(text: string, x: number, y: number): void {
    const group = new THREE.Group();
    let currentX = 0;
    let totalWidth = 0;

    // Calculate total units (letter width + spacing)
    let totalUnits = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();
      totalUnits += this.getLetterWidth(char);
      if (i < text.length - 1) totalUnits += 1; // 1 unit spacing
    }

    // Determine scale based on available width
    const worldWidth = this.camera.right - this.camera.left;
    const maxContentWidth = worldWidth * 0.9;
    let scale = maxContentWidth / totalUnits;

    // Clamp scale
    const isCompact = window.innerWidth < 1024;
    const isVerySmall = window.innerWidth < 480;
    const maxScale = isVerySmall ? 0.06 : (isCompact ? 0.08 : 0.12);
    scale = Math.min(scale, maxScale);

    const spacing = scale;
    totalWidth = totalUnits * scale;

    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();
      const letterBlocks = this.getLetterBlocks(char);

      letterBlocks.forEach(block => {
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(scale, scale, scale),
          new THREE.MeshBasicMaterial({ color: 0xf5a623 })
        );
        cube.position.set(
          currentX + block[0] * scale,
          block[1] * scale,
          block[2] * scale
        );
        cube.userData = { isBlock: true, parentText: text, radius: scale * 0.5 };
        group.add(cube);
      });

      currentX += this.getLetterWidth(char) * scale + spacing;
    }

    const baseX = x - totalWidth / 2;
    group.position.set(baseX, y, 0);
    group.userData = {
      type: 'voxelText',
      text: text,
      blocks: group.children.length,
      destroyedBlocks: 0,
      radius: Math.sqrt(group.children.length) * scale,
      movementOffset: Math.random() * Math.PI * 2,
      baseX: baseX,
      baseY: y,
      totalWidth: totalWidth
    };

    this.scene.add(group);
    this.enemies.push(group as unknown as EnemyShip);
  }

  private getLetterBlocks(char: string): number[][] {
    const letters: { [key: string]: number[][] } = {
      'A': [[1, 4, 0], [2, 4, 0], [0, 3, 0], [3, 3, 0], [0, 2, 0], [1, 2, 0], [2, 2, 0], [3, 2, 0], [0, 1, 0], [3, 1, 0], [0, 0, 0], [3, 0, 0]],
      'C': [[1, 4, 0], [2, 4, 0], [3, 4, 0], [0, 3, 0], [0, 2, 0], [0, 1, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0]],
      'Ç': [[1, 4, 0], [2, 4, 0], [3, 4, 0], [0, 3, 0], [0, 2, 0], [0, 1, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0], [1, -1, 0], [2, -1, 0]],
      'E': [[0, 4, 0], [1, 4, 0], [2, 4, 0], [3, 4, 0], [0, 3, 0], [0, 2, 0], [1, 2, 0], [2, 2, 0], [0, 1, 0], [0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0]],
      'H': [[0, 4, 0], [3, 4, 0], [0, 3, 0], [3, 3, 0], [0, 2, 0], [1, 2, 0], [2, 2, 0], [3, 2, 0], [0, 1, 0], [3, 1, 0], [0, 0, 0], [3, 0, 0]],
      'I': [[0, 4, 0], [1, 4, 0], [2, 4, 0], [1, 3, 0], [1, 2, 0], [1, 1, 0], [0, 0, 0], [1, 0, 0], [2, 0, 0]],
      'M': [[0, 4, 0], [4, 4, 0], [0, 3, 0], [1, 3, 0], [3, 3, 0], [4, 3, 0], [0, 2, 0], [2, 2, 0], [4, 2, 0], [0, 1, 0], [4, 1, 0], [0, 0, 0], [4, 0, 0]],
      'N': [[0, 4, 0], [4, 4, 0], [0, 3, 0], [1, 3, 0], [4, 3, 0], [0, 2, 0], [2, 2, 0], [4, 2, 0], [0, 1, 0], [3, 1, 0], [4, 1, 0], [0, 0, 0], [4, 0, 0]],
      'O': [[1, 4, 0], [2, 4, 0], [0, 3, 0], [3, 3, 0], [0, 2, 0], [3, 2, 0], [0, 1, 0], [3, 1, 0], [1, 0, 0], [2, 0, 0]],
      'R': [[0, 4, 0], [1, 4, 0], [2, 4, 0], [3, 4, 0], [0, 3, 0], [3, 3, 0], [0, 2, 0], [1, 2, 0], [2, 2, 0], [3, 2, 0], [0, 1, 0], [3, 1, 0], [0, 0, 0], [3, 0, 0], [4, 0, 0]],
      'S': [[1, 4, 0], [2, 4, 0], [3, 4, 0], [0, 3, 0], [0, 2, 0], [1, 2, 0], [2, 2, 0], [3, 2, 0], [3, 1, 0], [0, 0, 0], [1, 0, 0], [2, 0, 0]],
      'T': [[0, 4, 0], [1, 4, 0], [2, 4, 0], [3, 4, 0], [4, 4, 0], [2, 3, 0], [2, 2, 0], [2, 1, 0], [2, 0, 0]],
      'U': [[0, 4, 0], [3, 4, 0], [0, 3, 0], [3, 3, 0], [0, 2, 0], [3, 2, 0], [0, 1, 0], [3, 1, 0], [1, 0, 0], [2, 0, 0]],
      'Ú': [[0, 4, 0], [3, 4, 0], [0, 3, 0], [3, 3, 0], [0, 2, 0], [3, 2, 0], [0, 1, 0], [3, 1, 0], [1, 0, 0], [2, 0, 0], [1, 5, 0], [2, 5, 0]],
      'Ã': [[1, 4, 0], [2, 4, 0], [0, 3, 0], [3, 3, 0], [0, 2, 0], [1, 2, 0], [2, 2, 0], [3, 2, 0], [0, 1, 0], [3, 1, 0], [0, 0, 0], [3, 0, 0], [1, 5, 0], [2, 5, 0]],
      'Õ': [[1, 4, 0], [2, 4, 0], [0, 3, 0], [3, 3, 0], [0, 2, 0], [3, 2, 0], [0, 1, 0], [3, 1, 0], [1, 0, 0], [2, 0, 0], [1, 5, 0], [2, 5, 0]],
      ' ': []
    };
    return letters[char] || [];
  }

  private getLetterWidth(char: string): number {
    const widths: { [key: string]: number } = {
      'A': 4, 'C': 4, 'Ç': 4, 'E': 4, 'H': 4, 'I': 3, 'M': 5, 'N': 5, 'O': 4, 'R': 5, 'S': 4, 'T': 5, 'U': 4, 'Ú': 4, 'Ã': 4, 'Õ': 4, ' ': 1
    };
    return widths[char] || 4;
  }

  public moveLeft(): void {
    this.targetPlayerX = Math.max(this.camera.left, this.targetPlayerX - 0.8);
  }

  public moveRight(): void {
    this.targetPlayerX = Math.min(this.camera.right, this.targetPlayerX + 0.8);
  }

  public shoot(): void {
    const now = Date.now();
    if (this.player.userData.lastShot && now - this.player.userData.lastShot < 400) return;
    this.player.userData.lastShot = now;
    this.playAudio(this.shootSound);

    const geo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const mat = new THREE.MeshLambertMaterial({ color: 0xffff00, emissive: 0xaaaa00 });
    const p = new THREE.Mesh(geo, mat);
    p.position.copy(this.player.position);
    p.position.y += 0.28;
    p.userData = { velocity: new THREE.Vector3(0, 0.8, 0), radius: 0.1 };
    this.scene.add(p);
    this.projectiles.push(p as unknown as GameObject);
  }

  private updatePlayer(): void {
    this.player.position.x = THREE.MathUtils.lerp(this.player.position.x, this.targetPlayerX, 0.25);
    this.player.position.x = Math.max(this.camera.left, Math.min(this.camera.right, this.player.position.x));
  }

  private updateEnemies(): void {
    this.enemyMoveTimer++;
    this.diveAttackTimer++;

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      const { type, movementOffset, totalWidth } = enemy.userData;

      if (type === 'voxelText') {
        const time = Date.now() * 0.001;
        const maxMovement = totalWidth ? Math.max(0.2, 0.5 - totalWidth / 8) : 0.3;
        enemy.position.x = enemy.userData['baseX'] + Math.sin(time + movementOffset) * maxMovement;
        enemy.position.y = enemy.userData['baseY'] + Math.cos(time * 0.7 + movementOffset) * 0.2;

        for (let j = this.projectiles.length - 1; j >= 0; j--) {
          const proj = this.projectiles[j];

          for (let k = enemy.children.length - 1; k >= 0; k--) {
            const block = enemy.children[k] as THREE.Mesh;
            const blockWorldPos = new THREE.Vector3();
            block.getWorldPosition(blockWorldPos);
            const dist = blockWorldPos.distanceTo(proj.position);
            if (dist < (block.userData['radius'] + proj.userData.radius)) {
              this.createBlockParticles(blockWorldPos);
              enemy.remove(block);
              enemy.userData['destroyedBlocks']++;
              this.playAudio(this.hitSound);

              this.score += 10;
              this.hasDoneDamage = true;
              this.cdr.detectChanges();

              this.scene.remove(proj);
              this.projectiles.splice(j, 1);
              break;
            }
          }
        }

        if (enemy.children.length === 0) {
          this.scene.remove(enemy);
          this.enemies.splice(i, 1);
          continue;
        }
      }

      if (this.checkCollision(enemy, this.player)) {
        this.lives--;
        this.createExplosion(enemy.position);
        this.destroyEnemy(enemy, i, false);
        if (this.lives <= 0) { this.restartGame(); }
        continue;
      }
    }

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];

      const screenPos = proj.position.clone();
      screenPos.project(this.camera);

      const canvas = this.renderer.domElement;
      const x = (screenPos.x * 0.5 + 0.5) * canvas.clientWidth;
      const y = (-screenPos.y * 0.5 + 0.5) * canvas.clientHeight;

      for (let j = 0; j < this.buttonScreenPositions.length; j++) {
        const button = this.buttonScreenPositions[j];

        if (x >= button.x && x <= button.x + button.width &&
          y >= button.y && y <= button.y + button.height) {
          this.shakeButton(j);

          this.scene.remove(proj);
          this.projectiles.splice(i, 1);
          break;
        }
      }
    }

    if (this.enemies.length === 0) {
      if (!this.isGameWon) {
        this.handleWin();
      }
    }
  }

  private handleWin(): void {
    this.isGameWon = true;
    this.playAudio(this.winSound);

    if (this.winSound) {
      this.winSound.onended = () => {
        this.winSound!.onended = null;
        setTimeout(() => {
          this.restartGame();
          this.isGameWon = false;
        }, 5000);
      };
    } else {
      setTimeout(() => {
        this.restartGame();
        this.isGameWon = false;
      }, 5000);
    }
  }

  private destroyEnemy(enemy: EnemyShip, index: number, giveScore: boolean = true): void {
    this.scene.remove(enemy);
    this.enemies.splice(index, 1);
  }

  private updateProjectiles(): void {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.position.add(p.userData.velocity!);
      if (p.position.y > 6) { this.scene.remove(p); this.projectiles.splice(i, 1); }
    }
  }

  private playerHit(): void {
    this.lives--;
    if (this.lives <= 0) {
      this.restartGame();
    }
  }

  private checkCollision(a: GameObject, b: GameObject): boolean {
    const dist = a.position.distanceTo(b.position);
    return dist < (a.userData.radius + b.userData.radius);
  }

  private createExplosion(position: THREE.Vector3): void {
    this.createParticleEffect(position, 12, 0.04, 0xffaa00, 0.4, 30);
  }

  private createSmallExplosion(position: THREE.Vector3): void {
    this.createParticleEffect(position, 6, 0.02, 0xffaa00, 0.2, 20);
  }

  private createBombExplosion(position: THREE.Vector3): void {
    this.createParticleEffect(position, 20, 0.06, 0xff6600, 0.8, 40);
  }

  private createBlockParticles(position: THREE.Vector3): void {
    const particleCount = 8;
    const size = 0.05;
    const color = 0xf5a623;
    const velocityMag = 0.3;
    const life = 60;

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({ color })
      );
      particle.position.copy(position);
      particle.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * velocityMag,
          (Math.random() - 0.5) * velocityMag,
          (Math.random() - 0.5) * velocityMag
        ),
        life: life,
        radius: size / 2
      };
      this.scene.add(particle);
      this.particles.push(particle as unknown as GameObject);
    }
  }

  private createParticleEffect(position: THREE.Vector3, count: number, size: number, color: number, velocityMag: number, life: number): void {
    const geo = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshBasicMaterial({ color });
    for (let i = 0; i < count; i++) {
      const particle = new THREE.Mesh(geo, mat);
      particle.position.copy(position);
      particle.userData = {
        velocity: new THREE.Vector3((Math.random() - 0.5) * velocityMag, (Math.random() - 0.2) * velocityMag, (Math.random() - 0.5) * velocityMag * 0.5),
        life: life,
        radius: 0.01
      };
      this.scene.add(particle);
      this.particles.push(particle as unknown as GameObject);
    }
  }

  private updateParticles(): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.position.add(p.userData.velocity!);
      p.userData.life!--;

      (p as unknown as THREE.Mesh<any, THREE.MeshBasicMaterial>).material.opacity = Math.max(0, p.userData.life! / 30);
      (p as unknown as THREE.Mesh<any, THREE.MeshBasicMaterial>).material.transparent = true;
      if (p.userData.life! <= 0) {
        this.scene.remove(p);
        this.particles.splice(i, 1);
      }
    }
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    this.updatePlayer();
    this.updateEnemies();
    this.updateProjectiles();
    this.updateParticles();

    this.renderer.render(this.scene, this.camera);
  }
}
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-hero-cube',
  standalone: true,
  templateUrl: './hero-cube.html',
  styleUrl: './hero-cube.scss',
})
export class HeroCube implements AfterViewInit, OnDestroy {
 @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mainCube!: THREE.Group;
  private mouseFollowGroup!: THREE.Group; // Grupo para a rotação do mouse

  private constellationPoints!: THREE.Points;
  private constellationLines!: THREE.LineSegments;
  private constellationVertices: THREE.Vector3[] = [];

  private animationFrameId: number | undefined;
  private scrollPercent = 0;
  private mouse = new THREE.Vector2();

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const heroHeight = this.canvasRef.nativeElement.parentElement?.clientHeight || window.innerHeight;
    this.scrollPercent = Math.min(window.scrollY / (heroHeight * 0.8), 1);
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (event.touches.length > 0) {
      this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }

  private initThree(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 20;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const pointLight = new THREE.PointLight(0xffa500, 3.0, 150);
    pointLight.position.set(10, 15, 20);
    this.scene.add(pointLight);

    // Inicializa o grupo que seguirá o mouse
    this.mouseFollowGroup = new THREE.Group();
    // Move o grupo para baixo na tela
    this.mouseFollowGroup.position.y = -3;
    this.scene.add(this.mouseFollowGroup);

    this.createClusteredCube();
    this.createConstellationBackground();
  }

  private createConstellationBackground(): void {
    const pointsGeometry = new THREE.BufferGeometry();
    const numPoints = 150;
    const areaSize = 250;

    for (let i = 0; i < numPoints; i++) {
        const x = (Math.random() - 0.5) * areaSize;
        const y = (Math.random() - 0.5) * areaSize;
        const z = (Math.random() - 0.5) * areaSize;
        const vertex = new THREE.Vector3(x, y, z);
        (vertex as any).velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        );
        this.constellationVertices.push(vertex);
    }
    pointsGeometry.setFromPoints(this.constellationVertices);

    const pointsMaterial = new THREE.PointsMaterial({
        color: 0x4f607b, // Cor neutra/sem cor para os pontos
        size: 2,
        sizeAttenuation: true
    });
    this.constellationPoints = new THREE.Points(pointsGeometry, pointsMaterial);
    this.scene.add(this.constellationPoints);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x2a3a52, // Roxo mais escuro para as linhas
        transparent: true,
        opacity: 0.25
    });






    this.constellationLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    this.scene.add(this.constellationLines);
  }

  private createClusteredCube(): void {
    this.mainCube = new THREE.Group();
    const gridSize = 7;
    const spacing = 1.2;
    const cubeSize = 1;
    const halfGrid = (gridSize - 1) / 2;

    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff8c00,
        metalness: 0.7,
        roughness: 0.3,
    });

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        for (let k = 0; k < gridSize; k++) {
          const cube = new THREE.Mesh(geometry, material);
          const originalPosition = new THREE.Vector3(
            (i - halfGrid) * spacing, (j - halfGrid) * spacing, (k - halfGrid) * spacing
          );
          cube.position.copy(originalPosition);
          cube.userData['originalPosition'] = originalPosition;
          
          // Direção diagonal: direita (x+), cima (y+), levemente para frente (z+)
          // Cada voxel tem sua própria direção randomizada mantendo a tendência diagonal
          const baseDirection = new THREE.Vector3(1.0, 1.2, 0.3);
          const randomVariation = new THREE.Vector3(
            Math.random() * 0.6 - 0.2, // Mais variação em X (mantém tendência à direita)
            Math.random() * 0.5 - 0.1, // Variação em Y (mantém tendência para cima)
            Math.random() * 0.6 - 0.3  // Variação em Z
          );
          cube.userData['explosionVector'] = baseDirection.clone()
            .add(randomVariation)
            .normalize();
          
          // Calcula o delay baseado principalmente na altura (Y) e posição à direita (X)
          // Prioriza voxels do TOPO (j alto) e DIREITA (i alto)
          const heightFactor = (gridSize - 1 - j) / (gridSize - 1); // 0 no topo, 1 na base
          const rightFactor = (gridSize - 1 - i) / (gridSize - 1);  // 0 à direita, 1 à esquerda
          const depthFactor = (gridSize - 1 - k) / (gridSize - 1);  // 0 na frente, 1 atrás
          
          // Peso maior para altura (base fica por último)
          const baseDelay = (heightFactor * 0.6) + (rightFactor * 0.25) + (depthFactor * 0.15);
          
          // Adiciona randomização significativa para que cada voxel comece em momento diferente
          const randomDelay = Math.random() * 0.3;
          cube.userData['explosionDelay'] = baseDelay + randomDelay;
          
          // Adiciona um offset de início aleatório individual para cada voxel
          cube.userData['randomStartOffset'] = Math.random() * 0.15;
          
          this.mainCube.add(cube);
        }
      }
    }
    // Adiciona o cubo ao grupo que segue o mouse
    this.mouseFollowGroup.add(this.mainCube);
  }

  private updateConstellation(): void {
    const lineSegments = [];
    const connectionDistance = 25;
    const areaSize = 250;
    const halfArea = areaSize / 2;

    for (const vertex of this.constellationVertices) {
      vertex.add((vertex as any).velocity);

      if (vertex.x < -halfArea) vertex.x = halfArea;
      if (vertex.x > halfArea) vertex.x = -halfArea;
      if (vertex.y < -halfArea) vertex.y = halfArea;
      if (vertex.y > halfArea) vertex.y = -halfArea;
      if (vertex.z < -halfArea) vertex.z = halfArea;
      if (vertex.z > halfArea) vertex.z = -halfArea;
    }

    for (let i = 0; i < this.constellationVertices.length; i++) {
        for (let j = i + 1; j < this.constellationVertices.length; j++) {
            if (this.constellationVertices[i].distanceTo(this.constellationVertices[j]) < connectionDistance) {
                lineSegments.push(this.constellationVertices[i], this.constellationVertices[j]);
            }
        }
    }
    
    (this.constellationPoints.geometry as THREE.BufferGeometry).setFromPoints(this.constellationVertices);
    (this.constellationLines.geometry as THREE.BufferGeometry).setFromPoints(lineSegments);
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Rotação constante do cubo dentro do seu grupo
    this.mainCube.rotation.y += 0.002;
    this.mainCube.rotation.x += 0.001;

    // O grupo pai (mouseFollowGroup) segue o mouse suavemente
    if (this.mouseFollowGroup) {
      this.mouseFollowGroup.rotation.y += (this.mouse.x * 0.2 - this.mouseFollowGroup.rotation.y) * 0.05;
      this.mouseFollowGroup.rotation.x += (-this.mouse.y * 0.2 - this.mouseFollowGroup.rotation.x) * 0.05;
    }

    this.updateConstellation();
    
    // Efeito de paralaxe sutil na constelação com base no mouse
    if (this.constellationPoints) {
      this.constellationPoints.rotation.y += (this.mouse.x * 0.0001 - this.constellationPoints.rotation.y) * 0.05;
      this.constellationPoints.rotation.x += (-this.mouse.y * 0.0001 - this.constellationPoints.rotation.x) * 0.05;
      this.constellationLines.rotation.copy(this.constellationPoints.rotation);
    }

    this.mainCube.children.forEach(cube => {
      const delay = cube.userData['explosionDelay'];
      const randomOffset = cube.userData['randomStartOffset'];
      
      // Calcula quando este voxel específico deve começar a se mover
      // scrollPercent vai de 0 a 1 conforme o usuário rola
      const adjustedScroll = this.scrollPercent + randomOffset;
      
      // O voxel só começa a se mover quando o scroll atinge seu delay
      // Isso cria o efeito de desintegração progressiva
      let individualProgress = 0;
      if (adjustedScroll > delay) {
        // Progresso individual deste voxel (0 a 1)
        individualProgress = Math.min(1, (adjustedScroll - delay) / (1 - delay + 0.3));
      }
      
      // Aplica uma curva de aceleração para movimento mais natural
      const easedProgress = individualProgress * individualProgress * (3 - 2 * individualProgress);
      
      // Distância que o voxel vai voar
      const explosionDistance = 50 + Math.random() * 20; // Varia a distância para cada voxel
      
      const targetPosition = new THREE.Vector3()
        .copy(cube.userData['explosionVector'])
        .multiplyScalar(easedProgress * explosionDistance)
        .add(cube.userData['originalPosition']);
      
      // Movimento suave com interpolação
      cube.position.lerp(targetPosition, 0.1);
      
      // Opcional: Faz os voxels rotacionarem levemente enquanto voam
      if (individualProgress > 0) {
        cube.rotation.x += 0.02 * individualProgress;
        cube.rotation.y += 0.03 * individualProgress;
        cube.rotation.z += 0.015 * individualProgress;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import * as THREE from 'three';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-hero-cube',
  standalone: true,
  templateUrl: './hero-cube.html',
  styleUrl: './hero-cube.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCube implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mouseFollowGroup!: THREE.Group; // Grupo para a rotação do mouse

  private constellationPoints!: THREE.Points;
  private constellationLines!: THREE.LineSegments;
  private constellationVertices: THREE.Vector3[] = [];

  private instancedCube!: THREE.InstancedMesh;
  private instanceData: any[] = [];

  private animationFrameId: number | undefined;
  private scrollPercent = 0;
  private mouse = new THREE.Vector2();
  private loadingService = inject(LoadingService);
  private intersectionObserver: IntersectionObserver | undefined;

  constructor(private ngZone: NgZone) {
    this.loadingService.show();
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      try {
        this.initThree();
        this.setupIntersectionObserver();
      } finally {
        this.ngZone.run(() => {
          this.loadingService.hide();
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.disposeThree();
  }

  private setupIntersectionObserver() {
    if (!this.canvasRef?.nativeElement) return;

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!this.animationFrameId) {
            this.animate();
          }
        } else {
          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = undefined;
          }
        }
      });
    });

    this.intersectionObserver.observe(this.canvasRef.nativeElement);
  }

  private disposeThree() {
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.canvasRef?.nativeElement) return;
    const heroHeight = this.canvasRef.nativeElement.parentElement?.clientHeight || window.innerHeight;
    this.scrollPercent = Math.min(window.scrollY / (heroHeight * 0.8), 1);
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (this.camera && this.renderer) {
      const container = this.canvasRef.nativeElement.parentElement;
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(1);
      }
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
    const container = this.canvasRef.nativeElement.parentElement;
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 20;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(1);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const pointLight = new THREE.PointLight(0xffa500, 3.0, 150);
    pointLight.position.set(10, 15, 20);
    this.scene.add(pointLight);

    // Inicializa o grupo que seguirá o mouse
    this.mouseFollowGroup = new THREE.Group();
    // Move o grupo para baixo na tela
    this.mouseFollowGroup.position.y = -4.5;
    this.scene.add(this.mouseFollowGroup);

    this.createClusteredCube();
    this.createConstellationBackground();
  }

  private createConstellationBackground(): void {
    const pointsGeometry = new THREE.BufferGeometry();
    const numPoints = 200;
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
    const gridSize = 5;
    const spacing = 1.2;
    const cubeSize = 1;
    const halfGrid = (gridSize - 1) / 2;

    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff8c00,
        metalness: 0.7,
        roughness: 0.3,
    });

    const totalCubes = gridSize * gridSize * gridSize;
    this.instancedCube = new THREE.InstancedMesh(geometry, material, totalCubes);
    this.instancedCube.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        for (let k = 0; k < gridSize; k++) {
          const index = i * gridSize * gridSize + j * gridSize + k;
          const originalPosition = new THREE.Vector3(
            (i - halfGrid) * spacing, (j - halfGrid) * spacing, (k - halfGrid) * spacing
          );
          
          // Direção diagonal: direita (x+), cima (y+), levemente para frente (z+)
          // Cada voxel tem sua própria direção randomizada mantendo a tendência diagonal
          const baseDirection = new THREE.Vector3(1.0, 1.2, 0.3);
          const randomVariation = new THREE.Vector3(
            Math.random() * 0.6 - 0.2, // Mais variação em X (mantém tendência à direita)
            Math.random() * 0.5 - 0.1, // Variação em Y (mantém tendência para cima)
            Math.random() * 0.6 - 0.3  // Variação em Z
          );
          const explosionVector = baseDirection.clone()
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
          const explosionDelay = baseDelay + randomDelay;
          
          // Adiciona um offset de início aleatório individual para cada voxel
          const randomStartOffset = Math.random() * 0.15;
          
          const instanceData = {
            originalPosition: originalPosition.clone(),
            explosionVector,
            explosionDelay,
            randomStartOffset,
            currentPosition: originalPosition.clone(),
            rotation: new THREE.Euler(0, 0, 0)
          };
          this.instanceData[index] = instanceData;

          const matrix = new THREE.Matrix4();
          matrix.setPosition(originalPosition);
          this.instancedCube.setMatrixAt(index, matrix);
        }
      }
    }
    // Adiciona o cubo ao grupo que segue o mouse
    this.mouseFollowGroup.add(this.instancedCube);
  }

  private updateConstellation(): void {
    const lineSegments = [];
    const connectionDistance = 35;
    const areaSize = 250;
    const halfArea = areaSize / 2;

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(this.mouse, this.camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseTarget = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, mouseTarget);
    const interactionRadius = 40;

    for (const vertex of this.constellationVertices) {
      // Repulsion logic
      if (mouseTarget) {
        const dist = vertex.distanceTo(mouseTarget);
        if (dist < interactionRadius) {
          const repulsionDir = new THREE.Vector3().subVectors(vertex, mouseTarget).normalize();
          const force = (interactionRadius - dist) / interactionRadius;
          vertex.add(repulsionDir.multiplyScalar(force * 1.5));
        }
      }

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
    
    // Update points geometry (this should be stable since vertices count doesn't change)
    (this.constellationPoints.geometry as THREE.BufferGeometry).setFromPoints(this.constellationVertices);
    
    // Update lines geometry - dispose and recreate if line count changed
    if (this.constellationLines) {
      const newLineCount = lineSegments.length;
      const currentLineCount = (this.constellationLines.geometry as THREE.BufferGeometry).attributes['position']?.count || 0;
      
      if (newLineCount !== currentLineCount) {
        // Dispose old geometry and create new one
        this.constellationLines.geometry.dispose();
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setFromPoints(lineSegments);
        this.constellationLines.geometry = lineGeometry;
      } else if (newLineCount > 0) {
        // Update existing geometry
        (this.constellationLines.geometry as THREE.BufferGeometry).setFromPoints(lineSegments);
      }
    }
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Rotação constante do cubo dentro do seu grupo
    this.instancedCube.rotation.y += 0.002;
    this.instancedCube.rotation.x += 0.001;

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

    for (let i = 0; i < this.instanceData.length; i++) {
      const data = this.instanceData[i];
      const delay = data.explosionDelay;
      const randomOffset = data.randomStartOffset;
      
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
        .copy(data.explosionVector)
        .multiplyScalar(easedProgress * explosionDistance)
        .add(data.originalPosition);
      
      // Movimento suave com interpolação
      data.currentPosition.lerp(targetPosition, 0.1);
      
      // Opcional: Faz os voxels rotacionarem levemente enquanto voam
      if (individualProgress > 0) {
        data.rotation.x += 0.02 * individualProgress;
        data.rotation.y += 0.03 * individualProgress;
        data.rotation.z += 0.015 * individualProgress;
      }

      // Update the matrix
      const matrix = new THREE.Matrix4();
      matrix.makeRotationFromEuler(data.rotation);
      matrix.setPosition(data.currentPosition);
      this.instancedCube.setMatrixAt(i, matrix);
    }

    this.instancedCube.instanceMatrix.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }
}
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// @ts-ignore
import { MindARThree } from '../../lib/mindar-face-three.js';
import { CameraService } from '../../services/camera.service';

class Avatar {
  gltf: any = null;
  morphTargetMeshes: any[] = [];
  root: any = null;

  async init() {
    const url = "https://assets.codepen.io/9177687/raccoon_head.glb";
    const gltf = await new Promise((resolve) => {
      const loader = new GLTFLoader();
      loader.load(url, (gltf: any) => {
        resolve(gltf);
      });
    });
    (gltf as any).scene.traverse((object: any) => {
      if ((object).isBone && !this.root) {
        this.root = object; // as THREE.Bone;
      }
      if (!(object).isMesh) return
      const mesh = object;
      if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) return
      this.morphTargetMeshes.push(mesh);
    });
    this.gltf = gltf;
  }

  updateBlendshapes(blendshapes: any) {
    const categories = blendshapes.categories;
    let coefsMap = new Map();
    for (let i = 0; i < categories.length; ++i) {
      coefsMap.set(categories[i].categoryName, categories[i].score);
    }
    for (const mesh of this.morphTargetMeshes) {
      if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) {
        continue;
      }
      for (const [name, value] of coefsMap) {
        if (!Object.keys(mesh.morphTargetDictionary).includes(name)) {
          continue;
        }
        const idx = mesh.morphTargetDictionary[name];
        mesh.morphTargetInfluences[idx] = value;
      }
    }
  }
}

@Component({
  selector: 'app-mocap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mocap.component.html',
  styleUrls: ['./mocap.component.scss']
})
export class MocapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  mindarThree: any;
  avatar: Avatar | null = null;
  isStarted = false;

  constructor(private cameraService: CameraService) { }

  async ngAfterViewInit() {
    // Wait for view to initialize
    setTimeout(async () => {
      await this.setup();
      await this.start();
    }, 1000);
  }

  async setup() {
    this.mindarThree = new MindARThree({
      container: this.containerRef.nativeElement,
    });
    const { renderer, scene, camera } = this.mindarThree;

    // Ensure renderer has transparent background
    renderer.setClearColor(0x000000, 0);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);
    const anchor = this.mindarThree.addAnchor(1);

    this.avatar = new Avatar();
    await this.avatar.init();
    if (this.avatar.gltf) {
      this.avatar.gltf.scene.scale.set(2, 2, 2);
      anchor.group.add(this.avatar.gltf.scene);
    }
  }

  async start() {
    if (!this.mindarThree) {
      await this.setup();
    }

    try {
      await this.mindarThree.start();
      this.isStarted = true;

      const { renderer, scene, camera } = this.mindarThree;

      renderer.setAnimationLoop(() => {
        const estimate = this.mindarThree.getLatestEstimate();
        if (estimate && estimate.blendshapes && this.avatar) {
          this.avatar.updateBlendshapes(estimate.blendshapes);
        }
        renderer.render(scene, camera);
      });
    } catch (err) {
      console.error('Failed to start MindAR:', err);
    }
  }

  stop() {
    if (this.mindarThree) {
      this.mindarThree.stop();
      const { renderer } = this.mindarThree;
      renderer.setAnimationLoop(null);
    }
    this.isStarted = false;
  }

  ngOnDestroy() {
    this.stop();
  }
}

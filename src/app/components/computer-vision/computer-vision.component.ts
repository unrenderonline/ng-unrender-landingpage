import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { CameraService } from '../../services/camera.service';

@Component({
  selector: 'app-computer-vision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './computer-vision.component.html',
  styleUrls: ['./computer-vision.component.scss']
})
export class ComputerVisionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  model: cocoSsd.ObjectDetection | null = null;
  loadingStatus: string | null = 'Carregando modelo IA...';
  isCameraActive = false;
  error: string | null = null;
  private animationId: number | null = null;

  private translations: { [key: string]: string } = {
    'person': 'pessoa',
    'bicycle': 'bicicleta',
    'car': 'carro',
    'motorcycle': 'motocicleta',
    'airplane': 'avião',
    'bus': 'ônibus',
    'train': 'trem',
    'truck': 'caminhão',
    'boat': 'barco',
    'traffic light': 'semáforo',
    'fire hydrant': 'hidrante',
    'stop sign': 'pare',
    'parking meter': 'parquímetro',
    'bench': 'banco',
    'bird': 'pássaro',
    'cat': 'gato',
    'dog': 'cachorro',
    'horse': 'cavalo',
    'sheep': 'ovelha',
    'cow': 'vaca',
    'elephant': 'elefante',
    'bear': 'urso',
    'zebra': 'zebra',
    'giraffe': 'girafa',
    'backpack': 'mochila',
    'umbrella': 'guarda-chuva',
    'handbag': 'bolsa',
    'tie': 'gravata',
    'suitcase': 'mala',
    'frisbee': 'frisbee',
    'skis': 'esquis',
    'snowboard': 'snowboard',
    'sports ball': 'bola',
    'kite': 'pipa',
    'baseball bat': 'taco de beisebol',
    'baseball glove': 'luva de beisebol',
    'skateboard': 'skate',
    'surfboard': 'prancha de surf',
    'tennis racket': 'raquete de tênis',
    'bottle': 'garrafa',
    'wine glass': 'taça de vinho',
    'cup': 'xícara',
    'fork': 'garfo',
    'knife': 'faca',
    'spoon': 'colher',
    'bowl': 'tigela',
    'banana': 'banana',
    'apple': 'maçã',
    'sandwich': 'sanduíche',
    'orange': 'laranja',
    'broccoli': 'brócolis',
    'carrot': 'cenoura',
    'hot dog': 'cachorro-quente',
    'pizza': 'pizza',
    'donut': 'rosquinha',
    'cake': 'bolo',
    'chair': 'cadeira',
    'couch': 'sofá',
    'potted plant': 'planta',
    'bed': 'cama',
    'dining table': 'mesa de jantar',
    'toilet': 'vaso sanitário',
    'tv': 'tv',
    'laptop': 'notebook',
    'mouse': 'mouse',
    'remote': 'controle remoto',
    'keyboard': 'teclado',
    'cell phone': 'celular',
    'microwave': 'micro-ondas',
    'oven': 'forno',
    'toaster': 'torradeira',
    'sink': 'pia',
    'refrigerator': 'geladeira',
    'book': 'livro',
    'clock': 'relógio',
    'vase': 'vaso',
    'scissors': 'tesoura',
    'teddy bear': 'urso de pelúcia',
    'hair drier': 'secador de cabelo',
    'toothbrush': 'escova de dentes'
  };

  constructor(private cameraService: CameraService) { }

  async ngAfterViewInit() {
    // Defer model loading to prevent UI blocking during tab switch
    setTimeout(async () => {
      try {
        this.model = await cocoSsd.load();
        this.loadingStatus = null;
      } catch (err) {
        this.error = 'Failed to load TensorFlow model.';
        this.loadingStatus = null;
        console.error(err);
      }
    }, 500);
  }

  async startCamera() {
    this.error = null;
    if (!this.model) return;

    this.loadingStatus = 'Iniciando câmera...';

    try {
      const stream = await this.cameraService.startCamera();

      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.onloadedmetadata = () => {
          this.videoElement.nativeElement.play();
          this.isCameraActive = true;
          this.loadingStatus = null;
          this.detectFrame();
        };
      }
    } catch (err) {
      this.error = 'Could not access camera. Please allow camera permissions.';
      this.loadingStatus = null;
      console.error(err);
    }
  }

  async checkPermissionsAndStart() {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({ name: 'camera' as any });
        if (result.state === 'granted') {
          this.startCamera();
          return;
        }
      }
    } catch (e) {
      console.log('Permission check failed', e);
    }
    this.loadingStatus = null;
  }

  stopCamera() {
    if (this.videoElement && this.videoElement.nativeElement.srcObject) {
      this.videoElement.nativeElement.srcObject = null;
    }
    this.cameraService.stopCamera();
    this.isCameraActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    // Clear canvas
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  detectFrame = () => {
    if (!this.isCameraActive || !this.model) return;

    this.model.detect(this.videoElement.nativeElement).then(predictions => {
      this.renderPredictions(predictions);
      this.animationId = requestAnimationFrame(this.detectFrame);
    });
  };

  renderPredictions(predictions: cocoSsd.DetectedObject[]) {
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Match canvas size to video size
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px sans-serif';
    ctx.textBaseline = 'top';

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];

      // Draw bounding box
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      // Translate label
      const label = this.getTranslatedLabel(prediction.class);

      // Draw label background
      ctx.fillStyle = '#00FFFF';
      const textWidth = ctx.measureText(label).width;
      ctx.fillRect(x, y, textWidth + 4, 20);

      // Draw label text
      ctx.fillStyle = '#000000';
      ctx.fillText(label, x + 2, y + 2);
    });
  }

  private getTranslatedLabel(label: string): string {
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith('pt')) {
      return this.translations[label.toLowerCase()] || label;
    }
    return label;
  }

  ngOnDestroy() {
    this.stopCamera();
  }
}

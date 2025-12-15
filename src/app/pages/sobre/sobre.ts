import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';

// Classe para definir a estrutura de uma partícula
class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;

  constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // Método para desenhar a partícula no canvas
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
  }
}


@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [],
  templateUrl: './sobre.html',
  styleUrl: './sobre.scss'
})
export class Sobre implements AfterViewInit, OnDestroy {
   @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particlesArray: Particle[] = [];
  private animationFrameId!: number;

  private mouse = {
    x: null as number | null,
    y: null as number | null,
    radius: 0
  };

  // --- LÓGICA DO CARROSSEL ---
  public projects = [
    { imgSrc: 'sobreERP.jpg', caption: 'Sistema de gestão completo.' },
    { imgSrc: 'sobrePDV.jpg', caption: 'Frente de Caixa e Pedidos Online.' },
    { imgSrc: 'sobreAI.jpg', caption: 'IA para assistência na tomada de decisão.' }
  ];
  public currentSlide = 0;
  private intervalId: any;
  // --- FIM DA LÓGICA DO CARROSSEL ---

  private mouseMoveListener!: (event: MouseEvent) => void;
  private resizeListener!: () => void;
  private mouseOutListener!: () => void;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Não foi possível obter o contexto 2D do canvas.');
      return;
    }
    this.ctx = context;

    this.setupCanvas();
    this.initParticles();
    this.addEventListeners();
    this.startCarousel();
    
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  // --- MÉTODOS DO CARROSSEL ---
  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 7000); // Muda a cada 7 segundos
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.projects.length;
  }

  selectSlide(index: number): void {
    this.currentSlide = index;
    // Reinicia o intervalo para não haver uma troca rápida
    clearInterval(this.intervalId);
    this.startCarousel();
  }
  // --- FIM DOS MÉTODOS DO CARROSSEL ---

  setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.mouse.radius = (canvas.height / 120) * (canvas.width / 120);
  }

  initParticles(): void {
    this.particlesArray = [];
    const canvas = this.canvasRef.nativeElement;
    const numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      const size = (Math.random() * 3) + 2;
      const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
      const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      const directionX = (Math.random() * 0.4) - 0.2;
      const directionY = (Math.random() * 0.4) - 0.2;
      // Cor dos pontos da constelação do Hero Cube: #4f607b (rgb(79, 96, 123))
      const color = 'rgba(79, 96, 123, 1)';
      this.particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  animate(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.updateParticles();
    this.connectParticles();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  updateParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    for (const particle of this.particlesArray) {
      if (particle.x > canvas.width || particle.x < 0) particle.directionX = -particle.directionX;
      if (particle.y > canvas.height || particle.y < 0) particle.directionY = -particle.directionY;
      
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.mouse.radius + particle.size) {
          if (this.mouse.x < particle.x && particle.x < canvas.width - particle.size * 10) particle.x += 5;
          if (this.mouse.x > particle.x && particle.x > particle.size * 10) particle.x -= 5;
          if (this.mouse.y < particle.y && particle.y < canvas.height - particle.size * 10) particle.y += 5;
          if (this.mouse.y > particle.y && particle.y > particle.size * 10) particle.y -= 5;
        }
      }
      particle.x += particle.directionX;
      particle.y += particle.directionY;
      particle.draw(this.ctx);
    }
  }

  connectParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    for (let a = 0; a < this.particlesArray.length; a++) {
      for (let b = a; b < this.particlesArray.length; b++) {
        const distance = ((this.particlesArray[a].x - this.particlesArray[b].x) ** 2) + ((this.particlesArray[a].y - this.particlesArray[b].y) ** 2);
        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          const opacityValue = 1 - (distance / 20000);
          // Cor das linhas da constelação do Hero Cube: #2a3a52 (rgb(42, 58, 82))
          this.ctx.strokeStyle = `rgba(42, 58, 82, ${opacityValue})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particlesArray[a].x, this.particlesArray[a].y);
          this.ctx.lineTo(this.particlesArray[b].x, this.particlesArray[b].y);
          this.ctx.stroke();
        }
      }
    }
  }

  addEventListeners(): void {
    this.mouseMoveListener = (event: MouseEvent) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    };
    this.resizeListener = () => {
      this.setupCanvas();
      this.initParticles();
    };
    this.mouseOutListener = () => {
      this.mouse.x = null;
      this.mouse.y = null;
    };

    window.addEventListener('mousemove', this.mouseMoveListener);
    window.addEventListener('resize', this.resizeListener);
    window.addEventListener('mouseout', this.mouseOutListener);
  }

  ngOnDestroy(): void {
    // Limpa os listeners e para a animação para evitar vazamento de memória
    window.removeEventListener('mousemove', this.mouseMoveListener);
    window.removeEventListener('resize', this.resizeListener);
    window.removeEventListener('mouseout', this.mouseOutListener);
    cancelAnimationFrame(this.animationFrameId);
    // Limpa o intervalo do carrossel
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

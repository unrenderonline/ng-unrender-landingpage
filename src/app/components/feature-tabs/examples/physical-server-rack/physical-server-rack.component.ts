import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faServer, faMicrochip, faNetworkWired, faWind } from '@fortawesome/free-solid-svg-icons';

interface Gpu {
  id: string;
  name: string;
  load: number; // 0-100
  temperature: number; // 0-100 (normalized)
  fansSpeed: number; // 0-100
  active: boolean;
  color: string;
  x?: number; // For connection lines
  y?: number;
}

interface ServerUnit {
  id: string;
  gpus: Gpu[];
}

interface DataPacket {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number; // 0-100%
  targetGpuId: string;
}

@Component({
  selector: 'app-physical-server-rack',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './physical-server-rack.component.html',
  styleUrls: ['./physical-server-rack.component.scss']
})
export class PhysicalServerRackComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('rackContainer') rackContainer!: ElementRef;
  @ViewChild('switchElement') switchElement!: ElementRef;
  @ViewChildren('gpuElement') gpuElements!: QueryList<ElementRef>;

  faServer = faServer;
  faMicrochip = faMicrochip;
  faNetworkWired = faNetworkWired;
  faWind = faWind;

  servers: ServerUnit[] = [];
  packets: DataPacket[] = [];
  
  private simulationInterval: any;
  private animationFrameId: any;

  // Switch position (Top center)
  switchPos = { x: 50, y: 10 }; // Percentages

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeRack();
  }

  ngAfterViewInit() {
    // Give time for layout to settle then start animation
    setTimeout(() => {
      this.calculatePositions();
      this.startSimulation();
    }, 500);
  }

  @HostListener('window:resize')
  onResize() {
    this.calculatePositions();
  }

  ngOnDestroy() {
    if (this.simulationInterval) clearInterval(this.simulationInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  initializeRack() {
    // Create 4 servers, each with 3 GPUs
    for (let i = 0; i < 4; i++) {
      const gpus: Gpu[] = [];
      for (let j = 0; j < 3; j++) {
        gpus.push({
          id: `gpu-${i}-${j}`,
          name: `RTX 4090`,
          load: 0,
          temperature: 30,
          fansSpeed: 0,
          active: false,
          color: 'rgba(200, 200, 200, 0.1)' // Initial colorless/gray
        });
      }
      this.servers.push({ id: `server-${i}`, gpus });
    }
  }

  calculatePositions() {
    if (!this.rackContainer || !this.switchElement || !this.gpuElements) return;

    const containerRect = this.rackContainer.nativeElement.getBoundingClientRect();
    const switchRect = this.switchElement.nativeElement.getBoundingClientRect();

    // Calculate Switch Position relative to container (percentage)
    this.switchPos = {
      x: ((switchRect.left + switchRect.width / 2 - containerRect.left) / containerRect.width) * 100,
      y: ((switchRect.top + switchRect.height / 2 - containerRect.top) / containerRect.height) * 100
    };

    // Map GPU elements to data
    const gpuElementsArray = this.gpuElements.toArray();
    let elementIndex = 0;

    this.servers.forEach(server => {
      server.gpus.forEach(gpu => {
        if (elementIndex < gpuElementsArray.length) {
          const el = gpuElementsArray[elementIndex].nativeElement;
          const rect = el.getBoundingClientRect();
          
          gpu.x = ((rect.left + rect.width / 2 - containerRect.left) / containerRect.width) * 100;
          gpu.y = ((rect.top + rect.height / 2 - containerRect.top) / containerRect.height) * 100;
          
          elementIndex++;
        }
      });
    });
  }

  startSimulation() {
    // 1. Traffic Generation Loop
    this.simulationInterval = setInterval(() => {
      this.generateTraffic();
      this.updateHardwarePhysics();
    }, 100);

    // 2. Animation Loop (60fps)
    const animate = () => {
      this.updatePackets();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }

  generateTraffic() {
    // Randomly spawn packets targeting random GPUs
    if (Math.random() > 0.7) { // 30% chance per tick
      const randomServer = this.servers[Math.floor(Math.random() * this.servers.length)];
      const randomGpu = randomServer.gpus[Math.floor(Math.random() * randomServer.gpus.length)];
      
      this.packets.push({
        id: Date.now() + Math.random(),
        startX: this.switchPos.x,
        startY: this.switchPos.y,
        targetX: randomGpu.x || 50,
        targetY: randomGpu.y || 50,
        progress: 0,
        targetGpuId: randomGpu.id
      });
    }
  }

  updatePackets() {
    const speed = 2; // % per frame
    
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const packet = this.packets[i];
      packet.progress += speed;

      if (packet.progress >= 100) {
        // Hit target
        this.processPacketHit(packet.targetGpuId);
        this.packets.splice(i, 1);
      }
    }
    this.cdr.detectChanges();
  }

  processPacketHit(gpuId: string) {
    // Find GPU and spike load
    for (const server of this.servers) {
      const gpu = server.gpus.find(g => g.id === gpuId);
      if (gpu) {
        gpu.load = Math.min(100, gpu.load + 20);
        gpu.active = true;
        break;
      }
    }
  }

  updateHardwarePhysics() {
    this.servers.forEach(server => {
      server.gpus.forEach(gpu => {
        // Decay load
        gpu.load = Math.max(0, gpu.load - 2);
        
        // Temperature follows load (lagged)
        const targetTemp = 30 + (gpu.load * 0.6); // Max ~90C
        gpu.temperature += (targetTemp - gpu.temperature) * 0.1;

        // Fans follow temperature
        gpu.fansSpeed = Math.max(0, (gpu.temperature - 30) * 1.5); // 0 at 30C, 90 at 90C

        // Color calculation (Grayscale to Heatmap)
        // 0% load -> Gray/Transparent
        // 100% load -> Red/Orange
        if (gpu.load < 5) {
           gpu.color = 'rgba(226, 232, 240, 0.2)'; // Slate-200 low opacity
           gpu.active = false;
        } else {
           // HSL transition: 
           // Low load: Blue/Green (Hue 200 -> 120)
           // High load: Red (Hue 0)
           // Saturation increases with load
           const hue = Math.max(0, 120 - (gpu.load * 1.2)); // Green to Red
           const lightness = 60;
           const alpha = 0.5 + (gpu.load / 200); // More opaque as load increases
           gpu.color = `hsla(${hue}, 80%, ${lightness}%, ${alpha})`;
        }
      });
    });
  }
}

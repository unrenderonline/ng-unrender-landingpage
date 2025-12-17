import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faServer, faMicrochip, faNetworkWired, faWind, faBolt, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

interface Gpu {
  id: string;
  name: string;
  load: number; // 0-100
  temperature: number; // Celsius
  memory: number; // Used GB
  fansSpeed: number; // 0-100
  active: boolean;
  status: 'idle' | 'working' | 'overheating';
  currentTask?: string;
  color: string;
  x?: number; // For connection lines
  y?: number;
}

interface ServerUnit {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  gpus: Gpu[];
  cpuLoad: number;
}

interface Task {
  id: string;
  name: string;
  complexity: number; // Affects duration/load
  progress: number;
  assignedTo?: string; // GPU ID

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
  faBolt = faBolt;
  faTemperatureHigh = faTemperatureHigh;

  servers: ServerUnit[] = [];
  packets: DataPacket[] = [];
  taskQueue: Task[] = [];
  completedTasks: Task[] = [];

  private simulationInterval: any;
  private taskGeneratorInterval: any;
  private animationFrameId: any;

  // Switch position (Top center)
  switchPos = { x: 50, y: 10 }; // Percentages

  constructor(private cdr: ChangeDetectorRef) { }

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
    if (this.taskGeneratorInterval) clearInterval(this.taskGeneratorInterval);
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
          memory: 0,
          fansSpeed: 0,
          active: false,
          status: 'idle',
          color: 'rgba(200, 200, 200, 0.1)' // Initial colorless/gray
        });
      }
      this.servers.push({
        id: `server-${i}`,
        name: `AI-NODE-0${i + 1}`,
        status: 'online',
        cpuLoad: 10,
        gpus
      });
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
    // 1. Traffic & Task Simulation Loop
    this.simulationInterval = setInterval(() => {
      this.processTasks();
      this.updateHardwarePhysics();
      // Keep generating visual packets for active tasks
      this.generateTaskTraffic();
    }, 100);

    // Generate new tasks periodically
    this.taskGeneratorInterval = setInterval(() => {
      if (this.taskQueue.length < 10) {
        this.generateTask();
      }
    }, 2000);

    // 2. Animation Loop (60fps)
    const animate = () => {
      this.updatePackets();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }

  generateTask() {
    const taskTypes = ['Treinamento de Lote', 'Inferência YOLOv8', 'Processamento de Dados', 'Validação de Modelo', 'Renderização NeRF', 'Fine-tuning LLM'];
    const type = taskTypes[Math.floor(Math.random() * taskTypes.length)];
    const id = Math.random().toString(36).substr(2, 5).toUpperCase();

    this.taskQueue.push({
      id: `TASK-${id}`,
      name: type,
      complexity: Math.floor(Math.random() * 50) + 50, // 50-100
      progress: 0
    });
  }

  processTasks() {
    // 1. Assign pending tasks to idle GPUs
    const idleGpus = this.getAllGpus().filter(g => g.status === 'idle' && this.getServerOfGpu(g.id)?.status === 'online');
    const pendingTasks = this.taskQueue.filter(t => !t.assignedTo);

    pendingTasks.forEach(task => {
      if (idleGpus.length > 0) {
        // Load Balancing: Pick GPU with lowest temp/best health
        idleGpus.sort((a, b) => a.temperature - b.temperature);
        const targetGpu = idleGpus.shift();

        if (targetGpu) {
          targetGpu.status = 'working';
          targetGpu.currentTask = task.name;
          task.assignedTo = targetGpu.id;
        }
      }
    });

    // 2. Progress active tasks
    this.taskQueue.forEach((task, index) => {
      if (task.assignedTo) {
        const gpu = this.getGpuById(task.assignedTo);
        const server = this.getServerOfGpu(task.assignedTo!);

        // Failover Check: If server died, unassign task
        if (!server || server.status !== 'online') {
          task.assignedTo = undefined; // Return to queue
          return;
        }

        if (gpu) {
          // Progress task
          task.progress += 2; // Speed (slower than original since tick is faster)

          // Update GPU stats based on work
          gpu.load = Math.min(100, gpu.load + 5);
          // Temp updated in updateHardwarePhysics
          gpu.memory = Math.min(24, gpu.memory + 0.5); // Max 24GB

          if (task.progress >= 100) {
            // Task Complete
            this.completeTask(index, gpu);
          }
        }
      }
    });
  }

  completeTask(index: number, gpu: Gpu) {
    const task = this.taskQueue[index];
    this.completedTasks.unshift(task);
    if (this.completedTasks.length > 5) this.completedTasks.pop();

    this.taskQueue.splice(index, 1);

    // Reset GPU
    gpu.status = 'idle';
    gpu.currentTask = undefined;
    gpu.load = 0;
  }

  generateTaskTraffic() {
    // Generate packets only for working GPUs
    const workingGpus = this.getAllGpus().filter(g => g.status === 'working');

    if (workingGpus.length > 0 && Math.random() > 0.5) {
      const randomGpu = workingGpus[Math.floor(Math.random() * workingGpus.length)];

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
    // Visual only now, load controlled by task
    const gpu = this.getGpuById(gpuId);
    if (gpu) {
      gpu.active = true;
      // Maybe tiny boost to show impact
    }
  }

  updateHardwarePhysics() {
    this.servers.forEach(server => {
      if (server.status === 'online') {
        server.cpuLoad = Math.max(5, Math.min(100, server.cpuLoad + (Math.random() * 4 - 2)));

        server.gpus.forEach(gpu => {
          if (gpu.status === 'idle') {
            gpu.load = Math.max(0, gpu.load - 5);
            gpu.memory = Math.max(0, gpu.memory - 1);
          }

          // Temperature follows load
          const targetTemp = 30 + (gpu.load * 0.6);
          gpu.temperature += (targetTemp - gpu.temperature) * 0.05;

          // Fans follow temperature
          gpu.fansSpeed = Math.max(0, (gpu.temperature - 30) * 1.5);

          // Color calculation
          if (gpu.load < 5) {
            gpu.color = 'rgba(226, 232, 240, 0.2)';
            gpu.active = false;
          } else {
            const hue = Math.max(0, 120 - (gpu.load * 1.2));
            const lightness = 60;
            const alpha = 0.5 + (gpu.load / 200);
            gpu.color = `hsla(${hue}, 80%, ${lightness}%, ${alpha})`;
          }
        });
      } else {
        // Offline
        server.cpuLoad = 0;
        server.gpus.forEach(gpu => {
          gpu.load = 0;
          gpu.fansSpeed = Math.max(0, gpu.fansSpeed - 2);
          gpu.temperature = Math.max(20, gpu.temperature - 0.5);
          gpu.color = 'rgba(50, 50, 50, 0.1)';
          gpu.active = false;
        });
      }
    });
  }

  // Helpers
  getAllGpus(): Gpu[] {
    return this.servers.flatMap(s => s.gpus);
  }

  getGpuById(id: string): Gpu | undefined {
    return this.getAllGpus().find(g => g.id === id);
  }

  getServerOfGpu(gpuId: string): ServerUnit | undefined {
    return this.servers.find(s => s.gpus.some(g => g.id === gpuId));
  }

  toggleServerStatus(server: ServerUnit) {
    server.status = server.status === 'online' ? 'offline' : 'online';
  }
}

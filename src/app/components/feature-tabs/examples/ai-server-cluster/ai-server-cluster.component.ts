import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faServer, faMicrochip, faNetworkWired, faBolt, faTemperatureHigh, faCheckCircle, faExclamationTriangle, faSync } from '@fortawesome/free-solid-svg-icons';

interface Gpu {
  id: string;
  name: string;
  load: number; // 0-100
  temp: number; // Celsius
  memory: number; // Used GB
  status: 'idle' | 'working' | 'overheating';
  currentTask?: string;
}

interface Server {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  gpus: Gpu[];
  cpuLoad: number;
  ramUsage: number;
}

interface Task {
  id: string;
  name: string;
  complexity: number; // Affects duration/load
  progress: number;
  assignedTo?: string; // GPU ID
}

@Component({
  selector: 'app-ai-server-cluster',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ai-server-cluster.component.html',
  styleUrls: ['./ai-server-cluster.component.scss']
})
export class AiServerClusterComponent implements OnInit, OnDestroy {
  // Icons
  faServer = faServer;
  faMicrochip = faMicrochip;
  faNetworkWired = faNetworkWired;
  faBolt = faBolt;
  faTemperatureHigh = faTemperatureHigh;
  faCheckCircle = faCheckCircle;
  faExclamationTriangle = faExclamationTriangle;
  faSync = faSync;

  servers: Server[] = [];
  taskQueue: Task[] = [];
  completedTasks: Task[] = [];
  
  private simulationInterval: any;
  private taskGeneratorInterval: any;

  ngOnInit() {
    this.initializeCluster();
    this.startSimulation();
  }

  ngOnDestroy() {
    if (this.simulationInterval) clearInterval(this.simulationInterval);
    if (this.taskGeneratorInterval) clearInterval(this.taskGeneratorInterval);
  }

  initializeCluster() {
    // Create 3 servers
    for (let i = 1; i <= 3; i++) {
      const gpus: Gpu[] = [];
      // Each server has 2 GPUs
      for (let j = 1; j <= 2; j++) {
        gpus.push({
          id: `gpu-${i}-${j}`,
          name: `RTX 4090 #${j}`,
          load: 0,
          temp: 35,
          memory: 0,
          status: 'idle'
        });
      }

      this.servers.push({
        id: `server-${i}`,
        name: `AI-NODE-0${i}`,
        status: 'online',
        gpus: gpus,
        cpuLoad: 10,
        ramUsage: 16
      });
    }
  }

  startSimulation() {
    // Main simulation loop (100ms)
    this.simulationInterval = setInterval(() => {
      this.processTasks();
      this.updateHardwareStats();
    }, 200);

    // Generate new tasks periodically
    this.taskGeneratorInterval = setInterval(() => {
      if (this.taskQueue.length < 10) {
        this.generateTask();
      }
    }, 2000);
  }

  generateTask() {
    const taskTypes = ['Treinamento de Lote', 'Inferência YOLOv8', 'Processamento de Dados', 'Validação de Modelo', 'Renderização NeRF'];
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
        idleGpus.sort((a, b) => a.temp - b.temp);
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
          task.progress += 5; // Speed
          
          // Update GPU stats based on work
          gpu.load = Math.min(100, gpu.load + 10);
          gpu.temp = Math.min(85, gpu.temp + 0.5);
          gpu.memory = Math.min(80, gpu.memory + 2);

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

  updateHardwareStats() {
    this.servers.forEach(server => {
      if (server.status === 'online') {
        // Cool down GPUs
        server.gpus.forEach(gpu => {
          if (gpu.status === 'idle') {
            gpu.temp = Math.max(35, gpu.temp - 1);
            gpu.memory = Math.max(0, gpu.memory - 5);
          }
        });
        
        // Random CPU fluctuation
        server.cpuLoad = Math.max(5, Math.min(100, server.cpuLoad + (Math.random() * 10 - 5)));
      } else {
        // Offline server stats drop
        server.cpuLoad = 0;
        server.gpus.forEach(g => {
          g.load = 0;
          g.temp = Math.max(20, g.temp - 2);
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

  getServerOfGpu(gpuId: string): Server | undefined {
    return this.servers.find(s => s.gpus.some(g => g.id === gpuId));
  }

  toggleServerStatus(server: Server) {
    server.status = server.status === 'online' ? 'offline' : 'online';
    // If going offline, tasks will be automatically re-queued by processTasks loop
  }
}

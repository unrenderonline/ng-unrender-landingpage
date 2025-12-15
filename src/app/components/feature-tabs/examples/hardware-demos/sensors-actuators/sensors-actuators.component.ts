import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThermometerHalf, faTint, faFan, faLightbulb, faDoorOpen, faDoorClosed, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sensors-actuators',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="w-full h-full bg-slate-50 rounded-2xl overflow-y-auto p-6 font-sans text-slate-800">
      
      <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
        <span class="w-2 h-8 bg-unrender-purple rounded-full"></span>
        Monitoramento & Controle IoT
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Sensors Section -->
        <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-6">
          <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">Sensores (Leitura)</h3>
          
          <!-- Rain Sensor Visual -->
          <div class="border border-slate-200 rounded-lg p-4 bg-slate-50">
            <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold text-slate-600">Sensor de Chuva</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold" 
                      [ngClass]="waterLevel > 3 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'">
                    {{ waterLevel > 3 ? 'VAZAMENTO DETECTADO' : 'SECO' }}
                </span>
            </div>
            
            <!-- PCB Visual -->
            <div class="relative w-full h-32 bg-green-700 rounded shadow-inner overflow-hidden cursor-pointer group" (click)="addWaterDrop($event)">
                <!-- Copper Traces -->
                <div class="absolute inset-0 flex flex-col justify-between py-2 px-4 opacity-50 pointer-events-none">
                    <div *ngFor="let i of [1,2,3,4,5]" class="w-full h-1 bg-yellow-500"></div>
                    <div class="absolute top-0 left-1/2 w-1 h-full bg-green-800"></div>
                </div>
                
                <!-- Water Drops -->
                <div *ngFor="let drop of waterDrops" 
                     class="absolute w-4 h-4 bg-blue-400 rounded-full shadow-sm opacity-80 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                     [style.left.%]="drop.x"
                     [style.top.%]="drop.y"
                     [style.opacity]="drop.opacity">
                </div>

                <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="bg-black/50 text-white text-[10px] px-2 py-1 rounded">Clique para adicionar água</span>
                </div>
            </div>
            <div class="mt-2 text-[10px] text-slate-400 text-center">Nível de Água: {{ waterLevel }}%</div>
          </div>

          <!-- Temperature Sensor -->
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            <div class="flex items-center gap-3 flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                <fa-icon [icon]="faThermometerHalf"></fa-icon>
              </div>
              <div>
                <div class="text-xs text-slate-500">Temperatura</div>
                <div class="font-bold text-lg">{{ temperature | number:'1.1-1' }}°C</div>
              </div>
            </div>
            <!-- Graph Line (Mock) -->
            <div class="flex gap-0.5 items-end h-8 overflow-hidden flex-shrink min-w-0 max-w-[120px] sm:max-w-none">
              <div *ngFor="let val of tempHistory" [style.height.%]="val" class="w-1 bg-orange-300 rounded-t-sm flex-shrink-0"></div>
            </div>
          </div>

        </div>

        <!-- Actuators Section -->
        <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-6">
          <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">Atuadores (Controle)</h3>
          
          <!-- Solenoid Lock Visual -->
          <div class="border border-slate-200 rounded-lg p-4 bg-slate-50 relative overflow-hidden">
             <div class="flex justify-between items-center mb-4">
                <span class="text-xs font-bold text-slate-600">Trava Solenóide</span>
                <button (click)="toggleDoor()" 
                        class="text-[10px] px-3 py-1 rounded font-bold transition-colors"
                        [ngClass]="doorLocked ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'">
                    {{ doorLocked ? 'DESTRANCAR' : 'TRANCAR' }}
                </button>
            </div>
            
            <div class="flex items-center justify-center h-24 bg-slate-200 rounded shadow-inner relative overflow-hidden">
                <div class="flex items-center gap-8 sm:gap-16 transition-all duration-500">
                    <!-- Solenoid Body Wrapper -->
                    <div class="relative">
                        <div class="w-20 sm:w-24 h-16 bg-slate-700 rounded flex items-center justify-center relative z-10 shadow-lg">
                            <div class="w-16 sm:w-20 h-12 border-2 border-yellow-600/30 rounded flex flex-col justify-around px-1">
                                <div *ngFor="let i of [1,2,3,4]" class="w-full h-1 bg-yellow-600/50 rounded-full"></div>
                            </div>
                        </div>
                        <!-- The Bolt (Piston) -->
                        <div class="h-6 sm:h-8 bg-slate-400 rounded-r shadow-md absolute top-1/2 -translate-y-1/2 z-0 border border-slate-500 transition-all duration-300 ease-out"
                             [style.left.%]="50"
                             [style.width.px]="doorLocked ? 100 : 20">
                             <!-- Bolt Detail -->
                             <div class="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-slate-500 rounded-full opacity-50"></div>
                        </div>
                    </div>

                    <!-- Latch Plate -->
                    <div class="w-8 h-12 bg-slate-300 border border-slate-400 rounded shadow-inner flex items-center pl-1 z-10">
                        <div class="w-4 h-8 bg-slate-800 rounded-sm shadow-inner"></div>
                    </div>
                </div>
            </div>
          </div>

          <!-- Fan Control Visual -->
          <div class="border border-slate-200 rounded-lg p-4 bg-slate-50">
             <div class="flex justify-between items-center mb-4">
                <span class="text-xs font-bold text-slate-600">Ventilação Ativa</span>
                <button (click)="toggleFan()" 
                        class="text-[10px] px-3 py-1 rounded font-bold transition-colors"
                        [ngClass]="fanState ? 'bg-unrender-purple text-white' : 'bg-slate-300 text-slate-600'">
                    {{ fanState ? 'DESLIGAR' : 'LIGAR' }}
                </button>
            </div>
            
            <div class="flex justify-center">
                <div class="relative w-32 h-32 bg-slate-800 rounded-full border-4 border-slate-700 shadow-xl flex items-center justify-center overflow-hidden">
                    <!-- Fan Blades -->
                    <div class="absolute w-28 h-28 transition-transform duration-[2s] ease-linear"
                         [ngClass]="{'animate-spin-fast': fanState}">
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-14 bg-slate-600 rounded-full origin-bottom"></div>
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-14 bg-slate-600 rounded-full origin-bottom rotate-90"></div>
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-14 bg-slate-600 rounded-full origin-bottom rotate-180"></div>
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-14 bg-slate-600 rounded-full origin-bottom -rotate-90"></div>
                    </div>
                    <!-- Center Hub -->
                    <div class="absolute w-8 h-8 bg-slate-900 rounded-full border-2 border-slate-600 z-10 flex items-center justify-center">
                        <div class="w-6 h-6 rounded-full border border-slate-700 border-dashed animate-spin" *ngIf="fanState"></div>
                    </div>
                </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  `,
  styles: [`
    .animate-spin-fast {
        animation: spin 0.5s linear infinite;
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
  `]
})
export class SensorsActuatorsComponent implements OnInit, OnDestroy {
  faThermometerHalf = faThermometerHalf;
  faTint = faTint;
  faFan = faFan;
  faLightbulb = faLightbulb;
  faDoorOpen = faDoorOpen;
  faDoorClosed = faDoorClosed;
  faExclamationTriangle = faExclamationTriangle;

  temperature = 24.5;
  humidity = 55;
  
  fanState = false;
  lightState = false;
  doorLocked = true;

  tempHistory: number[] = Array(20).fill(40);
  humHistory: number[] = Array(20).fill(50);
  
  logs: {time: string, source: string, message: string}[] = [];
  intervalId: any;
  rainIntervalId: any;

  // Water Sensor Logic
  waterDrops: {x: number, y: number, opacity: number}[] = [];
  waterLevel = 0;

  ngOnInit() {
    this.addLog('SYSTEM', 'Inicializando módulos IoT...');
    this.intervalId = setInterval(() => this.simulateEnvironment(), 2000);
    
    // Auto Rain (Random droplets)
    this.rainIntervalId = setInterval(() => {
        if (Math.random() > 0.3) { // 70% chance to add a drop
            this.addDrop(Math.random() * 100, Math.random() * 100);
        }
    }, 800);

    // Evaporate water
    setInterval(() => {
        if (this.waterDrops.length > 0) {
            this.waterDrops.forEach(d => d.opacity -= 0.05);
            this.waterDrops = this.waterDrops.filter(d => d.opacity > 0);
            this.waterLevel = Math.max(0, Math.floor(this.waterDrops.length));
        }
    }, 500);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.rainIntervalId) clearInterval(this.rainIntervalId);
  }

  addWaterDrop(event: MouseEvent) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      
      this.addDrop(x, y);
  }

  addDrop(x: number, y: number) {
      this.waterDrops.push({x, y, opacity: 1});
      this.waterLevel = this.waterDrops.length;
      
      if (this.waterLevel === 1) {
          this.addLog('SENSOR', 'Umidade detectada no sensor de chuva');
      }
      if (this.waterLevel > 5) {
          this.addLog('WARNING', 'ALERTA: Chuva Forte Detectada!');
      }
  }

  simulateEnvironment() {
    // Random fluctuation
    const tempChange = (Math.random() - 0.5) * 0.5;
    const humChange = (Math.random() - 0.5) * 2;

    // Fan effect
    if (this.fanState) {
      this.temperature -= 0.2; // Cools down
    } else {
      this.temperature += 0.05; // Slowly heats up
    }

    // Light effect
    if (this.lightState) {
      this.temperature += 0.1; // Heats up slightly
    }

    // Apply changes
    this.temperature += tempChange;
    this.humidity += humChange;

    // Clamp values
    this.temperature = Math.max(18, Math.min(35, this.temperature));
    this.humidity = Math.max(30, Math.min(90, this.humidity));

    // Update history
    this.tempHistory.push((this.temperature - 15) * 4); // Scale for graph
    this.tempHistory.shift();
    
    this.humHistory.push(this.humidity);
    this.humHistory.shift();
  }

  toggleFan() {
    this.fanState = !this.fanState;
    this.addLog('ACTUATOR', `Ventilação ${this.fanState ? 'LIGADA' : 'DESLIGADA'}`);
  }

  toggleLight() {
    this.lightState = !this.lightState;
    this.addLog('ACTUATOR', `Iluminação ${this.lightState ? 'LIGADA' : 'DESLIGADA'}`);
  }

  toggleDoor() {
    this.doorLocked = !this.doorLocked;
    this.addLog('SECURITY', `Solenóide ${this.doorLocked ? 'ATIVADO (Trancado)' : 'DESATIVADO (Aberto)'}`);
  }

  addLog(source: string, message: string) {
    const now = new Date().toLocaleTimeString();
    this.logs.unshift({ time: now, source, message });
    if (this.logs.length > 20) this.logs.pop();
  }
}

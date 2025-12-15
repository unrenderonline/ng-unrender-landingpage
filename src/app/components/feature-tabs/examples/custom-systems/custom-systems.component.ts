import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faHeartbeat, faWalking, faFire, faClock, faMicrochip, faWifi, faServer, faCode, faTerminal, faBolt,
  faHome, faThermometerHalf, faSun, faChargingStation, faArrowLeft, faChartLine, faCog, faCloud, faCamera, faEye,
  faLightbulb, faLock, faMusic, faFan, faCar
} from '@fortawesome/free-solid-svg-icons';
import { faAndroid, faApple } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-custom-systems',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './custom-systems.component.html',
  styleUrls: ['./custom-systems.component.scss']
})
export class CustomSystemsComponent implements OnInit, OnDestroy {
  @Input() type: 'wearable' | 'embedded' | 'smart-hub' | 'edge-ai' = 'wearable';
  @Input() platform: 'android-wear' | 'apple-watch' = 'android-wear';

  // Icons
  faHeartbeat = faHeartbeat;
  faWalking = faWalking;
  faFire = faFire;
  faClock = faClock;
  faMicrochip = faMicrochip;
  faWifi = faWifi;
  faServer = faServer;
  faCode = faCode;
  faTerminal = faTerminal;
  faBolt = faBolt;
  faAndroid = faAndroid;
  faApple = faApple;
  faHome = faHome;
  faThermometerHalf = faThermometerHalf;
  faSun = faSun;
  faChargingStation = faChargingStation;
  faArrowLeft = faArrowLeft;
  faChartLine = faChartLine;
  faCog = faCog;
  faCloud = faCloud;
  faCamera = faCamera;
  faEye = faEye;
  faLightbulb = faLightbulb;
  faLock = faLock;
  faMusic = faMusic;
  faFan = faFan;
  faCar = faCar;

  // Wearable Data
  currentTime: string = '';
  currentDate: string = '';
  heartRate: number = 72;
  steps: number = 3450;
  calories: number = 120;
  
  // Swipe Logic
  watchViewIndex: number = 0; // 0: Face, 1: Apps, 2: Health
  isDragging: boolean = false;
  dragOffset: number = 0;
  private touchStartX: number = 0;
  
  get watchTransform(): string {
    const baseTranslate = -this.watchViewIndex * 33.33; // 3 screens = 100% / 3
    // Convert pixel offset to percentage roughly (assuming ~220px width)
    const pixelToPercent = (this.dragOffset / 220) * 33.33; 
    return `translateX(calc(${baseTranslate}% + ${pixelToPercent}%))`;
  }

  // Embedded Data
  logs: string[] = [];
  temperature: number = 24.5;
  humidity: number = 60;
  ledStatus: boolean = false;
  terminalInput: string = '';

  // Smart Hub Data
  hubTemp: number = 16;
  hubHigh: number = 19;
  hubLow: number = 10;
  activeHubTab: 'ev' | 'home' | 'meter' | 'thermostat' = 'ev';
  
  // Smart Hub Controls
  evBattery: number = 78;
  thermostatTarget: number = 21;
  smartLights: boolean = true;
  smartLock: boolean = false;

  // Edge AI Data
  inferenceTime: number = 12;
  confidence: number = 98;
  detectedObjects: { label: string, x: number, y: number, w: number, h: number, color: string }[] = [];
  
  private intervalId: any;

  ngOnInit() {
    this.updateTime();
    this.startSimulation();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
    this.currentDate = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' });
  }

  // --- Watch Interaction ---
  
  onTouchStart(e: TouchEvent | MouseEvent) {
    this.isDragging = true;
    this.touchStartX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    this.dragOffset = 0;
  }

  onTouchMove(e: TouchEvent | MouseEvent) {
    if (!this.isDragging) return;
    const currentX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    this.dragOffset = currentX - this.touchStartX;
  }

  onTouchEnd(e: TouchEvent | MouseEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    
    const threshold = 50; // px to trigger swipe
    
    if (this.dragOffset < -threshold && this.watchViewIndex < 2) {
      this.watchViewIndex++;
    } else if (this.dragOffset > threshold && this.watchViewIndex > 0) {
      this.watchViewIndex--;
    }
    
    this.dragOffset = 0;
  }

  toggleWatchView() {
    // Fallback for click if needed, or for crown button
    this.watchViewIndex = this.watchViewIndex === 0 ? 1 : 0;
  }

  // --- Terminal Interaction ---

  handleTerminalInput(event: Event) {
    event.preventDefault();
    if (this.terminalInput.trim()) {
      this.addLog(`> ${this.terminalInput}`);
      
      // Simple command processing
      const cmd = this.terminalInput.trim().toLowerCase();
      if (cmd === 'help') {
        this.addLog('[SISTEMA] Comandos: help, clear, status, reboot');
      } else if (cmd === 'clear') {
        this.logs = [];
      } else if (cmd === 'status') {
        this.addLog(`[SISTEMA] CPU: 12% | MEM: 45% | UPTIME: 4d 12h`);
      } else if (cmd === 'reboot') {
        this.addLog('[SISTEMA] Reiniciando...');
        setTimeout(() => this.addLog('[SISTEMA] Sistema pronto.'), 1000);
      } else {
        this.addLog(`[SISTEMA] Comando desconhecido: ${cmd}`);
      }
      
      this.terminalInput = '';
    }
  }

  // --- Smart Hub Interaction ---
  
  setHubTab(tab: 'ev' | 'home' | 'meter' | 'thermostat') {
    this.activeHubTab = tab;
  }

  toggleLight() { this.smartLights = !this.smartLights; }
  toggleLock() { this.smartLock = !this.smartLock; }
  adjustTemp(delta: number) { this.thermostatTarget += delta; }


  startSimulation() {
    this.intervalId = setInterval(() => {
      this.updateTime();
      
      if (this.type === 'wearable') {
        // Simulate health data changes
        this.heartRate = 70 + Math.floor(Math.random() * 10);
        this.steps += Math.floor(Math.random() * 5);
        if (Math.random() > 0.8) this.calories += 1;
      } else if (this.type === 'embedded') {
        // Simulate sensor data and logs
        this.temperature = 24 + (Math.random() * 1 - 0.5);
        this.humidity = 60 + (Math.random() * 2 - 1);
        this.ledStatus = !this.ledStatus;
        
        // Only add auto-logs occasionally so user input isn't buried
        if (Math.random() > 0.6) {
          this.addLog(`[SENSOR] Temp: ${this.temperature.toFixed(1)}C | Umid: ${this.humidity.toFixed(0)}%`);
        }
      } else if (this.type === 'edge-ai') {
        this.inferenceTime = 10 + Math.floor(Math.random() * 5);
        this.confidence = 95 + Math.floor(Math.random() * 4);
        
        // Simulate object detection boxes
        if (Math.random() > 0.3) {
          this.detectedObjects = [
            { label: 'Pessoa', x: 20 + Math.random() * 10, y: 20 + Math.random() * 10, w: 30, h: 60, color: '#d35400' },
            { label: 'Carro', x: 60 + Math.random() * 5, y: 40 + Math.random() * 5, w: 30, h: 20, color: '#ffffff' }
          ];
        }
      }
    }, 2000);
  }

  addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    this.logs.push(`[${timestamp}] ${message}`); // Add to bottom
    // Keep last 12 logs
    if (this.logs.length > 12) this.logs.shift(); 
  }
}

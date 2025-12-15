import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faHeartbeat, faWalking, faFire, faClock, faMicrochip, faWifi, faServer, faCode, faTerminal, faBolt 
} from '@fortawesome/free-solid-svg-icons';
import { faAndroid, faApple } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-custom-systems-demo',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './custom-systems-demo.component.html',
  styleUrls: ['./custom-systems-demo.component.scss']
})
export class CustomSystemsDemoComponent implements OnInit, OnDestroy {
  @Input() type: 'wearable' | 'embedded' = 'wearable';
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

  // Wearable Data
  currentTime: string = '';
  heartRate: number = 72;
  steps: number = 3450;
  calories: number = 120;
  
  // Embedded Data
  logs: string[] = [];
  temperature: number = 24.5;
  humidity: number = 60;
  ledStatus: boolean = false;
  
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
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

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
        
        this.addLog(`[SENSOR] Temp: ${this.temperature.toFixed(1)}C | Hum: ${this.humidity.toFixed(0)}%`);
        if (Math.random() > 0.7) {
          this.addLog(`[WIFI] Signal Strength: -${50 + Math.floor(Math.random() * 20)}dBm`);
        }
      }
    }, 2000);
  }

  addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.logs.unshift(`[${timestamp}] ${message}`);
    if (this.logs.length > 8) this.logs.pop();
  }
}

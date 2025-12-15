import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faPlane, faCamera, faVideo, faMapMarkedAlt, faBroadcastTower, faBatteryFull, faWind
} from '@fortawesome/free-solid-svg-icons';

interface Drone {
  id: string;
  x: number; // Percentage
  y: number; // Percentage
  status: 'scanning' | 'cinema' | 'return';
  battery: number;
  altitude: number;
  speed: number;
}

interface PointCloud {
  x: number;
  y: number;
  opacity: number;
}

@Component({
  selector: 'app-drone-simulation',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './drone-simulation.component.html',
  styleUrls: ['./drone-simulation.component.scss']
})
export class DroneSimulationComponent implements OnInit, OnDestroy {
  // Icons
  faPlane = faPlane;
  faCamera = faCamera;
  faVideo = faVideo;
  faMapMarkedAlt = faMapMarkedAlt;
  faBroadcastTower = faBroadcastTower;
  faBatteryFull = faBatteryFull;
  faWind = faWind;

  drone: Drone = {
    id: 'd1',
    x: 10,
    y: 50,
    status: 'scanning',
    battery: 85,
    altitude: 45,
    speed: 12
  };

  // Controls
  targetAltitude: number = 45;
  targetSpeed: number = 12;
  
  // Recording
  recordingTime: number = 0;
  private recordingInterval: any;

  points: PointCloud[] = [];
  mode: 'lidar' | 'cinema' = 'lidar';
  
  private animationFrameId: any;
  private lastTime = 0;
  private direction = 1; // 1 = right, -1 = left
  private modeLockedUntil = 0;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.startSimulation();
    });
    this.startRecordingTimer();
  }

  ngOnDestroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.recordingInterval) clearInterval(this.recordingInterval);
  }

  startRecordingTimer() {
    this.recordingInterval = setInterval(() => {
      if (this.mode === 'cinema') {
        this.recordingTime++;
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  get formattedRecordingTime(): string {
    const h = Math.floor(this.recordingTime / 3600);
    const m = Math.floor((this.recordingTime % 3600) / 60);
    const s = this.recordingTime % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  setMode(mode: 'lidar' | 'cinema', isManual: boolean = false) {
    if (isManual) {
      this.modeLockedUntil = Date.now() + 10000; // Lock for 10 seconds
    }
    this.mode = mode;
    this.points = []; // Clear points on mode switch
    this.drone.status = mode === 'lidar' ? 'scanning' : 'cinema';
    this.cdr.detectChanges();
  }

  startSimulation() {
    const animate = (time: number) => {
      if (!this.lastTime) this.lastTime = time;
      const delta = time - this.lastTime;

      if (delta > 16) { // ~60fps cap
        this.updateDrone();
        this.lastTime = time;
        this.cdr.detectChanges();
      }
      
      this.animationFrameId = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  updateDrone() {
    // Update internal stats based on sliders
    this.drone.speed = this.targetSpeed;
    this.drone.altitude = this.targetAltitude;

    // Movement Logic
    // Map speed (5-25 m/s) to pixel movement (0.1 - 0.8)
    const moveSpeed = (this.drone.speed / 40); 
    
    this.drone.x += moveSpeed * this.direction;

    // Turn around at edges & Mode Switch Logic
    if (this.drone.x > 90) {
      if (this.direction === 1) {
        this.direction = -1;
        this.drone.x = 90;
      }
    } else if (this.drone.x < 10) {
      if (this.direction === -1) {
        this.direction = 1;
        this.drone.x = 10;
        // Completed full cycle (Left -> Right -> Left), switch mode
        if (Date.now() > this.modeLockedUntil) {
          this.setMode(this.mode === 'lidar' ? 'cinema' : 'lidar');
        }
      }
    }

    // Altitude Logic (Target Y calculation)
    // Altitude 10m (min) -> Y 60% (Low)
    // Altitude 100m (max) -> Y 10% (High)
    // Formula: Y = 60 - ((Alt - 10) / 90) * 50
    const targetY = 60 - ((this.drone.altitude - 10) / 90) * 50;
    
    // Smooth transition to target altitude
    const currentBaseY = this.drone.y - (Math.sin(Date.now() / 1000) * 2); // Remove bob to get base
    const newBaseY = currentBaseY + (targetY - currentBaseY) * 0.05;

    // Apply Bobbing effect
    this.drone.y = newBaseY + Math.sin(Date.now() / 1000) * 2;

    // LiDAR Scanning Logic
    if (this.mode === 'lidar') {
      // Generate points below drone if over "building" area
      // House is 40% width (30% to 70%)
      // Roof is full 40% width. Body is 90% of that (36% width -> 32% to 68%)
      
      const houseCenter = 50;
      const houseWidthHalf = 20; // 40% total width / 2
      const wallWidthHalf = 18;  // 36% total width / 2
      
      const distFromCenter = Math.abs(this.drone.x - houseCenter);
      
      if (distFromCenter < houseWidthHalf) {
        if (Math.random() > 0.5) {
          // Calculate Roof Height at this X
          // Roof Top at Y=50 (50% height of container). Roof Bottom at Y=70.
          // Slope: Y goes from 50 (at dist 0) to 70 (at dist 20).
          const roofY = 50 + (distFromCenter / houseWidthHalf) * 20;
          
          let pointY = roofY;
          
          // If inside wall area, chance to hit wall face
          if (distFromCenter < wallWidthHalf) {
             // We are over the body of the house
             // Hit Roof Surface OR Front Wall Face
             if (Math.random() > 0.5) {
                 // Hit Wall (Y between 70 and 100)
                 pointY = 70 + Math.random() * 30;
             } else {
                 // Hit Roof
                 pointY = roofY + (Math.random() * 2 - 1);
             }
          } else {
             // Overhang area (between 18 and 20)
             // Only hit roof
             pointY = roofY + (Math.random() * 2 - 1);
          }

          this.points.push({
            x: this.drone.x + (Math.random() - 0.5) * 1, // Tighter spread
            y: pointY, 
            opacity: 1
          });
        }
      }
    }

    // Fade out points slowly
    for (let i = this.points.length - 1; i >= 0; i--) {
      this.points[i].opacity -= 0.005;
      if (this.points[i].opacity <= 0) {
        this.points.splice(i, 1);
      }
    }
  }
}

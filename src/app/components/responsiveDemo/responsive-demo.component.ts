import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type DeviceType = 'phone' | 'tablet' | 'desktop';

@Component({
  selector: 'app-responsive-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="controls">
      <button 
        class="device-btn" 
        [class.active]="currentDevice === 'phone'"
        (click)="switchToDevice('phone')">
        Celular
      </button>
      <button 
        class="device-btn" 
        [class.active]="currentDevice === 'tablet'"
        (click)="switchToDevice('tablet')">
        Tablet
      </button>
      <button 
        class="device-btn" 
        [class.active]="currentDevice === 'desktop'"
        (click)="switchToDevice('desktop')">
        PC
      </button>
    </div>
    <div class="scale-wrapper" [style.height.px]="getScaledHeight()">
      <div class="animation-container" [style.transform]="'scale(' + scale + ') translateX(-50%)'">
        <div class="device-frame" [ngClass]="currentDevice">
          <div class="viewport">
            
            <div class="page-content" [ngClass]="'layout-' + currentDevice">
              <div class="header-section">
                <div class="menu-icon">
                  <span></span><span></span><span></span>
                </div>
              </div>
              
              <div class="content-grid">
                <div class="main-content">
                  <div class="top-blocks">
                    <div class="block"></div>
                    <div class="block"></div>
                  </div>
                  <div class="color-blocks">
                    <div class="block"></div>
                    <div class="block"></div>
                    <div class="block"></div>
                  </div>
                  <div class="text-section">
                    <p></p><p></p><p></p><p></p>
                  </div>
                </div>
                
                <div class="sidebar">
                  <div class="text-section">
                    <p></p><p></p>
                  </div>
                  <div class="text-section">
                    <p></p><p></p><p></p>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>

        <div class="monitor-stand" [class.visible]="currentDevice === 'desktop'">
          <div class="stand-neck"></div>
          <div class="stand-base"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 0;
      margin: 0;
      width: 100%;
      overflow: hidden;
    }

    .controls {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
      padding: 10px;
    }

    .device-btn {
      padding: 8px 16px;
      border: 2px solid #333;
      background-color: transparent;
      color: #333;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .device-btn:hover {
      background-color: #333;
      color: white;
    }

    .device-btn.active {
      background-color: #333;
      color: white;
    }

    .scale-wrapper {
      /* This wrapper will collapse to the scaled size */
      display: block;
      transform-origin: top center;
      position: relative;
      width: 100%;
      /* Height is set dynamically via binding */
      overflow: hidden;
    }

    .animation-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* Scale from the top-center */
      transform-origin: top center;
      /* Scale is handled via inline style from @Input */
      /* Prevent the container from taking layout space */
      width: 100%;
      position: absolute;
      top: 0;
      left: 50%;
    }

    /* --- DEVICE FRAME --- */
    .device-frame {
      background-color: #333;
      border-radius: 30px;
      padding: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
      transition: all 0.8s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      z-index: 2;
    }

    /* Camera/Notch */
    .device-frame::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 10px;
      background-color: #444;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      z-index: 2;
      transition: opacity 0.3s ease-out;
      opacity: 1;
    }

    /* Home Button */
    .device-frame::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 40px;
      border: 2px solid #555;
      border-radius: 50%;
      z-index: 2;
      background-color: #333;
      transition: opacity 0.3s ease-out;
      opacity: 1;
    }

    /* --- PHONE STATE --- */
    .device-frame.phone {
      width: 320px;
      height: 570px;
      border-radius: 30px;
      padding: 15px;
    }
    .device-frame.phone .viewport {
      width: 290px;
      height: 510px;
    }
    .device-frame.phone::after {
      width: 30px;
      height: 30px;
      bottom: 5px;
      border-width: 1px;
    }

    /* --- TABLET STATE --- */
    .device-frame.tablet {
      width: 600px;
      height: 800px;
      border-radius: 20px;
      padding: 10px;
    }
    .device-frame.tablet .viewport {
      width: 580px;
      height: 780px;
    }
    .device-frame.tablet::before,
    .device-frame.tablet::after {
      opacity: 0;
    }

    /* --- DESKTOP STATE --- */
    .device-frame.desktop {
      width: 900px;
      height: 600px;
      border-radius: 10px;
      padding: 5px;
      background-color: #222;
    }
    .device-frame.desktop .viewport {
      width: 890px;
      height: 590px;
    }
    .device-frame.desktop::before,
    .device-frame.desktop::after {
      opacity: 0;
    }

    /* --- VIEWPORT --- */
    .viewport {
      background-color: white;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      position: relative;
      flex-shrink: 0;
      z-index: 1;
      transition: all 0.8s ease-in-out;
    }

    /* --- MONITOR STAND --- */
    .monitor-stand {
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: column;
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.5s ease-in-out 0.3s;
      z-index: 1;
    }
    .monitor-stand.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .monitor-stand .stand-neck {
      width: 60px;
      height: 40px;
      background-color: #333;
      margin-top: -5px;
      z-index: 0;
    }
    .monitor-stand .stand-base {
      width: 250px;
      height: 15px;
      background-color: #444;
      border-radius: 5px 5px 0 0;
      box-shadow: 0 -3px 10px rgba(0,0,0,0.2);
    }

    /* --- PAGE CONTENT STYLING --- */
    .page-content {
      background-color: #ffeb3b;
      padding: 15px;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .header-section {
      background-color: #9b59b6;
      height: 20px;
      border-radius: 3px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 5px;
    }
    .header-section .menu-icon {
      width: 15px;
      height: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .header-section .menu-icon span {
      display: block;
      height: 2px;
      background-color: white;
      border-radius: 1px;
    }

    .top-blocks, .color-blocks {
      display: flex;
      gap: 10px;
      flex-direction: column;
    }
    .block { border-radius: 3px; }
    .top-blocks .block { background-color: #2ecc71; height: 60px; }
    .color-blocks .block { height: 80px; }
    .color-blocks .block:nth-child(1) { background-color: #e74c3c; }
    .color-blocks .block:nth-child(2) { background-color: #f39c12; }
    .color-blocks .block:nth-child(3) { background-color: #3498db; }

    .text-section {
      background-color: white;
      padding: 10px;
      border-radius: 3px;
    }
    .text-section p {
      margin-bottom: 5px;
      background-color: #ecf0f1;
      height: 10px;
      border-radius: 2px;
      width: 100%;
    }
    .text-section p:nth-child(even) { width: 95%; }
    .text-section p:nth-child(odd) { width: 90%; }

    /* --- LAYOUT LOGIC --- */
    
    /* Phone Layout */
    .page-content.layout-phone {
      padding: 15px;
      flex-direction: column;
    }
    .page-content.layout-phone .content-grid,
    .page-content.layout-phone .top-blocks,
    .page-content.layout-phone .color-blocks,
    .page-content.layout-phone .sidebar {
       display: flex; flex-direction: column; gap: 15px;
    }

    /* Tablet Layout */
    .page-content.layout-tablet {
      padding: 20px;
    }
    .page-content.layout-tablet .top-blocks,
    .page-content.layout-tablet .color-blocks {
      flex-direction: row;
    }
    .page-content.layout-tablet .block { flex: 1; }
    .page-content.layout-tablet .content-grid,
    .page-content.layout-tablet .sidebar {
       display: flex; flex-direction: column; gap: 20px;
    }

    /* Desktop Layout */
    .page-content.layout-desktop {
      padding: 25px;
    }
    .page-content.layout-desktop .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }
    .page-content.layout-desktop .main-content,
    .page-content.layout-desktop .sidebar {
      display: flex; flex-direction: column; gap: 20px;
    }
    .page-content.layout-desktop .header-section {
      padding-right: 15px;
      height: 30px;
    }
    .page-content.layout-desktop .header-section .menu-icon {
      width: 25px;
      height: 15px;
    }
    .page-content.layout-desktop .text-section p {
      height: 12px;
    }
  `]
})
export class ResponsiveDemoComponent implements OnInit, OnDestroy {
  // Use a smaller default scale now
  @Input() scale: number = 0.3; 
  @Input() intervalSpeed: number = 3000;

  currentDevice: DeviceType = 'phone';
  private deviceOrder: DeviceType[] = ['phone', 'tablet', 'desktop'];
  private currentIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAnimation();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getScaledHeight(): number {
    // Calculate the actual height based on current device and scale
    let baseHeight = 0;
    
    switch (this.currentDevice) {
      case 'phone':
        baseHeight = 570; // phone height
        break;
      case 'tablet':
        baseHeight = 800; // tablet height
        break;
      case 'desktop':
        baseHeight = 600 + 55; // desktop height + monitor stand
        break;
    }
    
    const calculatedHeight = baseHeight * this.scale;
    return Math.max(280, calculatedHeight);
  }

  private startAnimation() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.deviceOrder.length;
      this.currentDevice = this.deviceOrder[this.currentIndex];
    }, this.intervalSpeed);
  }

  switchToDevice(device: DeviceType): void {
    this.currentDevice = device;
    this.currentIndex = this.deviceOrder.indexOf(device);
  }
}
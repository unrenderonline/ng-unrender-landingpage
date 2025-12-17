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
      <div class="animation-container" [style.transform]="'translateX(-50%) scale(' + scale + ')'">
        <div class="device-frame" [ngClass]="currentDevice">
          <div class="viewport">
            
            <!-- Page Content with Tailwind Classes -->
            <!-- Using arbitrary variants [.layout-device_&] to style based on parent class -->
            <div class="page-content bg-yellow-400 p-4 min-h-full h-full flex flex-col gap-4 w-full box-border 
                        [.layout-tablet_&]:p-5 
                        [.layout-desktop_&]:p-6" 
                 [ngClass]="'layout-' + currentDevice">
              
              <!-- Header -->
              <div class="header-section bg-purple-600 h-5 rounded flex justify-end items-center pr-1 
                          [.layout-desktop_&]:pr-4 [.layout-desktop_&]:h-8">
                <div class="menu-icon w-4 h-2.5 flex flex-col justify-around 
                            [.layout-desktop_&]:w-6 [.layout-desktop_&]:h-4">
                  <span class="block h-0.5 bg-white rounded-sm"></span>
                  <span class="block h-0.5 bg-white rounded-sm"></span>
                  <span class="block h-0.5 bg-white rounded-sm"></span>
                </div>
              </div>
              
              <!-- Content Grid -->
              <div class="content-grid flex flex-col gap-4 w-full 
                          [.layout-tablet_&]:gap-5 
                          [.layout-desktop_&]:grid [.layout-desktop_&]:grid-cols-[2fr_1fr] [.layout-desktop_&]:gap-5">
                
                <!-- Main Content -->
                <div class="main-content flex flex-col gap-4 
                            [.layout-tablet_&]:gap-5 
                            [.layout-desktop_&]:gap-5">
                  
                  <!-- Top Blocks -->
                  <div class="top-blocks flex flex-col gap-2.5 
                              [.layout-tablet_&]:flex-row">
                    <div class="block bg-green-500 h-[60px] rounded 
                                [.layout-tablet_&]:flex-1"></div>
                    <div class="block bg-green-500 h-[60px] rounded 
                                [.layout-tablet_&]:flex-1"></div>
                  </div>
                  
                  <!-- Color Blocks -->
                  <div class="color-blocks flex flex-col gap-2.5 
                              [.layout-tablet_&]:flex-row">
                    <div class="block bg-red-500 h-20 rounded 
                                [.layout-tablet_&]:flex-1"></div>
                    <div class="block bg-orange-400 h-20 rounded 
                                [.layout-tablet_&]:flex-1"></div>
                    <div class="block bg-blue-500 h-20 rounded 
                                [.layout-tablet_&]:flex-1"></div>
                  </div>
                  
                  <!-- Text Section -->
                  <div class="text-section bg-white p-2.5 rounded">
                    <p class="mb-1.5 bg-gray-200 h-2.5 rounded-sm w-full [.layout-desktop_&]:h-3"></p>
                    <p class="mb-1.5 bg-gray-200 h-2.5 rounded-sm w-[95%] [.layout-desktop_&]:h-3"></p>
                    <p class="mb-1.5 bg-gray-200 h-2.5 rounded-sm w-[90%] [.layout-desktop_&]:h-3"></p>
                    <p class="mb-1.5 bg-gray-200 h-2.5 rounded-sm w-full [.layout-desktop_&]:h-3"></p>
                  </div>
                </div>
                
                <!-- Sidebar -->
                <div class="sidebar flex flex-col gap-4 
                            [.layout-tablet_&]:gap-5 
                            [.layout-desktop_&]:gap-5">
                  <div class="text-section bg-white p-2.5 rounded">
                    <p class="mb-1.5 bg-gray-200 h-2.5 rounded-sm w-full [.layout-desktop_&]:h-3"></p>
                    <p class="mb-1.5 bg-gray-200 h-2.5 rounded-sm w-[95%] [.layout-desktop_&]:h-3"></p>
                  </div>
                  <div class="text-section bg-white p-2.5 rounded">
                    <p class="mb-1.5 bg-gray-200 h-2.5 rounded-sm w-[90%] [.layout-desktop_&]:h-3"></p>
                    <p class="mb-1.5 bg-gray-200 h-2.5 rounded-sm w-full [.layout-desktop_&]:h-3"></p>
                    <p class="mb-1.5 bg-gray-200 h-2.5 rounded-sm w-[95%] [.layout-desktop_&]:h-3"></p>
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
    
    * {
      box-sizing: border-box;
    }

    .page-content {
   min-width: 100%!important;
      width: 100%!important;
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
      border: 2px solid #10051c;
      background-color: transparent;
      color: #10051c;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .device-btn:hover {
      background-color: #10051c;
      color: white;
    }

    .device-btn.active {
      background-color: #f99126;
      color: white;
      border-color: #f99126;
    }

    .scale-wrapper {
      /* This wrapper will collapse to the scaled size */
      display: block;
      transform-origin: top center;
      position: relative;
      width: 100%;
      /* Height is set dynamically via binding */
      overflow: visible;
      transition: height 0.5s ease-in-out;
    }

  .animation-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* Scale from the top-center */
      transform-origin: top center;
      /* Scale is handled via inline style from @Input */
      /* Prevent the container from taking layout space */
      position: absolute;
      top: 0;
      left: 50%;
  /* ensure container takes available width so children fill the device frame */
  width: 100%;
      max-width: none;
    }

    /* --- DEVICE FRAME --- */
    .device-frame {
      background-color: #10051c;
      border-radius: 30px;
      padding: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
      transition: all 0.5s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      z-index: 2;
      max-width: none;
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
      background-color: #f99126;
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
      border: 2px solid #f99126;
      border-radius: 50%;
      z-index: 2;
      background-color: #10051c;
      transition: opacity 0.3s ease-out;
      opacity: 1;
    }

    /* --- PHONE STATE --- */
    .device-frame.phone {
      width: 320px;
      height: 570px;
      border-radius: 30px;
      padding: 15px 15px 45px 15px; /* Increased bottom padding for home button area */
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
      background-color: #10051c;
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
      transition: all 0.5s ease-in-out;
      min-width: 100%!important;
      width: 100%!important;
      height: 100%;
    }    /* Ensure every child inside viewport and page-content expands to the full width
       when the device layout changes. This forces the Tailwind variants that toggle
       parent classes to still allow content to occupy the full device width. */
    .viewport > *,
    .page-content > *,
    .viewport *,
    .page-content * {
      min-width: 100% !important;
      width: 100% !important;
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
      background-color: #10051c;
      margin-top: -5px;
      z-index: 0;
    }
    .monitor-stand .stand-base {
      width: 250px;
      height: 15px;
      background-color: #f99126;
      border-radius: 5px 5px 0 0;
      box-shadow: 0 -3px 10px rgba(0,0,0,0.2);
    }
  `]
})
export class ResponsiveDemoComponent implements OnInit, OnDestroy {
  // Use a smaller default scale now
  @Input() scale: number = 0.3;
  @Input() intervalSpeed: number = 5000;

  currentDevice: DeviceType = 'phone';
  private deviceOrder: DeviceType[] = ['phone', 'tablet', 'desktop'];
  private currentIndex = 0;
  private intervalId: any;
  private timeoutId: any;
  private manualSwitchDelay: number = 5000; // 5 seconds delay after manual switch

  ngOnInit(): void {
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  private clearTimers() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
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

  private startAnimation(delay: number = 0) {
    this.clearTimers();

    if (delay > 0) {
      this.timeoutId = setTimeout(() => {
        this.startInterval();
      }, delay);
    } else {
      this.startInterval();
    }
  }

  private startInterval() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.deviceOrder.length;
      this.currentDevice = this.deviceOrder[this.currentIndex];
    }, this.intervalSpeed);
  }

  switchToDevice(device: DeviceType): void {
    this.currentDevice = device;
    this.currentIndex = this.deviceOrder.indexOf(device);
    // Add 5 seconds delay before resuming autoplay
    this.startAnimation(this.manualSwitchDelay);
  }
}
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBarcode, faBoxOpen, faShoppingCart, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="w-full h-full bg-white rounded-2xl overflow-hidden flex flex-col relative font-sans cursor-none" 
         (mousemove)="onMouseMove($event)"
         (touchmove)="onTouchMove($event)"
         (touchstart)="onTouchMove($event)">
      
      <!-- Header -->
      <div class="bg-white p-4 shadow-sm z-20 flex justify-between items-center border-b border-slate-100">
        <div class="flex items-center gap-2 text-slate-800">
          <fa-icon [icon]="faBarcode" class="text-unrender-purple"></fa-icon>
          <span class="font-bold">Barcode Scanner Demo</span>
        </div>
        <div class="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
          Use o mouse para controlar o scanner
        </div>
      </div>

      <!-- Main Area -->
      <div class="flex-1 flex items-center justify-center relative bg-slate-50 overflow-hidden">
        
        <!-- Product Box -->
        <div class="bg-white p-8 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105 relative z-10 w-64 text-center group border border-slate-100">
          <div class="text-6xl text-indigo-100 mb-4 group-hover:text-unrender-purple transition-colors">
            <fa-icon [icon]="faBoxOpen"></fa-icon>
          </div>
          <h3 class="font-bold text-slate-800 mb-1">Produto Exemplo</h3>
          <p class="text-xs text-slate-500 mb-6">SKU: 9823-1239-AX</p>
          
          <!-- Barcode Target -->
          <div #barcodeTarget class="bg-white border-2 border-slate-900 p-2 inline-block cursor-crosshair relative overflow-hidden">
            <div class="flex gap-0.5 h-16 items-end justify-center opacity-80">
               <div *ngFor="let bar of bars" [style.width.px]="bar.width" [style.height.%]="bar.height" class="bg-black"></div>
            </div>
            <div class="text-[10px] font-mono tracking-[0.3em] mt-1 font-bold">123456789012</div>
          </div>
        </div>

        <!-- Handheld Scanner Visual (Follows Mouse) -->
        <div class="absolute pointer-events-none z-40"
             [style.left.px]="mouseX"
             [style.top.px]="mouseY - (isTouch ? 80 : 30)"
             style="transform: translate(-50%, -100%);">
             
             <!-- Scanner Body -->
             <div class="relative">
                <!-- Handle -->
                <div class="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-24 bg-slate-800 rounded-b-lg shadow-xl border-r-2 border-slate-700"></div>
                <!-- Head -->
                <div class="relative w-24 h-16 bg-slate-800 rounded-lg shadow-2xl flex items-center justify-center border-t border-slate-700">
                    <!-- Trigger -->
                    <div class="absolute bottom-[-5px] left-8 w-4 h-6 bg-slate-900 rounded-sm"></div>
                    <!-- Top Detail -->
                    <div class="absolute top-0 w-16 h-1 bg-slate-700 rounded-full"></div>
                    <!-- Front Lens -->
                    <div class="absolute bottom-0 w-20 h-2 bg-red-900 rounded-full opacity-50"></div>
                </div>
                <!-- Laser Beam -->
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-0.5 h-16 bg-gradient-to-t from-red-600 to-transparent opacity-50 blur-sm"></div>
                <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-red-600 shadow-[0_0_15px_rgba(255,0,0,1)]"
                     [style.opacity]="isScanning ? 1 : 0"></div>
             </div>
        </div>
        
        <!-- Scan Effect Overlay -->
        <div *ngIf="lastScanSuccess" class="absolute inset-0 bg-green-500/20 z-20 pointer-events-none animate-flash"></div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes flash {
      0% { opacity: 0.5; }
      100% { opacity: 0; }
    }
    .animate-flash {
      animation: flash 0.5s ease-out forwards;
    }
  `]
})
export class BarcodeScannerComponent {
  faBarcode = faBarcode;
  faBoxOpen = faBoxOpen;

  @ViewChild('barcodeTarget') barcodeTarget!: ElementRef;

  mouseY = 0;
  mouseX = 0;
  isScanning = false;
  isTouch = false;
  lastScanSuccess = false;
  scanCooldown = false;

  // Generate random bars for visual
  bars = Array(30).fill(0).map(() => ({
    width: Math.random() > 0.5 ? 2 : 4,
    height: 80 + Math.random() * 20
  }));

  onTouchMove(event: TouchEvent) {
    event.preventDefault();
    this.isTouch = true;
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      this.updatePosition(touch.clientX, touch.clientY, rect);
    }
  }

  onMouseMove(event: MouseEvent) {
    this.isTouch = false;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.updatePosition(event.clientX, event.clientY, rect);
  }

  updatePosition(clientX: number, clientY: number, rect: DOMRect) {
    this.mouseY = clientY - rect.top;
    this.mouseX = clientX - rect.left;

    // Check if mouse is over barcode
    if (this.barcodeTarget && !this.scanCooldown) {
      const barcodeRect = this.barcodeTarget.nativeElement.getBoundingClientRect();
      const relativeTop = barcodeRect.top - rect.top;
      const relativeBottom = barcodeRect.bottom - rect.top;
      const relativeLeft = barcodeRect.left - rect.left;
      const relativeRight = barcodeRect.right - rect.left;

      // Calculate laser position with offset
      // Mouse: 30px up. Touch: 80px up.
      const offset = this.isTouch ? 80 : 30;

      // Visual Alignment:
      // Container is bottom-aligned to (mouseY - offset) using translate(-50%, -100%)
      // Scanner Head is h-16 (64px)
      // Laser is at -top-1 (-1px relative to Head)
      // So Laser Y = (mouseY - offset) - 64 - 1 = mouseY - offset - 65
      const laserY = this.mouseY - offset - 65;

      // Check if laser crosses the barcode area horizontally
      const isOverVertically = laserY >= relativeTop && laserY <= relativeBottom;
      const isOverHorizontally = this.mouseX >= relativeLeft && this.mouseX <= relativeRight;

      this.isScanning = true;

      if (isOverVertically && isOverHorizontally) {
        this.triggerScan();
      }
    } else {
      this.isScanning = true;
    }
  }

  triggerScan() {
    this.scanCooldown = true;
    this.lastScanSuccess = true;
    this.playBeep();

    setTimeout(() => {
      this.lastScanSuccess = false;
    }, 500);

    setTimeout(() => {
      this.scanCooldown = false;
    }, 1500); // Cooldown before next scan
  }

  playBeep() {
    // Simple oscillator beep
    try {
      const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'square';
        osc.frequency.value = 1500;
        gain.gain.value = 0.1;

        osc.start();
        setTimeout(() => osc.stop(), 100);
      }
    } catch (e) {
      console.error('Audio not supported');
    }
  }
}

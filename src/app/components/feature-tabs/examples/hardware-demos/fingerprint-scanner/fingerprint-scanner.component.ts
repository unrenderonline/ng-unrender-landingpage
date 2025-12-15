import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFingerprint, faLock, faLockOpen, faShieldAlt, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fingerprint-scanner',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="w-full h-full bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 relative font-sans select-none border border-slate-200">
      
      <!-- Background Grid -->
      <div class="absolute inset-0 opacity-30" 
           style="background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 20px 20px;">
      </div>

      <!-- Status Header -->
      <div class="absolute top-6 w-full px-6 flex justify-between items-center z-10">
        <div class="flex items-center gap-2 text-slate-500">
          <fa-icon [icon]="faShieldAlt"></fa-icon>
          <span class="text-xs font-bold tracking-widest uppercase">Secure Access V2.0</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full" [ngClass]="status === 'success' ? 'bg-green-500' : (status === 'scanning' ? 'bg-unrender-purple animate-pulse' : 'bg-red-500')"></div>
          <span class="text-xs font-mono" [ngClass]="status === 'success' ? 'text-green-600' : (status === 'scanning' ? 'text-unrender-purple' : 'text-slate-400')">
            {{ statusText }}
          </span>
        </div>
      </div>

      <!-- Scanner Area -->
      <div class="relative group cursor-pointer" (mousedown)="startScan()" (touchstart)="startScan()" (mouseup)="cancelScan()" (mouseleave)="cancelScan()" (touchend)="cancelScan()">
        
        <!-- Scanner Ring -->
        <div class="w-48 h-48 rounded-full border-4 border-slate-200 flex items-center justify-center relative overflow-hidden transition-all duration-300 bg-white"
             [ngClass]="{'border-unrender-purple shadow-[0_0_30px_rgba(16,5,28,0.2)]': status === 'scanning', 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]': status === 'success', 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]': status === 'error'}">
          
          <!-- Fingerprint Icon -->
          <fa-icon [icon]="faFingerprint" class="text-8xl transition-all duration-300"
                   [ngClass]="{'text-slate-300': status === 'idle', 'text-unrender-purple opacity-80': status === 'scanning', 'text-green-500': status === 'success', 'text-red-500': status === 'error'}">
          </fa-icon>

          <!-- Scanning Beam -->
          <div class="absolute w-full h-2 bg-unrender-purple shadow-[0_0_15px_rgba(16,5,28,0.5)] opacity-0 top-0 left-0"
               [class.animate-scan]="status === 'scanning'">
          </div>

          <!-- Ripple Effect -->
          <div *ngIf="status === 'scanning'" class="absolute inset-0 rounded-full border-2 border-unrender-purple animate-ping opacity-20"></div>
        </div>

        <!-- Instruction Text -->
        <div class="absolute -bottom-12 w-full text-center transition-opacity duration-300" [class.opacity-0]="status !== 'idle'">
          <span class="text-slate-400 text-sm font-medium animate-pulse">Segure para escanear</span>
        </div>

      </div>

      <!-- Result Message -->
      <div class="absolute bottom-10 flex flex-col items-center transition-all duration-500 transform"
           [ngClass]="status === 'success' || status === 'error' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
        <div class="text-4xl mb-2">
          <fa-icon [icon]="status === 'success' ? faLockOpen : faLock" 
                   [ngClass]="status === 'success' ? 'text-yellow-500' : 'text-red-400'">
          </fa-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-1">{{ status === 'success' ? 'Acesso Permitido' : 'Falha na Leitura' }}</h3>
        <p class="text-slate-400 text-xs">{{ status === 'success' ? 'Identidade confirmada com sucesso.' : 'Tente novamente.' }}</p>
      </div>

    </div>
  `,
  styles: [`
    @keyframes scan {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    .animate-scan {
      animation: scan 1.5s linear infinite;
    }
  `]
})
export class FingerprintScannerComponent {
  faFingerprint = faFingerprint;
  faLock = faLock;
  faLockOpen = faLockOpen;
  faShieldAlt = faShieldAlt;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  status: 'idle' | 'scanning' | 'success' | 'error' = 'idle';
  statusText = 'AGUARDANDO...';
  scanTimeout: any;

  startScan() {
    if (this.status === 'success') {
      this.reset();
      return;
    }

    this.status = 'scanning';
    this.statusText = 'ESCANEANDO...';

    this.scanTimeout = setTimeout(() => {
      // Simulate random success/fail (mostly success for demo)
      const success = Math.random() > 0.2;
      this.completeScan(success);
    }, 2000);
  }

  cancelScan() {
    if (this.status === 'scanning') {
      clearTimeout(this.scanTimeout);
      this.status = 'idle';
      this.statusText = 'CANCELADO';
      setTimeout(() => {
        if (this.status === 'idle') this.statusText = 'AGUARDANDO...';
      }, 1000);
    }
  }

  completeScan(success: boolean) {
    this.status = success ? 'success' : 'error';
    this.statusText = success ? 'IDENTIFICADO' : 'ERRO DE LEITURA';

    if (!success) {
      setTimeout(() => this.reset(), 2000);
    }
  }

  reset() {
    this.status = 'idle';
    this.statusText = 'AGUARDANDO...';
  }
}

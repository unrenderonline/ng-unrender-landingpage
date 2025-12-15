import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Example component that can be used as a customComponent in feature tabs
 * This demonstrates the responsive design devices
 */
@Component({
  selector: 'app-responsive-devices-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-4 items-center justify-center p-8">
      <div 
        class="device device-mobile"
        [style.width.px]="mobileWidth"
        [style.height.px]="mobileHeight"
        [style.background]="mobileGradient"
        [style.border-radius.rem]="borderRadius"
        [style.box-shadow]="boxShadow">
      </div>
      <div 
        class="device device-tablet"
        [style.width.px]="tabletWidth"
        [style.height.px]="tabletHeight"
        [style.background]="tabletGradient"
        [style.border-radius.rem]="borderRadius"
        [style.box-shadow]="boxShadow">
      </div>
      <div 
        class="device device-desktop"
        [style.width.px]="desktopWidth"
        [style.height.px]="desktopHeight"
        [style.background]="desktopGradient"
        [style.border-radius.rem]="borderRadius"
        [style.box-shadow]="boxShadow">
      </div>
    </div>
  `,
  styles: [`
    .device {
      transition: all 0.3s ease;
    }
    .device:hover {
      transform: scale(1.05);
    }
  `]
})
export class ResponsiveDevicesExampleComponent {
  // Inputs that can be customized when using this component
  @Input() mobileWidth: number = 60;
  @Input() mobileHeight: number = 100;
  @Input() tabletWidth: number = 120;
  @Input() tabletHeight: number = 80;
  @Input() desktopWidth: number = 180;
  @Input() desktopHeight: number = 120;
  
  @Input() mobileGradient: string = 'linear-gradient(135deg, #10051c 0%, #6366f1 100%)';
  @Input() tabletGradient: string = 'linear-gradient(135deg, #f5a623 0%, #fbbf24 100%)';
  @Input() desktopGradient: string = 'linear-gradient(135deg, #10051c 0%, #f5a623 100%)';
  
  @Input() borderRadius: number = 0.5;
  @Input() boxShadow: string = '0 4px 6px rgba(0,0,0,0.1)';
}

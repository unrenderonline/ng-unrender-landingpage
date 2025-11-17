import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Example component for buyer-seller intermediation visualization
 * Can be used as a customComponent in feature tabs
 */
@Component({
  selector: 'app-buyer-seller-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-around p-8">
      <div class="text-center">
        <div 
          class="w-20 h-20 rounded-full mx-auto mb-2 shadow-lg transition-transform hover:scale-110"
          [style.background]="buyerGradient">
        </div>
        <div class="font-bold" [style.color]="buyerColor">{{ buyerLabel }}</div>
      </div>
      
      <div class="text-4xl" [style.color]="arrowColor">{{ arrow }}</div>
      
      <div class="text-center">
        <div 
          class="w-20 h-20 rounded-full mx-auto mb-2 shadow-lg transition-transform hover:scale-110"
          [style.background]="sellerGradient">
        </div>
        <div class="font-bold" [style.color]="sellerColor">{{ sellerLabel }}</div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BuyerSellerExampleComponent {
  @Input() buyerLabel: string = 'Comprador';
  @Input() sellerLabel: string = 'Vendedor';
  @Input() arrow: string = '⟷';
  
  @Input() buyerGradient: string = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  @Input() sellerGradient: string = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
  
  @Input() buyerColor: string = '#667eea';
  @Input() sellerColor: string = '#f5576c';
  @Input() arrowColor: string = '#f97316';
}

import { Component, Input, OnInit, OnChanges, SimpleChanges, Type, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-lazy-renderer',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet],
  template: `
    <div *ngIf="isLoading" class="lazy-loading-spinner">
      <div class="spinner"></div>
    </div>
    <div *ngIf="error" class="error-message">
      <p>Erro ao carregar componente.</p>
      <p class="text-xs text-red-500">{{ error }}</p>
    </div>
    <ng-container *ngIf="component" [ngComponentOutlet]="component" [ngComponentOutletInputs]="inputs"></ng-container>
  `,
  styles: [`
    .lazy-loading-spinner, .error-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      min-height: 200px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 1rem;
    }
    .error-message {
      color: red;
      border: 1px solid red;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(107, 33, 168, 0.1);
      border-top: 4px solid #6b21a8;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LazyRendererComponent implements OnInit, OnChanges {
  @Input() loader!: () => Promise<Type<any>>;
  @Input() inputs: Record<string, any> = {};
  
  component: Type<any> | null = null;
  error: string | null = null;
  isLoading = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loader'] && !changes['loader'].firstChange) {
      this.loadComponent();
    }
  }

  async loadComponent() {
    this.isLoading = true;
    this.error = null;
    this.component = null;
    this.cdr.markForCheck();
    
    if (this.loader) {
      try {
        const moduleOrComponent = await this.loader();
        
        if (!moduleOrComponent) {
            throw new Error('Componente não encontrado (exportação nula ou indefinida).');
        }

        // Handle both default export (module) and direct component export
        if ((moduleOrComponent as any).default) {
            this.component = (moduleOrComponent as any).default;
        } else {
            this.component = moduleOrComponent;
        }
      } catch (error: any) {
        console.error('Error loading lazy component:', error);
        this.error = error.message || 'Erro desconhecido';
      } finally {
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    } else {
        this.isLoading = false;
        this.error = "Loader function not provided";
        this.cdr.markForCheck();
    }
  }
}

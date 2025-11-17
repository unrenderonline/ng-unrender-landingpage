/**
 * Example: How to convert existing customHtml features to use Angular components
 * 
 * This file shows before/after comparisons for better code organization
 */

import { ResponsiveDevicesExampleComponent } from './responsive-devices-example';
import { BuyerSellerExampleComponent } from './buyer-seller-example';

// ============================================
// BEFORE: Using customHtml (still supported!)
// ============================================

const beforeExample = {
  name: 'Responsive Design',
  customHtml: `
    <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; padding: 2rem;">
      <div style="width: 60px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
      <div style="width: 120px; height: 80px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
      <div style="width: 180px; height: 120px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
    </div>
  `
};

// ============================================
// AFTER: Using customComponent (recommended for complex features)
// ============================================

const afterExample = {
  name: 'Responsive Design',
  customComponent: ResponsiveDevicesExampleComponent,
  customComponentInputs: {
    mobileWidth: 60,
    mobileHeight: 100,
    tabletWidth: 120,
    tabletHeight: 80,
    desktopWidth: 180,
    desktopHeight: 120,
    mobileGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tabletGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    desktopGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    borderRadius: 0.5,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }
};

// ============================================
// BENEFITS OF COMPONENT APPROACH:
// ============================================

/**
 * 1. TYPE SAFETY
 *    - Inputs are typed and validated by TypeScript
 *    - IDE autocomplete and intellisense
 *    - Compile-time error checking
 * 
 * 2. REUSABILITY
 *    - Create the component once, use it multiple times with different configs
 *    - Share components across different menu items
 *    
 *    Example:
 */
const reusableExamples = [
  {
    name: 'Small Devices',
    customComponent: ResponsiveDevicesExampleComponent,
    customComponentInputs: {
      mobileWidth: 40,
      tabletWidth: 80,
      desktopWidth: 120
    }
  },
  {
    name: 'Large Devices',
    customComponent: ResponsiveDevicesExampleComponent,
    customComponentInputs: {
      mobileWidth: 80,
      tabletWidth: 160,
      desktopWidth: 240
    }
  }
];

/**
 * 3. TESTABILITY
 *    - Components can be unit tested
 *    - Isolate logic from presentation
 *    - Mock inputs easily
 * 
 * 4. MAINTAINABILITY
 *    - Changes in one place affect all usages
 *    - Clear separation of concerns
 *    - Easier to refactor
 * 
 * 5. ACCESS TO ANGULAR FEATURES
 *    - Use services (e.g., for API calls)
 *    - Lifecycle hooks (ngOnInit, ngOnDestroy)
 *    - Change detection
 *    - Event emitters for interactions
 */

// ============================================
// EXAMPLE: Interactive Component
// ============================================

/**
 * You can create interactive components that respond to user actions
 * 
 * import { Component, Input, Output, EventEmitter } from '@angular/core';
 * 
 * @Component({
 *   selector: 'app-interactive-demo',
 *   standalone: true,
 *   template: `
 *     <button (click)="onButtonClick()">
 *       Clicked {{ count }} times
 *     </button>
 *   `
 * })
 * export class InteractiveDemoComponent {
 *   @Input() initialCount: number = 0;
 *   @Output() clicked = new EventEmitter<number>();
 *   count = 0;
 * 
 *   ngOnInit() {
 *     this.count = this.initialCount;
 *   }
 * 
 *   onButtonClick() {
 *     this.count++;
 *     this.clicked.emit(this.count);
 *   }
 * }
 */

// Usage:
const interactiveExample = {
  name: 'Interactive Feature',
  // customComponent: InteractiveDemoComponent,
  customComponentInputs: {
    initialCount: 0
  }
};

// ============================================
// WHEN TO USE EACH APPROACH:
// ============================================

/**
 * USE customHtml WHEN:
 * - Simple, static HTML
 * - One-time use case
 * - No need for logic or interactivity
 * - Quick prototyping
 * 
 * USE customComponent WHEN:
 * - Need type safety and validation
 * - Reusable across multiple features
 * - Complex logic or interactions
 * - Need to inject services
 * - Want to write unit tests
 * - Long-term maintainability is important
 */

export {
  beforeExample,
  afterExample,
  reusableExamples,
  interactiveExample
};

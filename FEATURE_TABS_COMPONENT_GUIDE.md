# Feature Tabs Component Usage Guide

## Overview
The Feature Tabs component now supports both **pure HTML strings** and **Angular components** for custom content, giving you better code organization and reusability.

## Feature Interface

```typescript
interface Feature {
  name: string;
  imageUrl?: string;              // Square image
  gifUrl?: string;                // Widescreen GIF
  customHtml?: string;            // Custom HTML content (pure HTML string)
  customComponent?: Type<any>;    // Custom Angular component
  customComponentInputs?: Record<string, any>; // Inputs to pass to the component
}
```

## Usage Options

### 1. Image Feature (Square Image)
```typescript
{ 
  name: 'Progressive Web Apps (PWA)', 
  imageUrl: '/kardapio-png.png' 
}
```

### 2. GIF Feature (Widescreen GIF)
```typescript
{ 
  name: 'Computer Vision',
  gifUrl: '/opencv.gif'
}
```

### 3. Custom HTML (Pure HTML String)
```typescript
{ 
  name: 'Responsive Design',
  customHtml: `
    <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; padding: 2rem;">
      <div style="width: 60px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 0.5rem;"></div>
      <div style="width: 120px; height: 80px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 0.5rem;"></div>
    </div>
  `
}
```

### 4. **NEW: Custom Angular Component** ✨

#### Step 1: Create your component

```typescript
// src/app/components/feature-tabs/examples/my-feature.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-feature',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  `
})
export class MyFeatureComponent {
  @Input() title: string = 'Default Title';
  @Input() description: string = 'Default description';
}
```

#### Step 2: Import in feature-tabs.ts

```typescript
import { MyFeatureComponent } from './examples/my-feature';
```

#### Step 3: Use in your menu items

```typescript
{
  name: 'My Custom Feature',
  customComponent: MyFeatureComponent,
  customComponentInputs: {
    title: 'Custom Title',
    description: 'Custom description text'
  }
}
```

## Complete Example

```typescript
import { ResponsiveDevicesExampleComponent } from './examples/responsive-devices-example';

developmentMenuItems: MenuItem[] = [
  {
    id: 'web-mobile',
    title: 'Landing Pages',
    subtitle: 'ÚNICAS! COMO O SEU NEGÓCIO!',
    description: 'Criamos experiências únicas...',
    features: [
      { 
        name: 'Aplicativos Mobile', 
        imageUrl: '/apolo-png.png' 
      },
      { 
        name: 'Computer Vision',
        gifUrl: '/opencv.gif'
      },
      { 
        name: 'Responsive Design - HTML Version',
        customHtml: `<div style="padding: 2rem;">Custom HTML content here</div>`
      },
      { 
        name: 'Responsive Design - Component Version',
        customComponent: ResponsiveDevicesExampleComponent,
        customComponentInputs: {
          mobileWidth: 60,
          mobileHeight: 100,
          mobileGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }
      }
    ]
  }
];
```

## Benefits of Using Components

1. **Better Code Organization**: Separate logic and template into reusable components
2. **Type Safety**: TypeScript support for inputs and outputs
3. **Reusability**: Use the same component across multiple features
4. **Maintainability**: Easier to update and test
5. **Angular Features**: Access to all Angular features (services, lifecycle hooks, etc.)
6. **Dynamic Inputs**: Pass different configurations to the same component

## Example Components Included

### 1. ResponsiveDevicesExampleComponent
Displays responsive device mockups with customizable sizes and colors.

**Usage:**
```typescript
{
  name: 'Responsive Design',
  customComponent: ResponsiveDevicesExampleComponent,
  customComponentInputs: {
    mobileWidth: 60,
    tabletWidth: 120,
    desktopWidth: 180,
    mobileGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
}
```

### 2. BuyerSellerExampleComponent
Visualizes buyer-seller intermediation with customizable labels and colors.

**Usage:**
```typescript
{
  name: 'Intermediação de Compra e Venda',
  customComponent: BuyerSellerExampleComponent,
  customComponentInputs: {
    buyerLabel: 'Comprador',
    sellerLabel: 'Vendedor',
    arrow: '⟷'
  }
}
```

## When to Use What?

- **imageUrl**: Simple static images that don't need interactivity
- **gifUrl**: Animated demonstrations or recordings
- **customHtml**: Quick, simple custom layouts without logic
- **customComponent**: Complex interactions, reusable components, or when you need TypeScript/Angular features

## Notes

- Components must be **standalone** components
- All inputs are optional - provide defaults in your component
- The component will be wrapped in a `.feature-custom-content` div
- GSAP animations will be applied automatically
- Works on both desktop and mobile layouts

# Feature Tabs - Custom Components Examples

This folder contains example Angular components that can be used with the `customComponent` feature in the Feature Tabs component.

## Quick Start

### 1. Use an existing example component

```typescript
import { ResponsiveDevicesExampleComponent } from './components/feature-tabs/examples/responsive-devices-example';

// In your menu items:
{
  name: 'Responsive Design',
  customComponent: ResponsiveDevicesExampleComponent,
  customComponentInputs: {
    mobileWidth: 60,
    tabletWidth: 120
  }
}
```

### 2. Create your own component

All custom components should be:
- **Standalone components** (`standalone: true`)
- Use `@Input()` decorators for customizable properties
- Import necessary modules (e.g., `CommonModule`)

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-custom-feature',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="my-feature">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  `,
  styles: [`
    .my-feature {
      padding: 1rem;
      text-align: center;
    }
  `]
})
export class MyCustomFeatureComponent {
  @Input() title: string = 'Default Title';
  @Input() description: string = 'Default description';
}
```

## Available Example Components

### ResponsiveDevicesExampleComponent
**Purpose**: Display responsive device mockups (mobile, tablet, desktop)

**Inputs**:
- `mobileWidth` (number): Width of mobile device in pixels (default: 60)
- `mobileHeight` (number): Height of mobile device in pixels (default: 100)
- `tabletWidth` (number): Width of tablet device in pixels (default: 120)
- `tabletHeight` (number): Height of tablet device in pixels (default: 80)
- `desktopWidth` (number): Width of desktop device in pixels (default: 180)
- `desktopHeight` (number): Height of desktop device in pixels (default: 120)
- `mobileGradient` (string): CSS gradient for mobile device
- `tabletGradient` (string): CSS gradient for tablet device
- `desktopGradient` (string): CSS gradient for desktop device
- `borderRadius` (number): Border radius in rem units (default: 0.5)
- `boxShadow` (string): CSS box-shadow property

**Example**:
```typescript
{
  name: 'Responsive Design',
  customComponent: ResponsiveDevicesExampleComponent,
  customComponentInputs: {
    mobileWidth: 60,
    mobileHeight: 100,
    mobileGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
}
```

### BuyerSellerExampleComponent
**Purpose**: Visualize buyer-seller intermediation

**Inputs**:
- `buyerLabel` (string): Label for buyer (default: 'Comprador')
- `sellerLabel` (string): Label for seller (default: 'Vendedor')
- `arrow` (string): Arrow symbol between parties (default: '⟷')
- `buyerGradient` (string): CSS gradient for buyer circle
- `sellerGradient` (string): CSS gradient for seller circle
- `buyerColor` (string): Text color for buyer label
- `sellerColor` (string): Text color for seller label
- `arrowColor` (string): Color for arrow

**Example**:
```typescript
{
  name: 'Intermediação de Compra e Venda',
  customComponent: BuyerSellerExampleComponent,
  customComponentInputs: {
    buyerLabel: 'Cliente',
    sellerLabel: 'Fornecedor',
    arrowColor: '#ff6b6b'
  }
}
```

## Guidelines

1. **Keep components simple**: Focus on presentation, not complex logic
2. **Use inputs for customization**: Make your components flexible with `@Input()` properties
3. **Provide sensible defaults**: All inputs should have default values
4. **Standalone components only**: Always use `standalone: true`
5. **Import what you need**: Include necessary modules in the `imports` array
6. **Responsive design**: Consider mobile and desktop layouts
7. **Accessibility**: Use semantic HTML and ARIA labels when appropriate

## File Organization

```
examples/
├── README.md                           # This file
├── MIGRATION_EXAMPLES.ts               # Before/after examples
├── responsive-devices-example.ts       # Responsive devices component
├── buyer-seller-example.ts             # Buyer-seller visualization
└── your-custom-component.ts            # Add your components here
```

## Migration from customHtml

If you have existing features using `customHtml`, you can gradually migrate them to components:

**Before** (still works):
```typescript
{
  name: 'My Feature',
  customHtml: `<div style="padding: 2rem;">HTML content</div>`
}
```

**After** (recommended for complex features):
```typescript
{
  name: 'My Feature',
  customComponent: MyFeatureComponent,
  customComponentInputs: { /* ... */ }
}
```

See `MIGRATION_EXAMPLES.ts` for detailed migration patterns.

## Benefits

✅ **Type Safety**: TypeScript validation for inputs  
✅ **Reusability**: Use the same component with different configurations  
✅ **Maintainability**: Update in one place, changes apply everywhere  
✅ **Testability**: Write unit tests for your components  
✅ **Angular Features**: Access services, lifecycle hooks, and more  
✅ **Better Code Organization**: Separate concerns and keep code clean  

## Need Help?

See the main documentation: `FEATURE_TABS_COMPONENT_GUIDE.md`

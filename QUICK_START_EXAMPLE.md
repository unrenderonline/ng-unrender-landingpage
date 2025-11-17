# Quick Start Example - Using Custom Components

## Step 1: Add Imports

Add these imports to the top of `src/app/components/feature-tabs/feature-tabs.ts`:

```typescript
import { ResponsiveDevicesExampleComponent } from './examples/responsive-devices-example';
import { BuyerSellerExampleComponent } from './examples/buyer-seller-example';
```

## Step 2: Replace Existing Features

### Example 1: Responsive Design Feature

**Find this in your `developmentMenuItems` (around line 94):**

```typescript
// BEFORE (customHtml approach - still works!):
{
  name: 'Responsive Design',
  customHtml: `
    <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; padding: 2rem;">
      <div style="width: 60px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
      <div style="width: 120px; height: 80px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
      <div style="width: 180px; height: 120px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
    </div>
  `
}
```

**Replace with:**

```typescript
// AFTER (customComponent approach - recommended!):
{
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
}
```

### Example 2: Buyer-Seller Intermediation

**Find this in your `infrastructureMenuItems` (around line 253):**

```typescript
// BEFORE:
{
  name: 'Intermediação de Compra e Venda',
  customHtml: `
    <div style="display: flex; align-items: center; justify-content: space-around; padding: 2rem;">
      <div style="text-align: center;">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; margin: 0 auto 0.5rem; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"></div>
        <div style="font-weight: bold; color: #667eea;">Comprador</div>
      </div>
      <div style="font-size: 2rem; color: #f97316;">⟷</div>
      <div style="text-align: center;">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%; margin: 0 auto 0.5rem; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"></div>
        <div style="font-weight: bold; color: #f5576c;">Vendedor</div>
      </div>
    </div>
  `
}
```

**Replace with:**

```typescript
// AFTER:
{
  name: 'Intermediação de Compra e Venda',
  customComponent: BuyerSellerExampleComponent,
  customComponentInputs: {
    buyerLabel: 'Comprador',
    sellerLabel: 'Vendedor',
    arrow: '⟷',
    buyerGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    sellerGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    buyerColor: '#667eea',
    sellerColor: '#f5576c',
    arrowColor: '#f97316'
  }
}
```

## Step 3: Test It!

Run your application and navigate to the feature tabs to see the components in action.

## Bonus: Reuse Components with Different Configs

You can use the same component multiple times with different configurations:

```typescript
// Small devices version
{
  name: 'Mobile First Design',
  customComponent: ResponsiveDevicesExampleComponent,
  customComponentInputs: {
    mobileWidth: 80,    // Larger mobile
    tabletWidth: 100,   // Smaller tablet
    desktopWidth: 140,  // Smaller desktop
    mobileGradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)'
  }
}

// Large devices version
{
  name: 'Desktop First Design',
  customComponent: ResponsiveDevicesExampleComponent,
  customComponentInputs: {
    mobileWidth: 40,
    tabletWidth: 100,
    desktopWidth: 220,
    desktopGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
}
```

## Full Example: Updated developmentMenuItems

```typescript
developmentMenuItems: MenuItem[] = [
  {
    id: 'web-mobile',
    title: 'Landing Pages',
    subtitle: 'ÚNICAS! COMO O SEU NEGÓCIO!',
    description: 'Criamos experiências únicas, criativas e responsivas...',
    carouselImages: [
      // ... your carousel images
    ],
    features: [
      { 
        name: 'Aplicativos Mobile (iOS & Android)', 
        imageUrl: '/apolo-png.png' 
      },
      { 
        name: 'Progressive Web Apps (PWA)', 
        imageUrl: '/kardapio-png.png' 
      },
      // NEW: Using customComponent instead of customHtml
      {
        name: 'Responsive Design',
        customComponent: ResponsiveDevicesExampleComponent,
        customComponentInputs: {
          mobileWidth: 60,
          mobileHeight: 100,
          tabletWidth: 120,
          tabletHeight: 80,
          desktopWidth: 180,
          desktopHeight: 120
        }
      },
      { 
        name: 'E-commerce & Landing Pages', 
        imageUrl: '/aqui-shopping1.png' 
      },
      { 
        name: 'Sistemas Web Corporativos', 
        imageUrl: '/cronos-png.png' 
      }
    ]
  }
];
```

## Next Steps

1. ✅ Add the imports
2. ✅ Replace the features
3. ✅ Run your app
4. 🎨 Create your own custom components!

See `FEATURE_TABS_COMPONENT_GUIDE.md` for more details.

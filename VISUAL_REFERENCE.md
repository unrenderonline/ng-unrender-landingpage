# Visual Reference - New Design

## Desktop View

```
┌─────────────────────────────────────────────────────────────────┐
│  [Desenvolvimento]  [Infraestrutura]  [Soluções 3D]             │
│     (Purple)           (Purple)          (Blue)                 │
└─────────────────────────────────────────────────────────────────┘

┌───────────┬─────────────────────────────────────────────────────┐
│ SIDEBAR   │                CONTENT AREA                         │
│           │                                                     │
│ Soluções  │              📱 (Large Animated Icon)               │
│ ────────  │                                                     │
│           │           Web e Mobile                              │
│ ► Web e   │    Desenvolvemos aplicações web e mobile...        │
│   Mobile  │                                                     │
│           │  ┌──────────────────────────────────────────┐      │
│   Soluções│  │ ✓  Aplicativos Mobile (iOS & Android)   │      │
│   com IA  │  └──────────────────────────────────────────┘      │
│           │  ┌──────────────────────────────────────────┐      │
│   Sistemas│  │ ✓  Progressive Web Apps (PWA)            │      │
│   Custom. │  └──────────────────────────────────────────┘      │
│           │  ┌──────────────────────────────────────────┐      │
│           │  │ ✓  Responsive Design                     │      │
│           │  └──────────────────────────────────────────┘      │
│           │  ┌──────────────────────────────────────────┐      │
│           │  │ ✓  E-commerce & Landing Pages            │      │
│           │  └──────────────────────────────────────────┘      │
│           │  ┌──────────────────────────────────────────┐      │
│           │  │ ✓  Sistemas Web Corporativos             │      │
│           │  └──────────────────────────────────────────┘      │
│           │                                                     │
│           │  ┌──────────────────────────────────────────┐      │
│           │  │  Pronto para começar?                    │      │
│           │  │  Entre em contato e vamos transformar... │      │
│           │  │  [Falar com Especialista]                │      │
│           │  └──────────────────────────────────────────┘      │
└───────────┴─────────────────────────────────────────────────────┘
```

## Mobile View

```
┌─────────────────────────────────────┐
│  ▼ Desenvolvimento de Software      │
│     (Purple background)             │
├─────────────────────────────────────┤
│                                     │
│  [Web e Mobile] [IA] [Customizado]  │
│     (pill buttons)                  │
│                                     │
│         📱 (Animated Icon)          │
│                                     │
│         Web e Mobile                │
│  Desenvolvemos aplicações web...    │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ ✓  Aplicativos Mobile         │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ ✓  Progressive Web Apps       │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ ✓  Responsive Design          │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ ✓  E-commerce & Pages         │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ ✓  Sistemas Corporativos      │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

## Animation Sequence

### 1. Icon Animation (0.6s)
```
Start:     scale(0), rotate(-180deg)
           ⤓
End:       scale(1), rotate(0deg)
Easing:    back.out(1.7) [bouncy effect]
```

### 2. Title Animation (0.5s)
```
Start:     opacity(0), translateY(-20px)
           ⤓
End:       opacity(1), translateY(0)
Easing:    power2.out
```

### 3. Feature Cards (0.6s each, staggered by 0.1s)
```
Card 1: Start → opacity(0), scale(0.9), y(50px)
              ⤓ (0.0s)
        End → opacity(1), scale(1), y(0)

Card 2: Start → opacity(0), scale(0.9), y(50px)
              ⤓ (0.1s delay)
        End → opacity(1), scale(1), y(0)

Card 3: Start → opacity(0), scale(0.9), y(50px)
              ⤓ (0.2s delay)
        End → opacity(1), scale(1), y(0)

... and so on
Easing:    power3.out
```

### 4. CTA Section (last to animate)
```
Same as feature cards but appears last
Total delay: ~0.5s + (0.1s × number of features)
```

## Color Scheme

### Feature Cards
```
Background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Text: White
Icon Circle: rgba(255, 255, 255, 0.2)
Shadow: rgba(102, 126, 234, 0.3)
```

### CTA Section
```
Background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
Text: White
Button: White background with #f5576c text
Shadow: rgba(245, 87, 108, 0.3)
```

### Typography
```
Icon: 4rem (desktop), 3rem (mobile)
Title: 3xl (desktop), 2xl (mobile)
Description: lg (desktop), base (mobile)
Feature Text: 1rem (desktop), 0.9rem (mobile)
```

## Hover Effects

### Feature Cards
```
Default:   translateY(0), shadow(0 4px 15px ...)
Hover:     translateY(-5px), shadow(0 8px 25px ...)
Duration:  0.3s
```

### CTA Button
```
Default:   translateY(0), shadow(0 4px 15px ...)
Hover:     translateY(-3px), shadow(0 6px 20px ...)
Active:    translateY(-1px)
Duration:  0.3s
```

## Icons Used

### Desenvolvimento de Software
- 📱 Web e Mobile
- 🤖 Soluções com IA  
- ⚙️ Sistemas Customizados

### Infraestrutura On-Premise
- 📋 Planejamento
- 🔧 Implementação
- 🛠️ Manutenção

### Soluções 3D e Games
- (Maintains current Unrender Games design)

## Alternative Icon Options

### Using Font Awesome
```html
<!-- Web e Mobile -->
<i class="fas fa-mobile-alt"></i>

<!-- Soluções com IA -->
<i class="fas fa-robot"></i>

<!-- Sistemas Customizados -->
<i class="fas fa-cogs"></i>

<!-- Planejamento -->
<i class="fas fa-clipboard-list"></i>

<!-- Implementação -->
<i class="fas fa-wrench"></i>

<!-- Manutenção -->
<i class="fas fa-tools"></i>
```

### Using Heroicons (if installed)
```html
<!-- Web e Mobile -->
<svg><!-- device-phone-mobile --></svg>

<!-- Soluções com IA -->
<svg><!-- cpu-chip --></svg>

<!-- Sistemas Customizados -->
<svg><!-- cog --></svg>
```

## Layout Breakpoints

```scss
// Desktop (>= 768px)
- Sidebar: 3 columns (col-md-3)
- Content: 9 columns (col-md-9)
- Features: Grid with auto-fit (minmax 280px)

// Mobile (< 768px)
- Sidebar: Hidden
- Top menu: Horizontal pills
- Content: Full width
- Features: Stacked vertically
```

## Performance Notes

- **GSAP animations use GPU acceleration** (transform, opacity)
- **No layout thrashing** - only animating transform/opacity
- **Optimized for 60fps** on modern devices
- **Stagger animations** prevent overwhelming the GPU
- **Total animation time**: ~1.2s for all elements

## Accessibility Considerations

To respect users who prefer reduced motion:

```scss
@media (prefers-reduced-motion: reduce) {
  .animated-card,
  .animated-icon,
  .animated-title {
    animation: none !important;
    transition: none !important;
  }
}
```

Add this to your SCSS if needed!

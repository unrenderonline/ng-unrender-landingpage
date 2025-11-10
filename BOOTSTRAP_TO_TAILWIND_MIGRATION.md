# Bootstrap to Tailwind CSS Migration Guide

## Migration Status

### ✅ Completed Files:
1. **navbar.html** - Fully converted with mobile menu functionality
2. **home.html** - Product cards section converted
3. **sobre.html** - About page converted
4. **contact.html** - Footer/contact section converted
5. **styles.scss** - Updated to use Tailwind directives
6. **angular.json** - Bootstrap references removed
7. **tailwind.config.js** - Created with custom theme

### ⚠️ Partially Completed:
1. **feature-tabs.html** - Started conversion (needs completion of remaining Bootstrap classes)

## Bootstrap to Tailwind Class Mappings

### Layout & Grid
- `container` → `container mx-auto px-4`
- `container-fluid` → `w-full px-4`
- `row` → `grid grid-cols-1 md:grid-cols-12` or `flex flex-wrap`
- `col` → `w-full`
- `col-md-6` → `md:col-span-6` (in grid) or `md:w-1/2` (in flex)
- `col-lg-4` → `lg:col-span-4` or `lg:w-1/3`
- `col-lg-3` → `lg:col-span-3` or `lg:w-1/4`
- `g-4` → `gap-4` or `gap-8`

### Display & Visibility
- `d-none` → `hidden`
- `d-block` → `block`
- `d-flex` → `flex`
- `d-md-none` → `md:hidden`
- `d-md-block` → `md:block`
- `d-none d-md-block` → `hidden md:block`

### Flexbox
- `d-flex` → `flex`
- `flex-row` → `flex-row`
- `flex-column` → `flex-col`
- `align-items-center` → `items-center`
- `justify-content-center` → `justify-center`
- `justify-content-between` → `justify-between`
- `ms-auto` → `ml-auto`
- `me-auto` → `mr-auto`

### Spacing
- `m-0` → `m-0`
- `mt-3` → `mt-3` or `mt-6` (4px vs 8px)
- `mb-4` → `mb-4` or `mb-8`
- `p-4` → `p-4` or `p-8`
- `px-4` → `px-4`
- `py-4` → `py-4`
- `g-4` (gap) → `gap-4`

### Typography
- `text-center` → `text-center`
- `text-start` → `text-left`
- `text-end` → `text-right`
- `fw-bold` → `font-bold`
- `fst-italic` → `italic`
- `lead` → `text-lg md:text-xl`
- `display-4` → `text-4xl md:text-5xl`
- `display-5` → `text-3xl md:text-4xl`
- `text-muted` → `text-gray-600`
- `text-white` → `text-white`
- `text-decoration-none` → `no-underline`
- `text-uppercase` → `uppercase`

### Colors & Backgrounds
- `bg-primary` → `bg-blue-600`
- `bg-white` → `bg-white`
- `text-white` → `text-white`
- `text-muted` → `text-gray-600`

### Borders & Shadows
- `rounded` → `rounded-md`
- `rounded-3` → `rounded-lg`
- `shadow-sm` → `shadow-md`
- `shadow-lg` → `shadow-2xl`
- `border` → `border`

### Cards
- `card` → `bg-white rounded-lg shadow-md overflow-hidden`
- `card-body` → `p-6 flex flex-col`
- `card-title` → `text-xl font-bold mb-3`
- `card-text` → `text-gray-700`
- `card-img-top` → `w-full object-cover`
- `h-100` → `h-full`

### Buttons & Navigation
- `btn` → `inline-block px-6 py-2 rounded-md transition-colors`
- `btn-primary` → `bg-blue-600 text-white hover:bg-blue-700`
- `btn-custom-unrender` → `bg-unrender-accent text-white hover:bg-yellow-600`
- `nav` → `flex` or `list-none`
- `nav-item` → Remove (use `li` directly)
- `nav-link` → `inline-block px-4 py-2 transition-colors`
- `nav-pills` → Add rounded styling and active states

### Images
- `img-fluid` → `w-full` or `w-auto`
- `img-thumbnail` → `border-4 border-gray-200`

### Lists
- `list-unstyled` → `list-none`

### Utilities
- `me-3` → `mr-4`
- `ms-2` → `ml-2`
- `fs-4` → `text-2xl`

## Next Steps for feature-tabs.html

The feature-tabs.html file needs the following Bootstrap classes converted:

1. All `col-md-*` classes → Tailwind grid/flex equivalents
2. All `row` → `grid` or `flex flex-wrap`
3. All `card` components → Tailwind card styling
4. All `nav-*` classes → Tailwind navigation styling
5. All `d-none d-md-block` → `hidden md:block`

## Custom Tailwind Classes Added

In `tailwind.config.js`:
```javascript
colors: {
  'unrender-purple': '#0a0311',
  'unrender-accent': '#f5a623',
}
```

## Testing

After migration:
1. Run `npm start` to test the application
2. Check responsive behavior at different breakpoints (sm, md, lg, xl)
3. Verify all interactive elements (dropdowns, mobile menus) work correctly
4. Test hover states and transitions

## Bootstrap Removal

Once all files are converted:
```bash
npm uninstall bootstrap
```

Already removed from angular.json:
- ~~node_modules/bootstrap/scss/bootstrap.scss~~
- ~~node_modules/bootstrap/dist/js/bootstrap.bundle.min.js~~

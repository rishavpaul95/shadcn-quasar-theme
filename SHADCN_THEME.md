# shadcn/ui Theme Integration for Quasar

This project now includes a shadcn/ui inspired theme that works seamlessly with Quasar components using Tailwind CSS overrides.

## What's Included

### 1. Color System

- **Light Mode**: Clean white backgrounds with subtle borders and proper contrast
- **Dark Mode**: Dark backgrounds with lighter text and appropriate accent colors
- **CSS Variables**: All colors are defined as CSS custom properties for easy customization

### 2. Component Styling

- **Cards**: Clean borders, subtle shadows, rounded corners
- **Inputs**: Minimal design with focus states and proper hover effects
- **Buttons**: Three variants - primary, secondary, and outline
- **Typography**: Inter font family for modern look

### 3. Theme Classes

#### Cards

```vue
<q-card class="shadcn-card">
  <!-- Your content -->
</q-card>
```

#### Buttons

```vue
<!-- Primary button -->
<q-btn class="btn-primary" label="Primary" />

<!-- Secondary button -->
<q-btn class="btn-secondary" label="Secondary" />

<!-- Outline button -->
<q-btn class="btn-outline" label="Outline" />
```

#### Text Colors

```vue
<div class="text-foreground">Primary text</div>
<div class="text-muted">Muted text</div>
<div class="text-primary-shadcn">Primary accent text</div>
```

#### Links

```vue
<a class="shadcn-link" href="#">Styled link</a>
```

### 4. Layout Integration

- Header and drawer are styled with shadcn/ui theme
- Theme toggle component included
- Responsive design with proper spacing

### 5. CSS Variables Reference

#### Light Mode Colors

- `--background`: Main background color
- `--foreground`: Primary text color
- `--card`: Card background color
- `--border`: Border color
- `--primary`: Primary accent color
- `--muted`: Muted background color
- `--muted-foreground`: Muted text color

#### Dark Mode

All variables automatically switch when `.dark` class is applied to `<html>`.

### 6. Usage Examples

#### Login/Register Forms

The LoginPage and RegisterPage have been updated to showcase the new theme with:

- Clean card design
- Proper input styling
- External labels for better UX
- Consistent spacing and typography

#### Theme Toggle

Use the `ThemeToggle` component anywhere in your app:

```vue
<ThemeToggle />
```

### 7. Customization

#### Changing Colors

Edit the CSS variables in `/src/css/shadcn-theme.scss`:

```scss
:root {
  --primary: 222.2 47.4% 11.2%; /* Your custom primary color */
  --radius: 0.75rem; /* Your custom border radius */
}
```

#### Adding New Components

Follow the same pattern for styling new Quasar components:

```scss
.q-your-component {
  background-color: hsl(var(--card)) !important;
  color: hsl(var(--card-foreground)) !important;
  border: 1px solid hsl(var(--border)) !important;
  border-radius: var(--radius) !important;
}
```

### 8. Best Practices

1. **Use CSS Variables**: Always use the defined CSS variables for consistency
2. **Test Both Themes**: Make sure your components work in both light and dark modes
3. **Maintain Contrast**: Ensure proper color contrast for accessibility
4. **Follow Spacing**: Use the defined spacing scale for consistency

### 9. Files Modified

- `tailwind.config.js` - Updated color palette and variables
- `src/css/shadcn-theme.scss` - Main theme definitions and overrides
- `src/css/app.scss` - Import statements
- `src/utils/shadcn-theme.js` - Theme utilities and initialization
- `src/components/ThemeToggle.vue` - Custom theme toggle component
- `src/pages/LoginPage.vue` - Updated with shadcn styling
- `src/pages/RegisterPage.vue` - Updated with shadcn styling
- `src/layouts/MainLayout.vue` - Updated header and drawer styling
- `src/App.vue` - Initialize shadcn theme
- `src/stores/theme.js` - Updated for shadcn integration

This setup gives you a modern, clean design system that closely matches shadcn/ui while maintaining full Quasar functionality.

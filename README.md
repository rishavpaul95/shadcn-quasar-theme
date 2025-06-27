# Quasar + shadcn/ui Theme

A modern Quasar framework project with a beautiful shadcn/ui inspired design system. This theme brings the elegant and consistent styling of shadcn/ui to Quasar components, providing a seamless dark/light mode experience with modern typography and refined UI elements.

## ✨ Features

- 🎨 **shadcn/ui Design System** - Clean, modern, and consistent styling
- 🌓 **Dark/Light Mode** - Seamless theme switching with proper contrast
- 🎯 **Component Coverage** - Styled buttons, cards, forms, notifications, and more
- ⚡ **Performance Optimized** - Efficient CSS with semantic color variables
- 🔧 **Customizable** - Easy to modify colors and spacing via CSS variables
- 📱 **Responsive** - Mobile-first design with proper breakpoints
- ♿ **Accessible** - Proper focus states, contrast ratios, and ARIA support

## 🚀 Quick Start

### Install Dependencies

```bash
yarn install
# or
npm install
```

### Development Mode

```bash
quasar dev
```

### Production Build

```bash
quasar build
```

## 🎨 Theme System

### Color Palette

The theme uses a semantic color system based on shadcn/ui variables:

#### Light Mode

- **Background**: `hsl(0 0% 100%)` - Pure white
- **Foreground**: `hsl(222.2 84% 4.9%)` - Near black
- **Primary**: `hsl(222.2 47.4% 11.2%)` - Dark blue-gray
- **Secondary**: `hsl(210 40% 96%)` - Light gray
- **Muted**: `hsl(210 40% 96%)` - Subtle backgrounds
- **Border**: `hsl(214.3 31.8% 91.4%)` - Light borders

#### Dark Mode

- **Background**: `hsl(222.2 84% 4.9%)` - Dark blue-gray
- **Foreground**: `hsl(210 40% 98%)` - Near white
- **Primary**: `hsl(210 40% 98%)` - Light primary
- **Secondary**: `hsl(217.2 32.6% 17.5%)` - Dark gray
- **Muted**: `hsl(217.2 32.6% 17.5%)` - Subtle dark backgrounds
- **Border**: `hsl(217.2 32.6% 17.5%)` - Dark borders

#### Semantic Colors

- **Success**: `hsl(142 76% 36%)` - Green for success states
- **Warning**: `hsl(48 96% 53%)` - Yellow for warnings
- **Error**: `hsl(0 84.2% 60.2%)` - Red for errors
- **Info**: `hsl(198 93% 60%)` - Blue for information

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Line Height**: Optimized for readability

## 🧩 Styled Components

### Core Components

#### Buttons (`q-btn`)

- **Primary**: Dark background with light text
- **Secondary**: Light background with dark text
- **Outline**: Transparent with colored border
- **Ghost**: Transparent with hover effects
- **Destructive**: Red theme for dangerous actions

#### Cards (`q-card`)

- Clean backgrounds with subtle shadows
- Proper border radius and padding
- Dark mode compatible

#### Form Controls

- **Inputs** (`q-input`): Modern styling with focus states
- **Checkboxes** (`q-checkbox`): Custom styling with primary colors
- **Radio Buttons** (`q-radio`): Consistent with design system
- **Toggle Switches** (`q-toggle`): Smooth animations and proper states

#### Notifications (`q-notification`)

- Neutral card backgrounds
- Colored icons for different types
- Consistent with design system

#### Dialogs (`q-dialog`)

- Enhanced shadows and spacing
- Proper dark mode support

### Navigation

- **Drawer**: Seamless integration with theme
- **Toolbar**: Clean styling with proper contrast

## 🔧 Customization

### Modifying Colors

Edit the CSS variables in `src/css/shadcn-theme.scss`:

```scss
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96%;
  --accent: 210 40% 96%;
  // ... other variables
}
```

### Adding New Components

Follow the existing pattern in `shadcn-theme.scss`:

```scss
.your-component {
  background-color: hsl(var(--card)) !important;
  color: hsl(var(--card-foreground)) !important;
  border: 1px solid hsl(var(--border)) !important;
  border-radius: var(--radius) !important;
  font-family: 'Inter', sans-serif !important;
}
```

### Dark Mode Toggle

The theme automatically responds to dark mode. Implement a toggle using Quasar's dark mode:

```javascript
import { Dark } from 'quasar'

// Toggle dark mode
Dark.toggle()

// Set dark mode
Dark.set(true)

// Check if dark mode is active
const isDark = Dark.isActive
```

## 📁 File Structure

```
src/
├── css/
│   ├── app.scss              # Main stylesheet
│   ├── shadcn-theme.scss     # Theme implementation
│   └── quasar.variables.scss # Quasar color variables
├── components/
│   └── ThemeToggle.vue       # Dark mode toggle component
└── ...
```

## 🎯 Component Examples

### Button Variants

```vue
<template>
  <div class="q-gutter-md">
    <q-btn color="primary" label="Primary" />
    <q-btn color="secondary" label="Secondary" />
    <q-btn outline color="primary" label="Outline" />
    <q-btn flat color="primary" label="Ghost" />
    <q-btn color="negative" label="Destructive" />
  </div>
</template>
```

### Form Controls

```vue
<template>
  <div class="q-gutter-md">
    <q-input v-model="text" label="Input Field" />
    <q-checkbox v-model="checked" label="Checkbox" />
    <q-radio v-model="radio" val="option1" label="Radio Option" />
    <q-toggle v-model="toggle" label="Toggle Switch" />
  </div>
</template>
```

### Cards

```vue
<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Card Title</div>
      <div class="text-subtitle2">Card subtitle</div>
    </q-card-section>
    <q-card-section> Card content goes here. </q-card-section>
  </q-card>
</template>
```

## 🛠 Development

### Code Quality

```bash
# Lint the files
yarn lint
# or
npm run lint

# Format the files
yarn format
# or
npm run format
```

### Build for Production

```bash
quasar build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Design system inspiration
- [Quasar Framework](https://quasar.dev/) - Vue.js framework
- [Inter Font](https://rsms.me/inter/) - Typography
- [Tailwind CSS](https://tailwindcss.com/) - Utility classes and design tokens

---

## 📚 Additional Resources

- [Quasar Documentation](https://quasar.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Vue.js Documentation](https://vuejs.org/)
- [Inter Font Specimen](https://rsms.me/inter/)

Made with ❤️ using Quasar Framework and shadcn/ui design principles.

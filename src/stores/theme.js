import { defineStore } from 'pinia'
import { Dark, LocalStorage } from 'quasar'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false,
    // shadcn/ui inspired colors
    primaryColor: 'hsl(222.2, 47.4%, 11.2%)', // shadcn primary (dark)
    secondaryColor: 'hsl(215.4, 16.3%, 46.9%)', // shadcn muted foreground (good contrast)
    accentColor: 'hsl(210, 40%, 96%)', // shadcn accent
  }),

  getters: {
    currentTheme: (state) => state.isDarkMode ? 'dark' : 'light',
    themeIcon: (state) => state.isDarkMode ? 'light_mode' : 'dark_mode',
    themeColors: (state) => ({
      primary: state.primaryColor,
      secondary: state.secondaryColor,
      accent: state.accentColor,
    })
  },

  actions: {
    // Initialize theme from localStorage
    initializeTheme() {
      const savedTheme = LocalStorage.getItem('theme')
      const savedColors = LocalStorage.getItem('themeColors')

      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark'
      } else {
        // Check system preference
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (!LocalStorage.getItem('theme')) {
            this.isDarkMode = e.matches
            this.applyTheme()
          }
        })
      }

      if (savedColors) {
        const colors = savedColors
        this.primaryColor = colors.primary || this.primaryColor
        this.secondaryColor = colors.secondary || this.secondaryColor
        this.accentColor = colors.accent || this.accentColor
      }

      this.applyTheme()
    },

    // Toggle between dark and light mode
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      this.applyTheme()
      this.persistTheme()
    },

    // Set specific theme
    setTheme(isDark) {
      this.isDarkMode = isDark
      this.applyTheme()
      this.persistTheme()
    },

    // Apply theme to both Quasar and shadcn/ui
    applyTheme() {
      // Apply to Quasar
      Dark.set(this.isDarkMode)

      // Apply to shadcn/ui (add/remove 'dark' class from html element)
      const htmlElement = document.documentElement
      if (this.isDarkMode) {
        htmlElement.classList.add('dark')
      } else {
        htmlElement.classList.remove('dark')
      }

      // Apply shadcn/ui colors to Quasar's CSS variables
      const root = document.documentElement

      if (this.isDarkMode) {
        // Dark mode shadcn colors
        root.style.setProperty('--q-primary', 'hsl(210, 40%, 98%)') // light foreground
        root.style.setProperty('--q-secondary', 'hsl(215, 20.2%, 65.1%)') // muted foreground for dark mode
        root.style.setProperty('--q-accent', 'hsl(217.2, 32.6%, 17.5%)') // dark accent
        root.style.setProperty('--q-positive', 'hsl(142, 76%, 45%)') // success green (brighter for dark)
        root.style.setProperty('--q-negative', 'hsl(0, 62.8%, 45%)') // error red (adjusted for dark)
        root.style.setProperty('--q-warning', 'hsl(48, 96%, 60%)') // warning yellow (brighter for dark)
        root.style.setProperty('--q-info', 'hsl(198, 93%, 70%)') // info blue (brighter for dark)
        root.style.setProperty('--q-dark', 'hsl(222.2, 84%, 4.9%)') // dark background
      } else {
        // Light mode shadcn colors
        root.style.setProperty('--q-primary', 'hsl(222.2, 47.4%, 11.2%)') // dark primary
        root.style.setProperty('--q-secondary', 'hsl(215.4, 16.3%, 46.9%)') // muted foreground (good contrast)
        root.style.setProperty('--q-accent', 'hsl(210, 40%, 96%)') // light accent background
        root.style.setProperty('--q-positive', 'hsl(142, 76%, 36%)') // success green
        root.style.setProperty('--q-negative', 'hsl(0, 84.2%, 60.2%)') // error red
        root.style.setProperty('--q-warning', 'hsl(48, 96%, 53%)') // warning yellow
        root.style.setProperty('--q-info', 'hsl(198, 93%, 60%)') // info blue
        root.style.setProperty('--q-dark', 'hsl(222.2, 47.4%, 11.2%)') // dark for buttons
      }
    },

    // Update theme colors
    updateColors(colors) {
      if (colors.primary) this.primaryColor = colors.primary
      if (colors.secondary) this.secondaryColor = colors.secondary
      if (colors.accent) this.accentColor = colors.accent

      this.applyTheme()
      this.persistTheme()
    },

    // Persist theme to localStorage
    persistTheme() {
      LocalStorage.set('theme', this.isDarkMode ? 'dark' : 'light')
      LocalStorage.set('themeColors', {
        primary: this.primaryColor,
        secondary: this.secondaryColor,
        accent: this.accentColor,
      })
    },

    // Reset to default shadcn/ui theme
    resetTheme() {
      this.isDarkMode = false
      this.primaryColor = 'hsl(222.2, 47.4%, 11.2%)'
      this.secondaryColor = 'hsl(215.4, 16.3%, 46.9%)'
      this.accentColor = 'hsl(210, 40%, 96%)'
      this.applyTheme()
      this.persistTheme()
    }
  }
})

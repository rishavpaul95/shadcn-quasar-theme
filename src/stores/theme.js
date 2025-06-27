import { defineStore } from 'pinia'
import { Dark, LocalStorage } from 'quasar'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false,
    primaryColor: '#1976D2',
    secondaryColor: '#26A69A',
    accentColor: '#9C27B0',
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

      // Apply custom colors to CSS variables for Quasar compatibility
      const root = document.documentElement
      root.style.setProperty('--q-primary', this.primaryColor)
      root.style.setProperty('--q-secondary', this.secondaryColor)
      root.style.setProperty('--q-accent', this.accentColor)
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

    // Reset to default theme
    resetTheme() {
      this.isDarkMode = false
      this.primaryColor = '#1976D2'
      this.secondaryColor = '#26A69A'
      this.accentColor = '#9C27B0'
      this.applyTheme()
      this.persistTheme()
    }
  }
})

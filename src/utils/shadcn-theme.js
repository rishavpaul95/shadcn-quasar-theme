// Theme utilities for shadcn/ui integration with Quasar
import { Dark } from 'quasar'

export const initShadcnTheme = () => {
    // Initialize theme based on Quasar's dark mode
    updateShadcnTheme(Dark.isActive)

    // Watch for Quasar dark mode changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isDark = document.body.classList.contains('body--dark')
                updateShadcnTheme(isDark)
            }
        })
    })

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    })
}

export const updateShadcnTheme = (isDark) => {
    const htmlElement = document.documentElement

    if (isDark) {
        htmlElement.classList.add('dark')
    } else {
        htmlElement.classList.remove('dark')
    }
}

export const toggleShadcnTheme = () => {
    Dark.toggle()
    updateShadcnTheme(Dark.isActive)
}

// Set CSS custom properties for better integration
export const setShadcnCSSProperties = () => {
    const root = document.documentElement

    // Set border radius
    root.style.setProperty('--radius', '0.5rem')

    // Ensure Inter font is loaded
    if (!document.querySelector('link[href*="Inter"]')) {
        const link = document.createElement('link')
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        link.rel = 'stylesheet'
        document.head.appendChild(link)
    }
}

// Initialize everything
export const initShadcnUI = () => {
    setShadcnCSSProperties()
    initShadcnTheme()
}

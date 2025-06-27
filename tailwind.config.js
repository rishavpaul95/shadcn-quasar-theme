/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e3f2fd',
                    100: '#bbdefb',
                    200: '#90caf9',
                    300: '#64b5f6',
                    400: '#42a5f5',
                    500: '#2196f3',
                    600: '#1e88e5',
                    700: '#1976d2',
                    800: '#1565c0',
                    900: '#0d47a1',
                },
                secondary: {
                    50: '#e0f2f1',
                    100: '#b2dfdb',
                    200: '#80cbc4',
                    300: '#4db6ac',
                    400: '#26a69a',
                    500: '#009688',
                    600: '#00897b',
                    700: '#00796b',
                    800: '#00695c',
                    900: '#004d40',
                },
                dark: {
                    50: '#f5f5f5',
                    100: '#eeeeee',
                    200: '#e0e0e0',
                    300: '#bdbdbd',
                    400: '#9e9e9e',
                    500: '#757575',
                    600: '#616161',
                    700: '#424242',
                    800: '#2d2d2d',
                    900: '#1d1d1d',
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
    // Make sure Tailwind doesn't conflict with Quasar
    corePlugins: {
        preflight: false,
    }
}

import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            screens: {
                'xs': '475px',
                '3xl': '1600px',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            zIndex: {
                '60': '60',
                '70': '70',
                'sidebar': '40',
                'overlay': '30',
                'dropdown': '50',
            },
            animation: {
                slideIn: 'slideIn 0.3s ease-out',
                slideInLeft: 'slideInLeft 0.3s ease-out',
                slideOutLeft: 'slideOutLeft 0.3s ease-in',
                fadeIn: 'fadeIn 0.2s ease-out',
            },
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                slideOutLeft: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },

    plugins: [
        forms,
        // Plugin untuk responsive utilities tambahan
        function({ addUtilities, theme }) {
            const newUtilities = {
                '.touch-manipulation': {
                    'touch-action': 'manipulation',
                },
                '.safe-area-inset-top': {
                    'padding-top': 'env(safe-area-inset-top)',
                },
                '.safe-area-inset-bottom': {
                    'padding-bottom': 'env(safe-area-inset-bottom)',
                },
                '.safe-area-inset-left': {
                    'padding-left': 'env(safe-area-inset-left)',
                },
                '.safe-area-inset-right': {
                    'padding-right': 'env(safe-area-inset-right)',
                },
            }
            addUtilities(newUtilities)
        }
    ],
};

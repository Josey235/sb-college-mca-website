/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        /*
         * Existing "navy" class names are intentionally preserved
         * so the existing pages continue to work.
         * The visual palette is now warm charcoal / stone.
         */
        navy: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#141210',
        },

        /*
         * Existing "academic" class names now represent
         * the new terracotta accent.
         */
        academic: {
          50: '#fbf3ef',
          100: '#f6e7df',
          200: '#edd7cc',
          300: '#e2bbaa',
          400: '#d69a7c',
          500: '#cf8865',
          600: '#c9784a',
          700: '#b96845',
          800: '#9f573b',
          900: '#824932',
          950: '#603326',
        },

        /*
         * Existing gold classes are retained as a muted
         * warm secondary accent.
         */
        gold: {
          50: '#fbf8ee',
          100: '#f5edcf',
          200: '#eadca7',
          300: '#dfca78',
          400: '#d2b85b',
          500: '#c4a64c',
          600: '#a88935',
          700: '#866d2d',
        },

        terracotta: {
          50: '#fbf3ef',
          100: '#f6e7df',
          200: '#edd7cc',
          300: '#e2bbaa',
          400: '#d69a7c',
          500: '#cf8865',
          600: '#c9784a',
          700: '#b96845',
          800: '#9f573b',
          900: '#824932',
          950: '#603326',
        },

        cream: {
          50: '#fdfcf9',
          100: '#faf8f5',
          200: '#f5f1ec',
          300: '#eee8e1',
          400: '#e4dbd1',
        },
      },

      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],

        display: [
          'Plus Jakarta Sans',
          'Inter',
          'sans-serif',
        ],

        serif: [
          'Merriweather',
          'Georgia',
          'serif',
        ],
      },

      boxShadow: {
        'card':
          '0 4px 20px -2px rgba(41, 37, 36, 0.06), 0 2px 6px -1px rgba(41, 37, 36, 0.04)',

        'card-hover':
          '0 20px 30px -4px rgba(41, 37, 36, 0.10), 0 8px 10px -2px rgba(41, 37, 36, 0.05)',

        'glow':
          '0 0 25px rgba(201, 120, 74, 0.16)',

        'glow-gold':
          '0 0 25px rgba(196, 166, 76, 0.16)',
      },

      backgroundImage: {
        'grid-pattern':
          'radial-gradient(rgba(201, 120, 74, 0.07) 1px, transparent 1px)',

        'hero-gradient':
          'linear-gradient(135deg, #faf8f5 0%, #ffffff 55%, #f5eee9 100%)',

        'subtle-gradient':
          'linear-gradient(180deg, #faf8f5 0%, #ffffff 100%)',

        'warm-gradient':
          'linear-gradient(135deg, #ffffff 0%, #faf8f5 50%, #f5eee9 100%)',
      },
    },
  },

  plugins: [],
};
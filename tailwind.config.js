/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#1E3E62',
          900: '#0B192C',
          950: '#060D17',
        },
        academic: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif']
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(11, 25, 44, 0.06), 0 2px 6px -1px rgba(11, 25, 44, 0.04)',
        'card-hover': '0 20px 30px -4px rgba(11, 25, 44, 0.12), 0 8px 10px -2px rgba(11, 25, 44, 0.06)',
        'glow': '0 0 25px rgba(37, 99, 235, 0.25)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.25)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(37, 99, 235, 0.08) 1px, transparent 1px)",
        'hero-gradient': "linear-gradient(135deg, #0B192C 0%, #1E3E62 60%, #0F2A4A 100%)",
        'subtle-gradient': "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
      }
    },
  },
  plugins: [],
}


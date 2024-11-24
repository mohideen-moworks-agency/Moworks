/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#E6F5F3',
          100: '#CCEAE7',
          200: '#99D5CF',
          300: '#66C0B7',
          400: '#33AB9F',
          500: '#2A9D8F',
          600: '#227E72',
          700: '#195E55',
          800: '#113F38',
          900: '#081F1C',
        },
        sage: {
          50: '#F2F5F5',
          100: '#E5EBEA',
          200: '#CBD7D5',
          300: '#B1C3C0',
          400: '#97AFAB',
          500: '#89B0AE',
          600: '#6E8D8B',
          700: '#526A68',
          800: '#374646',
          900: '#1B2323',
        },
        coral: {
          50: '#FFF1EE',
          100: '#FFE4DD',
          200: '#FFC9BB',
          300: '#FFAE99',
          400: '#FF9377',
          500: '#FF8360',
          600: '#CC694D',
          700: '#994E3A',
          800: '#663426',
          900: '#331A13',
        },
        cream: '#FAF3DD',
        yellow: '#FFD93D',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};
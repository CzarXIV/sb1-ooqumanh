/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        black: '#0F0F0F',
        white: '#FFFFFF',
        cream: '#F7F7F2',
        gray: {
          50: '#F9F9F9',
          100: '#F3F3F3',
          200: '#E8E8E8',
          300: '#DFDFDF',
          400: '#C5C5C5',
          500: '#A0A0A0',
          600: '#707070',
          700: '#484848',
          800: '#343434',
          900: '#1F1F1F',
        },
        accent: {
          gold: '#D4AF37',
          silver: '#C0C0C0',
        },
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      height: {
        'screen-70': '70vh',
        'screen-80': '80vh',
        'screen-90': '90vh',
      },
      padding: {
        'full': '100%',
      },
      animation: {
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
    },
  },
  plugins: [],
};
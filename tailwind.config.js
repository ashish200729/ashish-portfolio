/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'muted-foreground': '#6b7280',
        'primary': '#ffffff',
        'secondary': '#9ca3af',
        'neutral': {
          500: '#6b7280',
        },
      },
      keyframes: {
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'in': 'slide-in-from-top 0.5s ease-out, fade-in 0.5s ease-out',
        'slide-in-from-top-2': 'slide-in-from-top 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
    },
  },
  plugins: [],
};

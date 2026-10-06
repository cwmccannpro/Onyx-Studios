/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#DEDBC8',
        cream: '#E1E0CC',
        onyx: {
          950: '#070708',
          900: '#0C0C0E',
          850: '#111113',
          800: '#161619',
          700: '#1E1E22',
          600: '#2A2A2F',
        },
      },
    },
  },
  plugins: [],
};

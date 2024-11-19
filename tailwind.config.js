/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient-shift 3s ease infinite',
        'glitch': 'glitch 500ms infinite',
        'noise': 'noise-anim 3s infinite linear alternate-reverse',
        'grid': 'grid-move 20s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
    },
  },
  plugins: [],
};
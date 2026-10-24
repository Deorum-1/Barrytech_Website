/** Brand colors sampled from the BarryTech logo */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#0a5a96', 50: '#eef6fc', 100: '#d6e9f7', 200: '#a9cfec', 300: '#6faedd', 400: '#2f86c4', 500: '#0a5a96', 600: '#084a7d', 700: '#073b64', 800: '#062c4b', 900: '#071b30' },
        hot: { DEFAULT: '#ff1414', 600: '#e00c0c', 700: '#b80808', 100: '#ffe3e3' },
        ink: '#071b30',
      },
      fontFamily: { display: ['Sora', 'system-ui', 'sans-serif'], sans: ['Figtree', 'system-ui', 'sans-serif'] },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        drift: { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(24px,-18px)' } },
        dash: { to: { strokeDashoffset: '0' } },
        orbit: { to: { transform: 'rotate(360deg)' } },
        halo: { '0%,100%': { opacity: '0.35', transform: 'scale(0.97)' }, '50%': { opacity: '0.65', transform: 'scale(1.02)' } },
        tap: { '0%,64%,100%': { transform: 'translateY(0) scale(1)' }, '70%': { transform: 'translateY(2px) scale(0.88)' }, '76%': { transform: 'translateY(0) scale(1)' } },
        underline: { '0%,100%': { opacity: '0.2', transform: 'scaleX(1)' }, '50%': { opacity: '0.6', transform: 'scaleX(1.2)' } },
        'wheel-spin': { to: { transform: 'rotate(360deg)' } },
        'wheel-counter': { to: { transform: 'rotate(-360deg)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-cards': 'marquee 75s linear infinite',
        drift: 'drift 12s ease-in-out infinite',
        dash: 'dash 2.4s ease-out forwards',
        orbit: 'orbit 22s linear infinite',
        halo: 'halo 7s ease-in-out infinite',
        tap: 'tap 2.4s ease-in-out infinite',
        underline: 'underline 3.2s ease-in-out infinite',
        'wheel-spin': 'wheel-spin 60s linear infinite',
        'wheel-counter': 'wheel-counter 60s linear infinite',
      },
    },
  },
  plugins: [],
}

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
      },
      animation: { marquee: 'marquee 40s linear infinite', drift: 'drift 12s ease-in-out infinite', dash: 'dash 2.4s ease-out forwards' },
    },
  },
  plugins: [],
}

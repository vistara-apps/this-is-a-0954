/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 85% 50%)',
        accent: 'hsl(340 80% 55%)',
        bg: 'hsl(220 15% 10%)',
        surface: 'hsl(220 10% 14%)',
        border: 'hsl(220 8% 20%)',
        muted: 'hsl(220 5% 35%)',
        text: 'hsl(0 0% 95%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
      boxShadow: {
        'card': '0px 4px 16px hsla(0, 0%, 0%, 0.2)',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
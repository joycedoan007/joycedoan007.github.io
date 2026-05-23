/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1320px',
      },
      colors: {
        page: 'var(--bg-page)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        accent: 'var(--primary-500)',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.035em',
        snug: '-0.02em',
        wide: '0.02em',
        wider: '0.08em',
        widest: '0.1em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'modal-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'modal-slide': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'modal-fade': 'modal-fade 200ms ease',
        'modal-slide': 'modal-slide 240ms cubic-bezier(.2,.7,.2,1)',
      },
    },
  },
  plugins: [],
};

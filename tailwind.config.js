/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',         // Dynamic primary background
        secondary: 'var(--color-secondary)',     // Dynamic card/section background
        accent: 'var(--color-accent)',           // Dynamic accent matte charcoal black
        'accent-light': 'var(--color-accent-light)', // Dynamic slate hover color
        muted: 'var(--color-muted)',             // Dynamic muted text
        white: 'var(--color-white)',             // Dynamic high-contrast body text
        border: 'var(--color-border)',           // Dynamic delicate border grey
        darkest: 'var(--color-darkest)',         // Dynamic pre-loader/shading
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],  // All H1-H3
        body: ['"DM Sans"', 'sans-serif'],            // All body, nav, buttons
        mono: ['"DM Mono"', 'monospace'],             // Numbers/stats
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          surface: 'var(--color-bg-surface)',
          'surface-hover': 'var(--color-bg-surface-hover)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        accent: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
          tertiary: 'var(--color-accent-tertiary)',
        },
        border: 'var(--color-border)',
        divider: 'var(--color-divider)',
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        hero: 'clamp(3rem, 8vw, 6rem)',
        h1: 'clamp(2rem, 5vw, 3.5rem)',
        h2: 'clamp(1.5rem, 3vw, 2rem)',
        h3: 'clamp(1.125rem, 2vw, 1.5rem)',
      },
    },
  },
  plugins: [],
};

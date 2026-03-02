# Sanket Shah — Portfolio Website

Personal portfolio website showcasing my work as a Full-Stack Software Engineer specializing in AI/LLM integration, multi-agent architecture, and cloud-native development.

**Live:** [shahsanket2107.github.io](https://shahsanket2107.github.io)

## Tech Stack

- **[Astro](https://astro.build/)** — Static site generator that ships zero JavaScript by default. Components are rendered to HTML at build time, with client-side scripts only where needed (hero animation, theme toggle, scroll reveals). Results in sub-second builds and fast page loads.

- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework with a custom design token system using CSS custom properties for light/dark theming. Custom font stack: Sora (headings), Inter (body), JetBrains Mono (code).

- **Canvas 2D API** — The hero section features a neural network visualization built entirely with the native Canvas 2D API. 150 animated nodes with proximity-based connections, data pulse particles flowing between nodes, and mouse-reactive repulsion — all with zero external dependencies. No Three.js, no WebGL, no extra bundle weight.

- **GitHub Actions** — Automated CI/CD pipeline that builds the Astro site and deploys to GitHub Pages on every push to `main`.

## Project Structure

```
src/
├── components/     # Astro components (Hero, About, Projects, etc.)
├── data/           # TypeScript data files (projects, experience, skills, education)
├── layouts/        # Base HTML layout
├── pages/          # Route pages
├── scripts/        # Client-side scripts (theme toggle)
└── styles/         # Global CSS with design tokens
```

## Development

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build locally
```

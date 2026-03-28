# salvamiguel.com - Personal SPA Design Spec

## Overview

Single-page application for Salvador Miguel Manzanera Hernandez, Expert Architect specializing in Cloud, DevOps, and AI. Projects technical credibility — someone who designs architectures and also codes. Elegant, technical, memorable.

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime / Package Manager | Bun |
| Build | Vite (Rollup under the hood) |
| Framework | Vue 3, Composition API, `<script setup>`, TypeScript |
| Styling | Tailwind CSS v4, CSS variables for theming |
| Routing | Vue Router with `createWebHashHistory()` |
| Deploy | GitHub Actions -> GitHub Pages |

## Design Direction

**Concept:** Editorial tecnico de alto contraste. Inspired by high-level documentation and engineering publications, not designer portfolios.

### Typography

- **Display/Headings:** Syne (weight 700-800) — geometric, technical
- **Monospace/Labels:** JetBrains Mono — for labels, dates, chips, code
- **Body/Paragraphs:** Inter — legible, neutral for long text

All loaded from Google Fonts.

### Color Palette

| Token | Dark Mode (default) | Light Mode |
|-------|-------------------|------------|
| `--bg` | `#0D0D0D` | `#F5F3EE` |
| `--text` | `#F0EDE8` | `#0D0D0D` |
| `--accent` | `#4AFFA0` | `#00A35C` |
| `--surface` | `#1A1A1A` | `#FFFFFF` |

### Visual Rules

- No decorative gradients
- Dark mode has subtle CSS noise texture (SVG data URI background) to avoid flat black
- Animations: fade-in + translateY staggered per section on scroll (Intersection Observer)
- Hero has typewriter animation on tagline
- `prefers-reduced-motion` disables all animations

## Project Structure

```
salvamiguel.com/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   └── favicon.ico
└── src/
    ├── App.vue                     # RouterView wrapper
    ├── main.ts                     # Entry: createApp + router + styles
    ├── style.css                   # Tailwind directives + noise + animations
    ├── router/
    │   └── index.ts                # Hash-based router, / -> HomePage
    ├── composables/
    │   ├── useTheme.ts             # Dark/light toggle, localStorage, prefers-color-scheme
    │   ├── useTypewriter.ts        # Cycling typewriter effect, reactive ref
    │   └── useScrollReveal.ts      # IntersectionObserver fade-in
    ├── components/
    │   ├── NavBar.vue              # Fixed navbar, blur backdrop, mobile hamburger
    │   ├── HeroSection.vue         # Two-column hero with tagline + CTAs
    │   ├── TerminalBlock.vue       # Fake terminal with blinking cursor
    │   ├── StackChips.vue          # Grouped tech chips, horizontal scroll on mobile
    │   ├── ExperienceTimeline.vue  # Vertical timeline container
    │   ├── ExperienceEntry.vue     # Expandable timeline entry
    │   ├── ProjectsGrid.vue        # 3-column project grid
    │   ├── ProjectCard.vue         # Individual project card with hover
    │   ├── CertsGrid.vue           # Certification badges grid
    │   ├── CertBadge.vue           # Individual cert badge
    │   ├── ContactSection.vue      # Minimal contact section with copy-to-clipboard
    │   └── ui/
    │       ├── ThemeToggle.vue     # Sun/moon SVG toggle
    │       ├── ChipTag.vue         # Reusable chip component
    │       └── ToastNotification.vue # Ephemeral toast for "Copied!"
    ├── pages/
    │   └── HomePage.vue            # Assembles all sections for the / route
    └── data/
        ├── experience.ts           # Typed experience entries array
        ├── projects.ts             # Typed projects array
        ├── certs.ts                # Typed certifications array
        └── skills.ts               # Tech chips grouped by category
```

## Routing

- **Strategy:** `createWebHashHistory()` — works on GitHub Pages without server config
- **Current routes:** `/ -> HomePage.vue` (all sections)
- **Future routes:** `/courses/:slug`, `/labs/:id`, etc. — router is ready for expansion
- `App.vue` contains only `<RouterView />` and global layout (if any)

## Sections Detail

### Navbar

- Fixed top, `backdrop-filter: blur(12px)` with semi-transparent background
- Left: "SM" initials in Syne bold as minimal logo
- Right: navigation links in JetBrains Mono small (`#about`, `#experience`, `#projects`, `#certs`, `#contact`) + ThemeToggle
- Mobile: hamburger icon that opens full-screen overlay panel
- Links use smooth scroll to section IDs within HomePage

### 01 - Hero (`#about`)

**Two columns on desktop, stacked on mobile.**

Left column:
- Name: "Salvador Miguel / Manzanera Hernandez" in Syne 700-800
- Title: "Expert Architect" with horizontal rule
- Typewriter tagline cycling through:
  1. "Building cloud infrastructures that don't wake you up at 3am."
  2. "IaC, CaC, and a deep respect for the terminal."
  3. "Teaching machines and engineers to work better."
- Two CTAs: "Ver proyectos" (scroll to #projects), "Descargar CV" (PDF link)
- GitHub + LinkedIn icon links

Right column:
- Terminal block with `#111` background, `1px solid accent` border
- Fake shell session showing whoami, skills.json, uptime
- Blinking cursor via CSS animation

### 02 - Stack (below hero, no own ID)

Chips grouped by category in horizontal scroll on mobile:

| Group | Accent Color | Technologies |
|-------|-------------|-------------|
| Cloud | Blue | AWS, Google Cloud, Azure |
| IaC / DevOps | Green (terminal) | Terraform, Ansible, Crossplane, GitHub Actions |
| Languages | Light gray | Python, TypeScript, PHP, SQL, Vue.js |
| AI | Amber | Azure OpenAI, AWS AI Practitioner |
| Teaching | Coral | Multicloud, AI Systems |

Chips: JetBrains Mono, 11px, border-radius 4px, 1px border in group color, subtle background tint.

### 03 - Experience (`#experience`)

Vertical timeline with 2px accent-colored line on left, circular nodes per entry.

Each entry expandable (click/tap). Collapsed: role + company + dates. Expanded: description + tech chips.

Entries (newest first):
1. Expert Architect - NTT Data - Sep 2025-Present
2. Lead Architect - NTT Data - Feb 2024-Sep 2025
3. Profesor - Master IA - Universidad Europea de Valencia - Nov 2024-Present (parallel)
4. CTO - Viviendea - Jan 2022-Jan 2024
5. Junior Full Stack Developer - Viviendea - Nov 2018-Jan 2022
6. Junior C# Developer - COCOPLAN - Nov 2017-Aug 2018

### 04 - Projects (`#projects`)

Grid: 3 columns desktop, 1 mobile. Cards with:
- Project name (Syne bold)
- 1-2 line description
- Tech chips
- GitHub link
- Hover: translateY(-4px) + accent border glow

Cards:
1. Twitter Sentiment — Python, NLP, Data Analysis
2. Viviendea Match — Python, Algorithm Design, Real Estate
3. Crossplane Workshop — Crossplane, GitOps, IaC, Kubernetes

### 05 - Certifications (`#certs`)

Grid of compact badge cards grouped by platform:

- **AWS** (orange border): Solutions Architect Associate (Sep 2024), AI Practitioner (Jan 2025)
- **Azure** (blue border): AI-900 (Dec 2025), DP-900 (Dec 2025)
- **GitHub** (dark border): Actions Certificate (Mar 2025)
- **UPV** (gray border): ML for Big Data Analytics (Jun 2018)

### 06 - Contact (`#contact`)

Minimal. No form. Shows:
- "Tienes un proyecto interesante?"
- salva@salvamiguel.com (large, click to copy with toast)
- GitHub link
- LinkedIn link
- "Valencia, Spain — Open to remote"

## Composables

### `useTheme()`
- Reads `localStorage('theme')`; falls back to `prefers-color-scheme`
- Toggles `.dark` class on `<html>`
- Returns `{ isDark: Ref<boolean>, toggle: () => void }`

### `useTypewriter(phrases: string[])`
- Types characters one by one, pauses, deletes, moves to next phrase
- Returns `{ text: Ref<string>, isDeleting: Ref<boolean> }`
- Configurable speeds for typing, deleting, pause

### `useScrollReveal()`
- IntersectionObserver with threshold ~0.1
- Adds `.revealed` class to observed elements
- Staggered delay via CSS `transition-delay` on children
- Checks `prefers-reduced-motion`: if active, all elements start revealed

## Accessibility

- `aria-label` on all icon-only buttons (theme toggle, hamburger, social links)
- Minimum AA contrast ratios (verified: #F0EDE8 on #0D0D0D = 16.3:1, #4AFFA0 on #0D0D0D = 11.8:1)
- `prefers-reduced-motion: reduce` disables all transitions and animations
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`
- Keyboard-navigable expandable entries

## GitHub Actions Deploy

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Vite config sets `base: '/'` assuming custom domain `salvamiguel.com`.

## Excluded (YAGNI)

- No analytics / SEO meta beyond basics
- No i18n (content in English per spec)
- No service worker / PWA
- No unit tests (first iteration)
- No image lazy loading (no images in scope)
- Words banned: "sinergia", "disruptivo", "apasionado por la innovacion"
- No skill progress bars
- No stock photos
- No excessive shadows or loud gradients

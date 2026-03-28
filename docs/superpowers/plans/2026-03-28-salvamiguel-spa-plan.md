# salvamiguel.com SPA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal SPA for Salvador Miguel with Vue 3 + Vite + Tailwind + Bun, deployable to GitHub Pages.

**Architecture:** Vue 3 SPA with hash-based routing, vue-i18n for ES/EN, Tailwind CSS v4 for styling with CSS variable theming. All content data lives in typed TS files. Three composables handle theme, typewriter, and scroll reveal.

**Tech Stack:** Bun, Vite, Vue 3 + TypeScript, Tailwind CSS v4, Vue Router, vue-i18n

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `src/main.ts`
- Create: `src/App.vue`
- Create: `src/env.d.ts`

- [ ] **Step 1: Initialize project with Bun and install dependencies**

```bash
cd /Users/salva/Documents/WORKING/salvamiguel.com
bun init -y
bun add vue vue-router vue-i18n
bun add -d vite @vitejs/plugin-vue typescript tailwindcss @tailwindcss/vite
```

- [ ] **Step 2: Create vite.config.ts**

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/',
})
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "noEmit": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "baseUrl": "."
  },
  "include": ["src/**/*.ts", "src/**/*.vue", "src/**/*.json"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create src/env.d.ts**

```ts
/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Salvador Miguel - Expert Architect</title>
  <meta name="description" content="Expert Architect specializing in Cloud, DevOps, and AI" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

- [ ] **Step 6: Create minimal src/App.vue and src/main.ts**

`src/App.vue`:
```vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
```

`src/main.ts`:
```ts
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.mount('#app')
```

- [ ] **Step 7: Create src/style.css with Tailwind v4**

```css
@import "tailwindcss";
```

- [ ] **Step 8: Add dev script to package.json and verify**

Add to package.json scripts: `"dev": "vite", "build": "vite build", "preview": "vite preview"`

Run: `bun run dev` — verify blank page loads at localhost:5173

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + Vue 3 + Tailwind + Bun project"
```

---

### Task 2: Tailwind Theme + Global CSS

**Files:**
- Modify: `src/style.css`

- [ ] **Step 1: Write full style.css with theme variables, noise, animations**

```css
@import "tailwindcss";

/* === Theme variables via @theme === */
@theme {
  --color-bg: #0D0D0D;
  --color-text: #F0EDE8;
  --color-accent: #4AFFA0;
  --color-surface: #1A1A1A;
  --color-accent-secondary: #00A35C;

  --font-display: 'Syne', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-body: 'Inter', sans-serif;
}

/* === Base styles === */
html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color 0.3s, color 0.3s;
}

/* === Light mode overrides === */
html:not(.dark) body {
  background-color: #F5F3EE;
  color: #0D0D0D;
}
html:not(.dark) {
  --color-bg: #F5F3EE;
  --color-text: #0D0D0D;
  --color-accent: #00A35C;
  --color-surface: #FFFFFF;
}

/* === Dark mode noise texture === */
.dark body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* === Scroll reveal animations === */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* === Reduced motion === */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}

/* === Terminal cursor blink === */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.cursor-blink {
  animation: blink 1s step-end infinite;
}

/* === Typewriter cursor === */
.typewriter-cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: var(--color-accent);
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
}
```

- [ ] **Step 2: Verify dev server shows dark background**

Run: `bun run dev` — page should show `#0D0D0D` background

- [ ] **Step 3: Commit**

```bash
git add src/style.css
git commit -m "feat: add Tailwind theme, noise texture, and animation CSS"
```

---

### Task 3: Router + i18n Setup

**Files:**
- Create: `src/router/index.ts`
- Create: `src/i18n/index.ts`
- Create: `src/i18n/locales/es.json`
- Create: `src/i18n/locales/en.json`
- Create: `src/pages/HomePage.vue`
- Modify: `src/main.ts`

- [ ] **Step 1: Create router**

`src/router/index.ts`:
```ts
import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
```

- [ ] **Step 2: Create i18n locale files**

`src/i18n/locales/es.json`:
```json
{
  "nav": {
    "about": "Sobre mi",
    "experience": "Experiencia",
    "projects": "Proyectos",
    "certs": "Certificaciones",
    "contact": "Contacto"
  },
  "hero": {
    "title": "Expert Architect",
    "cta_projects": "Ver proyectos",
    "cta_cv": "Descargar CV",
    "taglines": [
      "Building cloud infrastructures that don't wake you up at 3am.",
      "IaC, CaC, and a deep respect for the terminal.",
      "Teaching machines and engineers to work better."
    ]
  },
  "stack": {
    "title": "Stack",
    "cloud": "Cloud",
    "iac": "IaC / DevOps",
    "languages": "Languages",
    "ai": "AI",
    "teaching": "Teaching"
  },
  "experience": {
    "title": "Experiencia",
    "present": "Presente",
    "parallel": "paralelo",
    "entries": {
      "ntt_expert": "Modernizacion cloud para clientes enterprise internacionales. Arquitecturas cloud-native, IaC/CaC, DevOps y Platform Engineering.",
      "ntt_lead": "Migracion cloud de clientes internacionales. Estrategias HA/DR. Definicion de SDLC cloud-ready.",
      "profesor": "Docencia en desarrollo y despliegue de sistemas IA en entornos multicloud.",
      "cto": "Estrategia tecnologica, analisis de demanda inmobiliaria, visualizacion de datos. Premio ASPRIMA 2023.",
      "fullstack": "PHP, Vue.js, Google Cloud, Google Maps API, AWS Lambda. Seleccionado para Lanzadera CBRE.",
      "csharp": "Software de gestion de proyectos de construccion. Seleccionado para Lanzadera Garage."
    }
  },
  "projects": {
    "title": "Proyectos",
    "twitter": "Analisis de sentimiento de tweets por keyword y rango temporal.",
    "viviendea": "Algoritmo de ranking para miles de inmuebles con 200 parametros en menos de un nanosegundo.",
    "crossplane": "Workshop paso a paso de un workflow GitOps completo con Crossplane."
  },
  "certs": {
    "title": "Certificaciones"
  },
  "contact": {
    "title": "Tienes un proyecto interesante?",
    "location": "Valencia, Spain — Abierto a remoto",
    "copied": "Copiado!"
  }
}
```

`src/i18n/locales/en.json`:
```json
{
  "nav": {
    "about": "About",
    "experience": "Experience",
    "projects": "Projects",
    "certs": "Certifications",
    "contact": "Contact"
  },
  "hero": {
    "title": "Expert Architect",
    "cta_projects": "View projects",
    "cta_cv": "Download CV",
    "taglines": [
      "Building cloud infrastructures that don't wake you up at 3am.",
      "IaC, CaC, and a deep respect for the terminal.",
      "Teaching machines and engineers to work better."
    ]
  },
  "stack": {
    "title": "Stack",
    "cloud": "Cloud",
    "iac": "IaC / DevOps",
    "languages": "Languages",
    "ai": "AI",
    "teaching": "Teaching"
  },
  "experience": {
    "title": "Experience",
    "present": "Present",
    "parallel": "parallel",
    "entries": {
      "ntt_expert": "Cloud modernization for international enterprise clients. Cloud-native architectures, IaC/CaC, DevOps and Platform Engineering.",
      "ntt_lead": "Cloud migration for international clients. HA/DR strategies. Cloud-ready SDLC definition.",
      "profesor": "Teaching AI system development and deployment in multicloud environments.",
      "cto": "Technology strategy, real estate demand analysis, data visualization. ASPRIMA 2023 Award.",
      "fullstack": "PHP, Vue.js, Google Cloud, Google Maps API, AWS Lambda. Selected for Lanzadera CBRE.",
      "csharp": "Construction project management software. Selected for Lanzadera Garage."
    }
  },
  "projects": {
    "title": "Projects",
    "twitter": "Tweet sentiment analysis by keyword and time range.",
    "viviendea": "Ranking algorithm for thousands of properties with 200 parameters in under a nanosecond.",
    "crossplane": "Step-by-step workshop for a complete GitOps workflow with Crossplane."
  },
  "certs": {
    "title": "Certifications"
  },
  "contact": {
    "title": "Got an interesting project?",
    "location": "Valencia, Spain — Open to remote",
    "copied": "Copied!"
  }
}
```

- [ ] **Step 3: Create i18n setup**

`src/i18n/index.ts`:
```ts
import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

function detectLocale(): string {
  const stored = localStorage.getItem('locale')
  if (stored) return stored
  const nav = navigator.language || ''
  return nav.startsWith('es') ? 'es' : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { es, en },
})

export default i18n
```

- [ ] **Step 4: Create placeholder HomePage**

`src/pages/HomePage.vue`:
```vue
<script setup lang="ts">
</script>

<template>
  <main class="min-h-screen">
    <p class="text-text font-display text-4xl p-8">salvamiguel.com</p>
  </main>
</template>
```

- [ ] **Step 5: Wire up main.ts with router and i18n**

`src/main.ts`:
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
```

- [ ] **Step 6: Verify routing works**

Run: `bun run dev` — navigate to `http://localhost:5173/#/` and see "salvamiguel.com" text

- [ ] **Step 7: Commit**

```bash
git add src/router src/i18n src/pages src/main.ts
git commit -m "feat: add Vue Router with hash history and vue-i18n ES/EN"
```

---

### Task 4: Composables

**Files:**
- Create: `src/composables/useTheme.ts`
- Create: `src/composables/useTypewriter.ts`
- Create: `src/composables/useScrollReveal.ts`

- [ ] **Step 1: Create useTheme**

```ts
import { ref, watch } from 'vue'

const isDark = ref(true)

function initTheme() {
  const stored = localStorage.getItem('theme')
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = !window.matchMedia('(prefers-color-scheme: light)').matches
  }
  applyTheme()
}

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
}

function toggle() {
  isDark.value = !isDark.value
}

watch(isDark, () => {
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()
})

export function useTheme() {
  initTheme()
  return { isDark, toggle }
}
```

- [ ] **Step 2: Create useTypewriter**

```ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useTypewriter(phrases: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const text = ref('')
  const isDeleting = ref(false)
  let phraseIndex = 0
  let charIndex = 0
  let timeout: ReturnType<typeof setTimeout> | null = null

  function tick() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting.value) {
      charIndex--
      text.value = currentPhrase.substring(0, charIndex)
      if (charIndex === 0) {
        isDeleting.value = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        timeout = setTimeout(tick, 400)
        return
      }
      timeout = setTimeout(tick, deletingSpeed)
    } else {
      charIndex++
      text.value = currentPhrase.substring(0, charIndex)
      if (charIndex === currentPhrase.length) {
        isDeleting.value = true
        timeout = setTimeout(tick, pauseTime)
        return
      }
      timeout = setTimeout(tick, typingSpeed)
    }
  }

  onMounted(() => tick())
  onUnmounted(() => { if (timeout) clearTimeout(timeout) })

  return { text, isDeleting }
}
```

- [ ] **Step 3: Create useScrollReveal**

```ts
import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer: IntersectionObserver | null = null

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  onMounted(() => {
    const elements = document.querySelectorAll('.reveal')

    if (prefersReduced) {
      elements.forEach(el => el.classList.add('revealed'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach(el => observer!.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}
```

- [ ] **Step 4: Commit**

```bash
git add src/composables
git commit -m "feat: add useTheme, useTypewriter, and useScrollReveal composables"
```

---

### Task 5: Data Files

**Files:**
- Create: `src/data/experience.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/certs.ts`
- Create: `src/data/skills.ts`

- [ ] **Step 1: Create experience.ts**

```ts
export interface ExperienceEntry {
  id: string
  role: string
  company: string
  dateStart: string
  dateEnd: string
  descriptionKey: string
  chips: string[]
  parallel?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    id: 'ntt_expert',
    role: 'Expert Architect',
    company: 'NTT Data',
    dateStart: 'Sep 2025',
    dateEnd: '',
    descriptionKey: 'experience.entries.ntt_expert',
    chips: ['Terraform', 'Ansible', 'AWS', 'Azure', 'Crossplane'],
  },
  {
    id: 'ntt_lead',
    role: 'Lead Architect',
    company: 'NTT Data',
    dateStart: 'Feb 2024',
    dateEnd: 'Sep 2025',
    descriptionKey: 'experience.entries.ntt_lead',
    chips: ['AWS', 'GitHub Actions', 'CodeBuild', 'Terraform', 'COBOL'],
  },
  {
    id: 'profesor',
    role: 'Profesor',
    company: 'Universidad Europea de Valencia',
    dateStart: 'Nov 2024',
    dateEnd: '',
    descriptionKey: 'experience.entries.profesor',
    chips: ['AWS', 'Azure', 'AI-900', 'DP-900'],
    parallel: true,
  },
  {
    id: 'cto',
    role: 'CTO',
    company: 'Viviendea',
    dateStart: 'Jan 2022',
    dateEnd: 'Jan 2024',
    descriptionKey: 'experience.entries.cto',
    chips: ['Azure OpenAI', 'AWS', 'Power BI', 'Docker', 'Agile'],
  },
  {
    id: 'fullstack',
    role: 'Junior Full Stack Developer',
    company: 'Viviendea',
    dateStart: 'Nov 2018',
    dateEnd: 'Jan 2022',
    descriptionKey: 'experience.entries.fullstack',
    chips: ['PHP', 'Vue.js', 'Laravel', 'GCP', 'AWS Lambda'],
  },
  {
    id: 'csharp',
    role: 'Junior C# Developer',
    company: 'COCOPLAN',
    dateStart: 'Nov 2017',
    dateEnd: 'Aug 2018',
    descriptionKey: 'experience.entries.csharp',
    chips: ['C#', '.NET', 'VBA', 'Power BI', 'MySQL'],
  },
]
```

- [ ] **Step 2: Create projects.ts**

```ts
export interface Project {
  name: string
  descriptionKey: string
  chips: string[]
  github: string
}

export const projects: Project[] = [
  {
    name: 'Twitter Sentiment',
    descriptionKey: 'projects.twitter',
    chips: ['Python', 'NLP', 'Data Analysis'],
    github: 'https://github.com/salvamiguel',
  },
  {
    name: 'Viviendea Match',
    descriptionKey: 'projects.viviendea',
    chips: ['Python', 'Algorithm Design', 'Real Estate'],
    github: 'https://github.com/salvamiguel',
  },
  {
    name: 'Crossplane Workshop',
    descriptionKey: 'projects.crossplane',
    chips: ['Crossplane', 'GitOps', 'IaC', 'Kubernetes'],
    github: 'https://github.com/salvamiguel',
  },
]
```

- [ ] **Step 3: Create certs.ts**

```ts
export interface Certification {
  name: string
  date: string
  platform: string
  borderColor: string
}

export const certifications: Certification[] = [
  { name: 'AWS Certified Solutions Architect – Associate', date: 'Sep 2024', platform: 'AWS', borderColor: '#FF9900' },
  { name: 'AWS Certified AI Practitioner', date: 'Jan 2025', platform: 'AWS', borderColor: '#FF9900' },
  { name: 'Azure AI Fundamentals AI-900', date: 'Dec 2025', platform: 'Azure', borderColor: '#0078D4' },
  { name: 'Azure Data Fundamentals DP-900', date: 'Dec 2025', platform: 'Azure', borderColor: '#0078D4' },
  { name: 'GitHub Actions Certificate', date: 'Mar 2025', platform: 'GitHub', borderColor: '#8B949E' },
  { name: 'Machine Learning for Big Data Analytics', date: 'Jun 2018', platform: 'UPV', borderColor: '#6B7280' },
]
```

- [ ] **Step 4: Create skills.ts**

```ts
export interface SkillGroup {
  labelKey: string
  color: string
  bgColor: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    labelKey: 'stack.cloud',
    color: '#60A5FA',
    bgColor: 'rgba(96,165,250,0.1)',
    items: ['AWS', 'Google Cloud', 'Azure'],
  },
  {
    labelKey: 'stack.iac',
    color: '#4AFFA0',
    bgColor: 'rgba(74,255,160,0.1)',
    items: ['Terraform', 'Ansible', 'Crossplane', 'GitHub Actions'],
  },
  {
    labelKey: 'stack.languages',
    color: '#D1D5DB',
    bgColor: 'rgba(209,213,219,0.1)',
    items: ['Python', 'TypeScript', 'PHP', 'SQL', 'Vue.js'],
  },
  {
    labelKey: 'stack.ai',
    color: '#FBBF24',
    bgColor: 'rgba(251,191,36,0.1)',
    items: ['Azure OpenAI', 'AWS AI Practitioner'],
  },
  {
    labelKey: 'stack.teaching',
    color: '#F87171',
    bgColor: 'rgba(248,113,113,0.1)',
    items: ['Multicloud', 'AI Systems'],
  },
]
```

- [ ] **Step 5: Commit**

```bash
git add src/data
git commit -m "feat: add typed data files for experience, projects, certs, skills"
```

---

### Task 6: UI Components (ThemeToggle, LocaleToggle, ChipTag, Toast)

**Files:**
- Create: `src/components/ui/ThemeToggle.vue`
- Create: `src/components/ui/LocaleToggle.vue`
- Create: `src/components/ui/ChipTag.vue`
- Create: `src/components/ui/ToastNotification.vue`

- [ ] **Step 1: Create ThemeToggle**

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    @click="toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    class="p-2 rounded-lg hover:bg-surface transition-colors"
  >
    <!-- Sun icon -->
    <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
    <!-- Moon icon -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>
```

- [ ] **Step 2: Create LocaleToggle**

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function setLocale(lang: string) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <div class="flex items-center gap-1 font-mono text-xs">
    <button
      @click="setLocale('es')"
      :class="locale === 'es' ? 'text-accent font-bold' : 'text-text/50 hover:text-text'"
      class="transition-colors"
    >ES</button>
    <span class="text-text/30">/</span>
    <button
      @click="setLocale('en')"
      :class="locale === 'en' ? 'text-accent font-bold' : 'text-text/50 hover:text-text'"
      class="transition-colors"
    >EN</button>
  </div>
</template>
```

- [ ] **Step 3: Create ChipTag**

```vue
<script setup lang="ts">
defineProps<{
  label: string
  color?: string
  bgColor?: string
}>()
</script>

<template>
  <span
    class="inline-block font-mono text-[11px] px-2 py-0.5 rounded border"
    :style="{
      borderColor: color || 'currentColor',
      backgroundColor: bgColor || 'transparent',
      color: color || 'currentColor',
    }"
  >{{ label }}</span>
</template>
```

- [ ] **Step 4: Create ToastNotification**

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ message: string; visible: boolean }>()
const emit = defineEmits<{ hide: [] }>()

watch(() => props.visible, (val) => {
  if (val) {
    setTimeout(() => emit('hide'), 2000)
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-4 opacity-0"
  >
    <div
      v-if="visible"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-accent text-[#0D0D0D] font-mono text-sm px-4 py-2 rounded-lg shadow-lg z-50"
    >
      {{ message }}
    </div>
  </Transition>
</template>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui
git commit -m "feat: add ThemeToggle, LocaleToggle, ChipTag, and Toast UI components"
```

---

### Task 7: NavBar Component

**Files:**
- Create: `src/components/NavBar.vue`

- [ ] **Step 1: Create NavBar with mobile hamburger, smooth scroll links, toggles**

Full component with:
- Fixed position, blur backdrop
- SM logo (Syne bold)
- Desktop nav links (JetBrains Mono)
- ThemeToggle + LocaleToggle
- Mobile hamburger with overlay panel
- Smooth scroll to section IDs via `document.querySelector(hash).scrollIntoView()`

- [ ] **Step 2: Verify navbar renders on dev server**

- [ ] **Step 3: Commit**

```bash
git add src/components/NavBar.vue
git commit -m "feat: add NavBar with mobile menu, theme and locale toggles"
```

---

### Task 8: Hero Section + Terminal Block

**Files:**
- Create: `src/components/TerminalBlock.vue`
- Create: `src/components/HeroSection.vue`

- [ ] **Step 1: Create TerminalBlock**

Fake terminal with #111 bg, accent border, shell lines for whoami/skills.json/uptime, blinking cursor.

- [ ] **Step 2: Create HeroSection**

Two-column layout: left with name (Syne), title, typewriter tagline, CTAs, social icons. Right with TerminalBlock. Stacked on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/TerminalBlock.vue src/components/HeroSection.vue
git commit -m "feat: add HeroSection with typewriter tagline and TerminalBlock"
```

---

### Task 9: Stack Chips Section

**Files:**
- Create: `src/components/StackChips.vue`

- [ ] **Step 1: Create StackChips**

Grouped chips by category, horizontal scroll on mobile. Uses ChipTag component and skills data. Each group has a label (translated via i18n key).

- [ ] **Step 2: Commit**

```bash
git add src/components/StackChips.vue
git commit -m "feat: add StackChips section with grouped tech badges"
```

---

### Task 10: Experience Timeline

**Files:**
- Create: `src/components/ExperienceEntry.vue`
- Create: `src/components/ExperienceTimeline.vue`

- [ ] **Step 1: Create ExperienceEntry**

Expandable entry with click-to-toggle. Shows role + company + dates when collapsed. Expands to show translated description + tech chips. Uses ChipTag. Timeline node circle on left.

- [ ] **Step 2: Create ExperienceTimeline**

Vertical timeline container with accent-colored left line, section heading, maps experience data to ExperienceEntry components.

- [ ] **Step 3: Commit**

```bash
git add src/components/ExperienceEntry.vue src/components/ExperienceTimeline.vue
git commit -m "feat: add expandable Experience timeline section"
```

---

### Task 11: Projects Grid

**Files:**
- Create: `src/components/ProjectCard.vue`
- Create: `src/components/ProjectsGrid.vue`

- [ ] **Step 1: Create ProjectCard**

Card with project name (Syne), translated description, tech chips, GitHub link. Hover: translateY(-4px) + accent border glow.

- [ ] **Step 2: Create ProjectsGrid**

3-column grid desktop, 1 mobile. Section heading + maps projects data to ProjectCard.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.vue src/components/ProjectsGrid.vue
git commit -m "feat: add Projects grid with hover-animated cards"
```

---

### Task 12: Certifications Grid

**Files:**
- Create: `src/components/CertBadge.vue`
- Create: `src/components/CertsGrid.vue`

- [ ] **Step 1: Create CertBadge**

Compact card with cert name, date, platform-colored border.

- [ ] **Step 2: Create CertsGrid**

Grid grouped by platform. Section heading. Maps certifications data to CertBadge.

- [ ] **Step 3: Commit**

```bash
git add src/components/CertBadge.vue src/components/CertsGrid.vue
git commit -m "feat: add Certifications grid with platform-colored badges"
```

---

### Task 13: Contact Section

**Files:**
- Create: `src/components/ContactSection.vue`

- [ ] **Step 1: Create ContactSection**

Minimal section: translated heading, large email (click to copy via navigator.clipboard, triggers ToastNotification), GitHub link, LinkedIn link, location text.

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "feat: add Contact section with copy-to-clipboard email"
```

---

### Task 14: Assemble HomePage + App

**Files:**
- Modify: `src/pages/HomePage.vue`
- Modify: `src/App.vue`

- [ ] **Step 1: Update HomePage to assemble all sections**

Import and render: NavBar, HeroSection, StackChips, ExperienceTimeline, ProjectsGrid, CertsGrid, ContactSection. Each section wrapped with `reveal` class. Call useScrollReveal().

- [ ] **Step 2: Verify full page renders**

Run: `bun run dev` — all sections visible, dark mode, typewriter works, expand entries, switch locale, toggle theme, copy email.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.vue src/App.vue
git commit -m "feat: assemble HomePage with all sections and scroll reveal"
```

---

### Task 15: GitHub Actions Deploy + Final

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create deploy workflow**

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

- [ ] **Step 2: Verify build succeeds**

Run: `bun run build` — should output to `dist/`

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions workflow for Pages deployment"
```

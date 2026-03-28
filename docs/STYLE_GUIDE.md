# salvamiguel.com - Design System & Style Guide

Reference document for building subpages and subapplications with a consistent visual identity.

---

## 1. Design Philosophy

**Concept:** Editorial tecnico de alto contraste. Inspired by engineering publications and high-level documentation, not designer portfolios. The goal is to project technical credibility — someone who designs architectures and also codes.

**Principles:**
- Clean, high-contrast layouts with generous whitespace
- Monospace typography for technical elements, geometric sans-serif for headings
- No decorative gradients, stock photos, or skill progress bars
- Subtle animations that respect `prefers-reduced-motion`
- Dark mode by default with a polished light mode alternative

---

## 2. Color Palette

### Core Tokens

| Token | CSS Variable | Dark Mode | Light Mode | Tailwind Class |
|-------|-------------|-----------|------------|----------------|
| Background | `--color-bg` | `#0D0D0D` | `#F5F3EE` | `bg-bg` |
| Text | `--color-text` | `#F0EDE8` | `#0D0D0D` | `text-text` |
| Accent | `--color-accent` | `#4AFFA0` | `#00A35C` | `text-accent`, `bg-accent` |
| Surface | `--color-surface` | `#1A1A1A` | `#FFFFFF` | `bg-surface` |
| Accent Secondary | `--color-accent-secondary` | `#00A35C` | `#00A35C` | `text-accent-secondary` |

### Opacity Variants (via Tailwind)

Use Tailwind's opacity modifier syntax for text hierarchy:

| Purpose | Class | Example |
|---------|-------|---------|
| Primary text | `text-text` | Headings, body |
| Secondary text | `text-text/70` | Subtitles, secondary names |
| Tertiary text | `text-text/60` | Descriptions, paragraphs |
| Muted text | `text-text/40` | Dates, labels, metadata |
| Ghost text | `text-text/30` | Dividers, separators |
| Near-invisible | `text-text/20` | Copyright, fine print |

### Category Colors (for chips, badges, and groupings)

| Category | Border/Text Color | Background (10% opacity) | Usage |
|----------|------------------|-------------------------|-------|
| Cloud | `#60A5FA` | `rgba(96,165,250,0.1)` | AWS, GCP, Azure |
| IaC / DevOps | `#4AFFA0` | `rgba(74,255,160,0.1)` | Terraform, Ansible, etc. |
| Languages | `#D1D5DB` | `rgba(209,213,219,0.1)` | Python, TypeScript, etc. |
| AI | `#FBBF24` | `rgba(251,191,36,0.1)` | Azure OpenAI, etc. |
| Teaching | `#F87171` | `rgba(248,113,113,0.1)` | Courses, workshops |

### Platform Colors (for certification badges)

| Platform | Border Color | Usage |
|----------|-------------|-------|
| AWS | `#FF9900` | AWS certifications |
| Azure | `#0078D4` | Microsoft certifications |
| GitHub | `#8B949E` | GitHub certifications |
| UPV / Other | `#6B7280` | Academic certifications |

### Terminal Colors (fixed, theme-independent)

| Element | Color | Usage |
|---------|-------|-------|
| Terminal background | `#111111` | Terminal block bg |
| Command text | `#E0E0E0` | User-typed commands |
| Output text | `#A0A0A0` | Terminal output |
| Prompt/cursor | `var(--color-accent)` | `$` prompt and cursor |
| Traffic light red | `#FF5F56` | Window dot |
| Traffic light yellow | `#FFBD2E` | Window dot |
| Traffic light green | `#27C93F` | Window dot |

---

## 3. Typography

### Font Stack

| Role | Font Family | Google Fonts | CSS Variable | Tailwind Class |
|------|------------|-------------|-------------|----------------|
| Display / Headings | Syne | `Syne:wght@700;800` | `--font-display` | `font-display` |
| Monospace / Labels | JetBrains Mono | `JetBrains+Mono:wght@400;500` | `--font-mono` | `font-mono` |
| Body / Paragraphs | Inter | `Inter:wght@400;500;600` | `--font-body` | `font-body` |

### Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
```

### Type Scale

| Element | Font | Size | Weight | Tailwind Classes |
|---------|------|------|--------|-----------------|
| Page title (h1) | Syne | 60px / 48px mobile | 800 | `font-display text-5xl lg:text-6xl font-extrabold` |
| Section title (h2) | Syne | 36px / 30px mobile | 700 | `font-display text-3xl lg:text-4xl font-bold` |
| Card title (h3) | Syne | 20px | 700 | `font-display text-xl font-bold` |
| Subtitle | Syne | 24px / 20px mobile | 700 | `font-display text-xl lg:text-2xl font-bold` |
| Body text | Inter | 14px | 400 | `text-sm` (default font-body) |
| Body large | Inter | 16px | 400 | `text-base` |
| Section number | JetBrains Mono | 14px | 400 | `font-mono text-sm text-accent` |
| Chip / Tag | JetBrains Mono | 11px | 400 | `font-mono text-[11px]` |
| Label / Date | JetBrains Mono | 12px | 400 | `font-mono text-xs` |
| Micro label | JetBrains Mono | 10px | 400 | `font-mono text-[10px] uppercase tracking-widest` |
| Nav links | JetBrains Mono | 12px | 400 | `font-mono text-xs uppercase tracking-wider` |

---

## 4. Spacing & Layout

### Container

- Max width: `max-w-6xl` (1152px) for full-width sections
- Narrow container: `max-w-4xl` (896px) for text-heavy sections (experience, etc.)
- Horizontal padding: `px-6` (24px) on all sections
- Centered: `mx-auto`

### Section Spacing

- Between sections: `py-20` (80px top and bottom)
- Section heading to content: `mb-12` (48px)

### Grid System

- Desktop (>=1024px): `grid-cols-3` for cards, `grid-cols-2` for hero
- Tablet (>=768px): `grid-cols-2`
- Mobile: `grid-cols-1`
- Gap: `gap-6` (24px) for card grids, `gap-12 lg:gap-16` for hero

### Breakpoints (Tailwind defaults)

| Name | Min-width | Usage |
|------|-----------|-------|
| `sm` | 640px | Minor adjustments |
| `md` | 768px | 2-column grids |
| `lg` | 1024px | 3-column grids, desktop nav, hero 2-col |

---

## 5. Component Patterns

### Cards

```
bg-surface border border-surface rounded-lg p-6
hover:-translate-y-1 hover:border-accent/40
hover:shadow-lg hover:shadow-accent/5
transition-all duration-300
```

- Background: `bg-surface`
- Border: `border-surface` (invisible), becomes `border-accent/40` on hover
- Radius: `rounded-lg` (8px)
- Padding: `p-6` (24px)
- Hover: lift 4px + accent border glow + subtle shadow

### Chips / Tags

```
font-mono text-[11px] px-2 py-0.5 rounded border
```

- Font: JetBrains Mono, 11px
- Padding: 8px horizontal, 2px vertical
- Border: 1px solid `[category-color]`
- Background: `[category-color]` at 10% opacity
- Border radius: `rounded` (4px)

### Buttons

**Primary (filled):**
```
bg-accent text-[#0D0D0D] font-mono text-sm font-medium
px-5 py-2.5 rounded-lg
hover:bg-accent/90 transition-colors
```

**Secondary (outline):**
```
border border-accent/30 text-accent font-mono text-sm
px-5 py-2.5 rounded-lg
hover:bg-accent/10 transition-colors
```

### Navbar

```
fixed top-0 z-50 w-full
bg-bg/80 backdrop-blur-xl border-b border-surface
```

- Fixed position, blurred semi-transparent background
- Logo: `font-display text-xl font-extrabold text-accent`
- Links: `font-mono text-xs uppercase tracking-wider text-text/60 hover:text-accent`

### Timeline

- Vertical line: `border-l-2 border-accent/20`
- Nodes: `w-3 h-3 rounded-full border-2 border-accent bg-bg`
- Node hover: fills with `bg-accent`
- Content padding-left: `pl-8` from the line

### Badge Cards (certifications)

```
bg-surface rounded-lg p-4 border-l-4
```

- Left border: 4px, colored by platform (`borderColor`)
- Badge image: 56x56px (`w-14 h-14`)
- Fallback: text placeholder with platform initials

---

## 6. Dark Mode Texture

Dark mode applies a subtle noise overlay to avoid flat black:

```css
.dark body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* feTurbulence SVG */
  background-repeat: repeat;
  background-size: 256px;
}
```

Light mode has no texture — clean `#F5F3EE` background.

---

## 7. Animations & Transitions

### Scroll Reveal

Elements with `.reveal` class start hidden and fade in when scrolled into view:

```css
.reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.revealed { opacity: 1; transform: translateY(0); }
```

Triggered by `IntersectionObserver` with `threshold: 0.1`.

### Hover Transitions

- All interactive elements: `transition-colors` (150ms default)
- Cards: `transition-all duration-300` (for transform + border + shadow)

### Cursor Blink

```css
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.cursor-blink { animation: blink 1s step-end infinite; }
```

### Typewriter Cursor

```css
.typewriter-cursor {
  display: inline-block; width: 2px; height: 1.2em;
  background-color: var(--color-accent);
  animation: blink 1s step-end infinite;
}
```

### Reduced Motion

All animations and transitions are disabled when `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  .reveal { opacity: 1; transform: none; }
}
```

---

## 8. Accessibility

- All icon-only buttons require `aria-label`
- Contrast ratios (AA compliant):
  - `#F0EDE8` on `#0D0D0D` = 16.3:1
  - `#4AFFA0` on `#0D0D0D` = 11.8:1
  - `#0D0D0D` on `#F5F3EE` = 15.2:1
  - `#00A35C` on `#F5F3EE` = 4.6:1
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`
- Keyboard-navigable interactive elements
- `prefers-reduced-motion` respected globally

---

## 9. Iconography

No icon library. All icons are inline SVGs:

- **Size:** 18px for nav icons, 20px for social icons, 14px for inline icons
- **Style:** Stroke-based (2px stroke, round caps) for UI icons; fill-based for brand icons (GitHub, LinkedIn)
- **Color:** `currentColor` to inherit from parent text color

---

## 10. Theme Toggling

- Class strategy: `.dark` on `<html>` element
- Persistence: `localStorage.getItem('theme')`
- Fallback: `window.matchMedia('(prefers-color-scheme: light)')`
- Transition: `background-color 0.3s, color 0.3s` on `body`

### For subpages/subapps

To adopt this theme system:

1. Import the same `style.css` (or copy the `@theme` block and base styles)
2. Load the three Google Fonts in your HTML `<head>`
3. Apply `.dark` class on `<html>` based on `localStorage.getItem('theme')`
4. Use Tailwind's custom color classes: `bg-bg`, `text-text`, `bg-surface`, `text-accent`, `bg-accent`

---

## 11. Locale Toggling

- Two languages: ES (default), EN
- Persistence: `localStorage.getItem('locale')`
- Fallback: `navigator.language` (es* -> es, else en)
- Library: `vue-i18n` with `legacy: false`

### For subpages/subapps

Read locale from `localStorage.getItem('locale')` to stay consistent with the main page selection.

---

## 12. File Organization Pattern

```
src/
  components/          # Vue SFC components
    ui/                # Reusable primitives (ChipTag, ThemeToggle, etc.)
    [Feature].vue      # Feature-specific components
  composables/         # Reactive logic (useTheme, useTypewriter, etc.)
  data/                # Typed static data arrays
  i18n/                # Locale files and i18n config
    locales/
      es.json
      en.json
  pages/               # Route-level page components
  router/              # Vue Router config
```

---

## 13. Quick Reference: Building a New Subpage

1. **Create** `src/pages/NewPage.vue`
2. **Add route** in `src/router/index.ts`
3. **Reuse** `NavBar`, `ThemeToggle`, `LocaleToggle`, `ChipTag` from existing components
4. **Follow** the type scale, color tokens, and spacing from this guide
5. **Wrap sections** in `.reveal` for scroll animations
6. **Test** both dark and light modes
7. **Test** both ES and EN locales
8. **Verify** `prefers-reduced-motion` disables animations

### Tailwind Classes Cheat Sheet

```
/* Page background */       bg-bg
/* Card/surface */          bg-surface
/* Primary text */          text-text
/* Accent color */          text-accent / bg-accent
/* Display heading */       font-display text-3xl font-bold
/* Mono label */            font-mono text-xs
/* Body text */             text-sm text-text/60
/* Section container */     max-w-6xl mx-auto px-6 py-20
/* Card */                  bg-surface rounded-lg p-6 border border-surface
/* Primary button */        bg-accent text-[#0D0D0D] font-mono text-sm px-5 py-2.5 rounded-lg
/* Outline button */        border border-accent/30 text-accent font-mono text-sm px-5 py-2.5 rounded-lg
/* Chip */                  font-mono text-[11px] px-2 py-0.5 rounded border
```

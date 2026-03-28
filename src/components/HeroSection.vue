<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useTypewriter } from '@/composables/useTypewriter'
import TerminalBlock from './TerminalBlock.vue'

const { t, tm } = useI18n()

const taglines = computed(() => {
  const raw = tm('hero.taglines')
  return Array.isArray(raw) ? raw.map(String) : []
})
const { text } = useTypewriter(taglines.value)
</script>

<template>
  <section id="about" class="min-h-screen flex items-center py-20 px-6">
    <div class="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- Left column: Text -->
      <div class="space-y-6">
        <div>
          <h1 class="font-display text-5xl lg:text-6xl font-extrabold leading-tight text-text">
            Salvador Miguel<br />
            <span class="text-text/70">Manzanera Hernandez</span>
          </h1>
          <div class="mt-4 flex items-center gap-3">
            <span class="font-display text-xl lg:text-2xl font-bold text-accent">{{ t('hero.title') }}</span>
            <span class="flex-1 h-px bg-accent/30"></span>
          </div>
        </div>

        <!-- Typewriter tagline -->
        <p class="font-mono text-sm lg:text-base text-text/60 h-8">
          {{ text }}<span class="typewriter-cursor"></span>
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap gap-4 pt-2">
          <a
            href="#projects"
            @click.prevent="document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-[#0D0D0D] font-mono text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
          >
            &rarr; {{ t('hero.cta_projects') }}
          </a>
          <a
            href="#"
            class="inline-flex items-center gap-2 px-5 py-2.5 border border-accent/30 text-accent font-mono text-sm rounded-lg hover:bg-accent/10 transition-colors"
          >
            &darr; {{ t('hero.cta_cv') }}
          </a>
        </div>

        <!-- Social links -->
        <div class="flex items-center gap-4 pt-2">
          <a href="https://github.com/salvamiguel" target="_blank" rel="noopener" aria-label="GitHub" class="text-text/50 hover:text-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://linkedin.com/in/salvamiguel" target="_blank" rel="noopener" aria-label="LinkedIn" class="text-text/50 hover:text-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>

      <!-- Right column: Terminal -->
      <div class="hidden lg:block">
        <TerminalBlock />
      </div>
    </div>
  </section>
</template>

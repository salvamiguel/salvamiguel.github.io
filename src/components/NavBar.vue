<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LocaleToggle from '@/components/ui/LocaleToggle.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

const { t } = useI18n()
const menuOpen = ref<boolean>(false)

const navLinks = [
  { href: '#about',      labelKey: 'nav.about' },
  { href: '#experience', labelKey: 'nav.experience' },
  { href: '#projects',   labelKey: 'nav.projects' },
  { href: '#certs',      labelKey: 'nav.certs' },
  { href: '#contact',    labelKey: 'nav.contact' },
]

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

function handleNavClick(href: string) {
  menuOpen.value = false
  scrollTo(href)
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <!-- Fixed navbar -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-surface">
    <div class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

      <!-- Logo -->
      <a
        href="#"
        @click.prevent="scrollToTop"
        class="font-display text-xl font-extrabold text-accent"
      >SM</a>

      <!-- Desktop nav (lg+) -->
      <nav class="hidden lg:flex items-center gap-6">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click.prevent="scrollTo(link.href)"
          class="font-mono text-xs uppercase tracking-wider text-text/60 hover:text-accent transition-colors"
        >{{ t(link.labelKey) }}</a>

        <div class="flex items-center gap-2 ml-2">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </nav>

      <!-- Mobile hamburger button -->
      <button
        class="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
        aria-label="Open navigation menu"
        @click="menuOpen = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>
  </header>

  <!-- Mobile overlay panel -->
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-40 bg-bg flex flex-col lg:hidden"
    >
      <!-- Close button -->
      <div class="flex justify-end px-6 pt-4">
        <button
          class="p-2 rounded-lg hover:bg-surface transition-colors"
          aria-label="Close navigation menu"
          @click="menuOpen = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- Mobile nav links -->
      <nav class="flex-1 flex flex-col items-center justify-center gap-8">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click.prevent="handleNavClick(link.href)"
          class="font-mono text-lg uppercase tracking-wider text-text/60 hover:text-accent transition-colors"
        >{{ t(link.labelKey) }}</a>
      </nav>

      <!-- Mobile bottom controls -->
      <div class="flex items-center justify-center gap-4 pb-10">
        <LocaleToggle />
        <ThemeToggle />
      </div>
    </div>
  </Transition>
</template>

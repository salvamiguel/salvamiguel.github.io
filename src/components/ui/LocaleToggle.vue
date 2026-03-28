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

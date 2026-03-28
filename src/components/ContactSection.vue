<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ToastNotification from './ui/ToastNotification.vue'

const { t } = useI18n()
const showToast = ref(false)
const email = 'salva@salvamiguel.com'

async function copyEmail() {
  await navigator.clipboard.writeText(email)
  showToast.value = true
}
</script>

<template>
  <section id="contact" class="py-20 px-6">
    <div class="max-w-4xl mx-auto text-center space-y-8">
      <h2 class="font-display text-3xl lg:text-4xl font-bold text-text">
        {{ t('contact.title') }}
      </h2>

      <button
        @click="copyEmail"
        class="font-mono text-2xl lg:text-3xl text-accent hover:text-accent/80 transition-colors cursor-pointer"
        aria-label="Copy email to clipboard"
      >
        {{ email }}
      </button>

      <div class="flex justify-center items-center gap-6 text-text/50">
        <a href="https://github.com/salvamiguel" target="_blank" rel="noopener" class="hover:text-accent transition-colors font-mono text-sm">GitHub</a>
        <span class="text-text/20">|</span>
        <a href="https://linkedin.com/in/salvamiguel" target="_blank" rel="noopener" class="hover:text-accent transition-colors font-mono text-sm">LinkedIn</a>
      </div>

      <p class="font-mono text-xs text-text/30">{{ t('contact.location') }}</p>
    </div>
  </section>

  <ToastNotification
    :message="t('contact.copied')"
    :visible="showToast"
    @hide="showToast = false"
  />
</template>

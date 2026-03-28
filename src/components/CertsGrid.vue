<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CertBadge from './CertBadge.vue'
import { certifications } from '@/data/certs'

const { t } = useI18n()
</script>

<template>
  <section id="certs" class="py-20 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="font-display text-3xl lg:text-4xl font-bold text-text mb-12">
        <span class="font-mono text-sm text-accent mr-3">05</span>
        {{ t('certs.title') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CertBadge
          v-for="cert in certifications"
          :key="cert.name"
          :cert="cert"
        />
      </div>
    </div>
  </section>
</template>

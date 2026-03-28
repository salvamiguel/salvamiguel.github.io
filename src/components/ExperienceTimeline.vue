<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ExperienceEntry from './ExperienceEntry.vue'
import { experience } from '@/data/experience'

const { t } = useI18n()
</script>

<template>
  <section id="experience" class="py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <h2 class="font-display text-3xl lg:text-4xl font-bold text-text mb-12">
        <span class="font-mono text-sm text-accent mr-3">03</span>
        {{ t('experience.title') }}
      </h2>

      <!-- Timeline line -->
      <div class="relative border-l-2 border-accent/20 ml-1.5">
        <ExperienceEntry
          v-for="entry in experience"
          :key="entry.id"
          :entry="entry"
        />
      </div>
    </div>
  </section>
</template>

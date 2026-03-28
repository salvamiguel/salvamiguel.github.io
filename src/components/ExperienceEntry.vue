<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ChipTag from './ui/ChipTag.vue'
import type { ExperienceEntry } from '@/data/experience'

const props = defineProps<{ entry: ExperienceEntry }>()
const { t } = useI18n()
const expanded = ref(false)

const dateRange = props.entry.dateEnd
  ? `${props.entry.dateStart} — ${props.entry.dateEnd}`
  : `${props.entry.dateStart} — ${t('experience.present')}`
</script>

<template>
  <div class="relative pl-8 pb-8 group">
    <!-- Timeline node -->
    <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-bg z-10 group-hover:bg-accent transition-colors"></div>

    <!-- Content -->
    <button
      @click="expanded = !expanded"
      class="w-full text-left focus:outline-none"
      :aria-expanded="expanded"
    >
      <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
        <h3 class="font-display text-lg font-bold text-text">{{ entry.role }}</h3>
        <span class="font-mono text-xs text-accent">{{ entry.company }}</span>
        <span v-if="entry.parallel" class="font-mono text-[10px] text-text/40 uppercase">({{ t('experience.parallel') }})</span>
      </div>
      <p class="font-mono text-xs text-text/40 mt-1">{{ dateRange }}</p>

      <!-- Expand indicator -->
      <svg
        class="w-4 h-4 text-text/30 mt-2 transition-transform"
        :class="{ 'rotate-180': expanded }"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Expanded content -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-96 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-96 opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-show="expanded" class="overflow-hidden">
        <p class="text-sm text-text/60 mt-3 leading-relaxed">{{ t(entry.descriptionKey) }}</p>
        <div class="flex flex-wrap gap-2 mt-3">
          <ChipTag v-for="chip in entry.chips" :key="chip" :label="chip" />
        </div>
      </div>
    </Transition>
  </div>
</template>

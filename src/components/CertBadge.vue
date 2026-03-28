<script setup lang="ts">
import type { Certification } from '@/data/certs'

defineProps<{ cert: Certification }>()
</script>

<template>
  <div
    class="bg-surface rounded-lg p-4 border-l-4 transition-colors"
    :style="{ borderLeftColor: cert.borderColor }"
  >
    <div class="flex items-start gap-3">
      <img
        v-if="cert.badge"
        :src="cert.badge"
        :alt="cert.name"
        class="w-14 h-14 shrink-0 object-contain"
      />
      <div
        v-else
        class="w-14 h-14 shrink-0 rounded bg-surface flex items-center justify-center font-mono text-[10px] text-text/30 uppercase"
      >{{ cert.platform }}</div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-text leading-snug">{{ cert.name }}</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="font-mono text-[10px] text-text/40 uppercase">{{ cert.platform }}</span>
          <span class="font-mono text-[10px] text-text/40">{{ cert.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

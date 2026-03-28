<script setup lang="ts">
import type { Certification } from '@/data/certs'

defineProps<{ cert: Certification }>()
</script>

<template>
  <div
    class="bg-surface rounded-lg p-4 border-l-4 transition-colors"
    :style="{ borderLeftColor: cert.borderColor }"
  >
    <div class="flex items-start justify-between gap-2">
      <div>
        <p class="text-sm font-medium text-text leading-snug">{{ cert.name }}</p>
        <p class="font-mono text-[10px] text-text/40 mt-1 uppercase">{{ cert.platform }}</p>
      </div>
      <span class="font-mono text-[10px] text-text/40 whitespace-nowrap shrink-0">{{ cert.date }}</span>
    </div>
  </div>
</template>

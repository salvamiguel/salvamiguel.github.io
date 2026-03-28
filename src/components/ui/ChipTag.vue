<script setup lang="ts">
defineProps<{
  label: string
  color?: string
  bgColor?: string
}>()
</script>

<template>
  <span
    class="inline-block font-mono text-[11px] px-2 py-0.5 rounded border"
    :style="{
      borderColor: color || 'currentColor',
      backgroundColor: bgColor || 'transparent',
      color: color || 'currentColor',
    }"
  >{{ label }}</span>
</template>

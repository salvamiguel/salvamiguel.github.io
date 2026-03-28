<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{ message: string; visible: boolean }>()
const emit = defineEmits<{ hide: [] }>()

watch(() => props.visible, (val) => {
  if (val) {
    setTimeout(() => emit('hide'), 2000)
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-4 opacity-0"
  >
    <div
      v-if="visible"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-accent text-[#0D0D0D] font-mono text-sm px-4 py-2 rounded-lg shadow-lg z-50"
    >
      {{ message }}
    </div>
  </Transition>
</template>

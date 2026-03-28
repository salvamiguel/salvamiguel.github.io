<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ChipTag from './ui/ChipTag.vue'
import { skillGroups } from '@/data/skills'

const { t } = useI18n()
</script>

<template>
  <section class="py-12 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-wrap gap-8">
        <div v-for="group in skillGroups" :key="group.labelKey" class="space-y-2">
          <span class="font-mono text-[10px] uppercase tracking-widest text-text/40">{{ t(group.labelKey) }}</span>
          <div class="flex flex-wrap gap-2">
            <ChipTag
              v-for="item in group.items"
              :key="item"
              :label="item"
              :color="group.color"
              :bg-color="group.bgColor"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

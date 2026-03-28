<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ProjectCard from './ProjectCard.vue'
import { projects } from '@/data/projects'

const { t } = useI18n()
</script>

<template>
  <section id="projects" class="py-20 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="font-display text-3xl lg:text-4xl font-bold text-text mb-12">
        <span class="font-mono text-sm text-accent mr-3">04</span>
        {{ t('projects.title') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in projects"
          :key="project.name"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

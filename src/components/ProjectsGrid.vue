<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ProjectCard from './ProjectCard.vue'
import { useGithubProjects } from '@/composables/useGithubProjects'

const { t } = useI18n()
const { projects, loading, error } = useGithubProjects()
</script>

<template>
  <section id="projects" class="py-20 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="font-display text-3xl lg:text-4xl font-bold text-text mb-12">
        <span class="font-mono text-sm text-accent mr-3">04</span>
        {{ t('projects.title') }}
      </h2>

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="bg-surface rounded-lg p-6 animate-pulse">
          <div class="h-6 bg-text/5 rounded w-2/3 mb-3"></div>
          <div class="h-4 bg-text/5 rounded w-full mb-2"></div>
          <div class="h-4 bg-text/5 rounded w-3/4 mb-4"></div>
          <div class="flex gap-2">
            <div class="h-5 bg-text/5 rounded w-16"></div>
            <div class="h-5 bg-text/5 rounded w-12"></div>
          </div>
        </div>
      </div>

      <!-- Error state -->
      <p v-else-if="error" class="font-mono text-sm text-text/40">
        Failed to load projects from GitHub.
      </p>

      <!-- Empty state -->
      <p v-else-if="projects.length === 0" class="font-mono text-sm text-text/40">
        No projects found.
      </p>

      <!-- Projects grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in projects"
          :key="project.html_url"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

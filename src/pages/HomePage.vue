<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import StackChips from '@/components/StackChips.vue'
import ExperienceTimeline from '@/components/ExperienceTimeline.vue'
import ProjectsGrid from '@/components/ProjectsGrid.vue'
import CertsGrid from '@/components/CertsGrid.vue'
import ContactSection from '@/components/ContactSection.vue'

useScrollReveal()
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <div class="reveal">
      <StackChips />
    </div>
    <div class="reveal">
      <ExperienceTimeline />
    </div>
    <div class="reveal">
      <ProjectsGrid />
    </div>
    <div class="reveal">
      <CertsGrid />
    </div>
    <div class="reveal">
      <ContactSection />
    </div>
  </main>
  <footer class="py-8 px-6 text-center">
    <p class="font-mono text-xs text-text/20">&copy; 2026 Salvador Miguel Manzanera Hernandez</p>
  </footer>
</template>

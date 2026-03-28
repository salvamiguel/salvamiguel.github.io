import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer: IntersectionObserver | null = null

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  onMounted(() => {
    const elements = document.querySelectorAll('.reveal')

    if (prefersReduced) {
      elements.forEach(el => el.classList.add('revealed'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach(el => observer!.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}

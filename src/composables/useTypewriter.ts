import { ref, onMounted, onUnmounted } from 'vue'

export function useTypewriter(phrases: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const text = ref('')
  const isDeleting = ref(false)
  let phraseIndex = 0
  let charIndex = 0
  let timeout: ReturnType<typeof setTimeout> | null = null

  function tick() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting.value) {
      charIndex--
      text.value = currentPhrase.substring(0, charIndex)
      if (charIndex === 0) {
        isDeleting.value = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        timeout = setTimeout(tick, 400)
        return
      }
      timeout = setTimeout(tick, deletingSpeed)
    } else {
      charIndex++
      text.value = currentPhrase.substring(0, charIndex)
      if (charIndex === currentPhrase.length) {
        isDeleting.value = true
        timeout = setTimeout(tick, pauseTime)
        return
      }
      timeout = setTimeout(tick, typingSpeed)
    }
  }

  onMounted(() => tick())
  onUnmounted(() => { if (timeout) clearTimeout(timeout) })

  return { text, isDeleting }
}

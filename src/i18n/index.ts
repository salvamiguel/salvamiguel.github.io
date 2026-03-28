import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

function detectLocale(): string {
  const stored = localStorage.getItem('locale')
  if (stored) return stored
  const nav = navigator.language || ''
  return nav.startsWith('es') ? 'es' : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { es, en },
})

export default i18n

import { ref, onMounted } from 'vue'

export interface GithubProject {
  name: string
  description: string
  topics: string[]
  html_url: string
  stargazers_count: number
}

const GITHUB_USER = 'salvamiguel'
const TOPIC_FILTER = 'personal-page'

export function useGithubProjects() {
  const projects = ref<GithubProject[]>([])
  const loading = ref(true)
  const error = ref(false)

  onMounted(async () => {
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=user:${GITHUB_USER}+topic:${TOPIC_FILTER}&sort=stars&order=desc`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      )
      if (!res.ok) throw new Error(`GitHub API ${res.status}`)
      const data = await res.json()
      projects.value = data.items.map((repo: any) => ({
        name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
        description: repo.description || '',
        topics: repo.topics?.filter((t: string) => t !== TOPIC_FILTER) || [],
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
      }))
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  })

  return { projects, loading, error }
}

export interface SkillGroup {
  labelKey: string
  color: string
  bgColor: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    labelKey: 'stack.cloud',
    color: '#60A5FA',
    bgColor: 'rgba(96,165,250,0.1)',
    items: ['AWS', 'Google Cloud', 'Azure'],
  },
  {
    labelKey: 'stack.iac',
    color: '#4AFFA0',
    bgColor: 'rgba(74,255,160,0.1)',
    items: ['Terraform', 'Ansible', 'Crossplane', 'GitHub Actions'],
  },
  {
    labelKey: 'stack.languages',
    color: '#D1D5DB',
    bgColor: 'rgba(209,213,219,0.1)',
    items: ['Python', 'TypeScript', 'PHP', 'SQL', 'Vue.js'],
  },
  {
    labelKey: 'stack.ai',
    color: '#FBBF24',
    bgColor: 'rgba(251,191,36,0.1)',
    items: ['Azure OpenAI', 'AWS AI Practitioner'],
  },
  {
    labelKey: 'stack.teaching',
    color: '#F87171',
    bgColor: 'rgba(248,113,113,0.1)',
    items: ['Multicloud', 'AI Systems'],
  },
]

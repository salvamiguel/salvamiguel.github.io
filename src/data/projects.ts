export interface Project {
  name: string
  descriptionKey: string
  chips: string[]
  github: string
}

export const projects: Project[] = [
  {
    name: 'Twitter Sentiment',
    descriptionKey: 'projects.twitter',
    chips: ['Python', 'NLP', 'Data Analysis'],
    github: 'https://github.com/salvamiguel',
  },
  {
    name: 'Viviendea Match',
    descriptionKey: 'projects.viviendea',
    chips: ['Python', 'Algorithm Design', 'Real Estate'],
    github: 'https://github.com/salvamiguel',
  },
  {
    name: 'Crossplane Workshop',
    descriptionKey: 'projects.crossplane',
    chips: ['Crossplane', 'GitOps', 'IaC', 'Kubernetes'],
    github: 'https://github.com/salvamiguel',
  },
]

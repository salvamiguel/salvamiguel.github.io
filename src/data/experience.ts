export interface ExperienceEntry {
  id: string
  role: string
  company: string
  dateStart: string
  dateEnd: string
  descriptionKey: string
  chips: string[]
  parallel?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    id: 'ntt_expert',
    role: 'Expert Architect',
    company: 'NTT Data',
    dateStart: 'Sep 2025',
    dateEnd: '',
    descriptionKey: 'experience.entries.ntt_expert',
    chips: ['Terraform', 'Ansible', 'AWS', 'Azure', 'Crossplane'],
  },
  {
    id: 'ntt_lead',
    role: 'Lead Architect',
    company: 'NTT Data',
    dateStart: 'Feb 2024',
    dateEnd: 'Sep 2025',
    descriptionKey: 'experience.entries.ntt_lead',
    chips: ['AWS', 'GitHub Actions', 'CodeBuild', 'Terraform', 'COBOL'],
  },
  {
    id: 'profesor',
    role: 'Profesor',
    company: 'Universidad Europea de Valencia',
    dateStart: 'Nov 2024',
    dateEnd: '',
    descriptionKey: 'experience.entries.profesor',
    chips: ['AWS', 'Azure', 'AI-900', 'DP-900'],
    parallel: true,
  },
  {
    id: 'cto',
    role: 'CTO',
    company: 'Viviendea',
    dateStart: 'Jan 2022',
    dateEnd: 'Jan 2024',
    descriptionKey: 'experience.entries.cto',
    chips: ['Azure OpenAI', 'AWS', 'Power BI', 'Docker', 'Agile'],
  },
  {
    id: 'fullstack',
    role: 'Junior Full Stack Developer',
    company: 'Viviendea',
    dateStart: 'Nov 2018',
    dateEnd: 'Jan 2022',
    descriptionKey: 'experience.entries.fullstack',
    chips: ['PHP', 'Vue.js', 'Laravel', 'GCP', 'AWS Lambda'],
  },
  {
    id: 'csharp',
    role: 'Junior C# Developer',
    company: 'COCOPLAN',
    dateStart: 'Nov 2017',
    dateEnd: 'Aug 2018',
    descriptionKey: 'experience.entries.csharp',
    chips: ['C#', '.NET', 'VBA', 'Power BI', 'MySQL'],
  },
]

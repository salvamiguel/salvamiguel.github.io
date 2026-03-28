export interface Certification {
  name: string
  date: string
  platform: string
  borderColor: string
}

export const certifications: Certification[] = [
  { name: 'AWS Certified Solutions Architect - Associate', date: 'Sep 2024', platform: 'AWS', borderColor: '#FF9900' },
  { name: 'AWS Certified AI Practitioner', date: 'Jan 2025', platform: 'AWS', borderColor: '#FF9900' },
  { name: 'Azure AI Fundamentals AI-900', date: 'Dec 2025', platform: 'Azure', borderColor: '#0078D4' },
  { name: 'Azure Data Fundamentals DP-900', date: 'Dec 2025', platform: 'Azure', borderColor: '#0078D4' },
  { name: 'GitHub Actions Certificate', date: 'Mar 2025', platform: 'GitHub', borderColor: '#8B949E' },
  { name: 'Machine Learning for Big Data Analytics', date: 'Jun 2018', platform: 'UPV', borderColor: '#6B7280' },
]

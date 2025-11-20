export interface DropdownOption {
  value: string
  label: string
}

export interface DropdownConfig {
  key: string
  label: string
  placeholder?: string
  options: DropdownOption[]
  colSpan?: string
}

export interface TextConfig {
  key: string
  label: string
  placeholder: string
  colSpan?: string
}

export const dropdownConfig: DropdownConfig[] = [
  {
    key: 'jobLevel',
    label: 'Job Level',
    placeholder: 'All Levels',
    options: [
      { value: 'entry', label: 'Entry Level' },
      { value: 'junior', label: 'Junior (1-2 years)' },
      { value: 'mid', label: 'Mid Level (3-5 years)' },
      { value: 'senior', label: 'Senior (5+ years)' },
      { value: 'lead', label: 'Team Lead' },
      { value: 'manager', label: 'Manager' },
      { value: 'director', label: 'Director' },
      { value: 'executive', label: 'Executive' },
    ],
  },
  {
    key: 'location',
    label: 'Location',
    placeholder: 'Anywhere',
    options: [
      { value: 'bangkok', label: 'Bangkok' },
      { value: 'nontaburi', label: 'Nontaburi' },
      { value: 'chiangmai', label: 'Chiang Mai' },
      { value: 'phuket', label: 'Phuket' },
      { value: 'pattaya', label: 'Pattaya' },
      { value: 'khonkaen', label: 'Khon Kaen' },
      { value: 'remote', label: 'Remote' },
      { value: 'hybrid', label: 'Hybrid' },
      { value: 'international', label: 'International' },
    ],
  },
  {
    key: 'jobType',
    label: 'Job Type',
    placeholder: 'All Types',
    options: [
      { value: 'full-time', label: 'Full-time' },
      { value: 'part-time', label: 'Part-time' },
      { value: 'contract', label: 'Contract' },
      { value: 'internship', label: 'Internship' },
      { value: 'freelance', label: 'Freelance' },
      { value: 'temporary', label: 'Temporary' },
    ],
  },
]

export const textConfig: TextConfig[] = [
  {
    key: 'role',
    label: 'Role',
    placeholder: 'Software Developer, QA, ...',
  },
  {
    key: 'tags',
    label: 'Skills & Tags',
    placeholder: 'React, Python, ...',
  },
  {
    key: 'company',
    label: 'Company',
    placeholder: 'Google, Apple, Microsoft, ...',
  },
]

export type FilterKeys = 'role' | 'tags' | 'company' | 'jobLevel' | 'location' | 'jobType'

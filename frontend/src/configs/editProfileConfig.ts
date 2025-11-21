export const EducationBaseFields = [
  { key: 'curriculumName', label: 'Curriculum Name', placeholder: 'e.g., Bachelor of Science' },
  { key: 'major', label: 'Major', placeholder: 'e.g., Computer Science' },
  { key: 'university', label: 'University', placeholder: 'e.g., University Name' },
]

export const OverviewFields = [
  { key: 'department', label: 'Department', placeholder: 'e.g., Computer Science' },
  { key: 'position', label: 'Academic Position', placeholder: 'e.g., Associate Professor' },
  { key: 'officeLocation', label: 'Office Location', placeholder: 'e.g., Building A, Room 301' },
  {
    key: 'researchInterest',
    label: 'Research Interest',
    placeholder: 'e.g., Machine Learning, AI',
  },
]

export const companySizeOptions = [
  'less than 100',
  '101 - 1,000',
  '1,001 - 10,000',
  'more than 10,000',
]

export const industryOptions = [
  'Software Development',
  'Cloud Computing & Infrastructure',
  'Artificial Intelligence & Machine Learning',
  'Cybersecurity',
  'Data Science & Analytics',
  'Semiconductor & Hardware',
  'Telecommunications',
  'Financial Technology (FinTech)',
  'Healthcare Technology (HealthTech)',
  'Gaming & Entertainment',
  'E-commerce & Retail Tech',
  'Education Technology (EdTech)',
  'Internet of Things (IoT)',
  'Automotive & Autonomous Vehicles',
  'Aerospace & Defense',
  'Blockchain & Cryptocurrency',
  'Robotics & Automation',
  'Enterprise Software (SaaS)',
  'Consulting & Professional Services',
  'Research & Development',
  'Other',
]

export type EducationFieldKey = 'curriculumName' | 'major' | 'university'
export type OverviewFieldKey = 'department' | 'position' | 'officeLocation' | 'researchInterest'

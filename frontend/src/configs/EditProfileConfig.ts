export const EducationBaseFields = [
  { key: 'curriculum_name', label: 'Curriculum Name', placeholder: 'e.g., Bachelor of Science' },
  { key: 'major', label: 'Major', placeholder: 'e.g., Computer Science' },
  { key: 'university', label: 'University', placeholder: 'e.g., University Name' }
]

export const OverviewFields = [
  { key: 'department', label: 'Department', placeholder: 'e.g., Computer Science' },
  { key: 'position', label: 'Academic Position', placeholder: 'e.g., Associate Professor' },
  { key: 'office_location', label: 'Office Location', placeholder: 'e.g., Building A, Room 301' },
  { key: 'research_interest', label: 'Research Interest', placeholder: 'e.g., Machine Learning, AI' }
]

export type EducationFieldKey = 'curriculum_name' | 'major' | 'university'
export type OverviewFieldKey = 'department' | 'position' | 'office_location' | 'research_interest'

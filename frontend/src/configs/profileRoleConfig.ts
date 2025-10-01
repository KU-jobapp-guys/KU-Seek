export interface ProfileColorSet {
  base: string
  border: string
  bar: string
}

export const profileConfig: Record<'student' | 'company', ProfileColorSet> = {
  student: {
    base: 'bg-gradient-to-b from-green-800/20 to-white',
    border: 'bg-gradient-to-b from-green-900 to-green-500',
    bar: 'bg-gradient-to-r from-green-600 to-green-800',
  },
  company: {
    base: 'bg-gradient-to-b from-blue-800/20 to-white',
    border: 'bg-gradient-to-b from-blue-900 to-blue-500',
    bar: 'bg-gradient-to-r from-blue-400 via-blue-800 to-purple-500',
  },
}

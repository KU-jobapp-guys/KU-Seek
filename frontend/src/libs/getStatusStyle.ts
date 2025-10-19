import { Check, CircleDotDashed, X } from 'lucide-vue-next'

export function getStatusColor(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'approved':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

export function getStatusIcon(status: string) {
  if (status === 'approved')
    return Check
  else if (status === 'pending')
    return CircleDotDashed
  else if (status === 'rejected') return X
}

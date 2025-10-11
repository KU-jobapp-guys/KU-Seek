export function isOwner(thisId?: string) {
  if (!thisId) return false

  const userId = localStorage.getItem('user_id')

  return thisId === userId
}

export function isOwner(thisId?: string) {
  if (!thisId) return false

  const userId = getUserId()

  return thisId === userId
}

export function getUserId() {
  return '1'
}

export function isOwner(thisId?: string) {
  if (!thisId) return false

  let userId = getUserId()

  return thisId === userId
}

export function getUserId() {
  return '1'
}

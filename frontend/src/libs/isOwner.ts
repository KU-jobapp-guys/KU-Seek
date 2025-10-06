export function isOwner(thisId?: string) {
  if (!thisId) return false

  // get this userId
  const userId = '1'

  return thisId === userId
}

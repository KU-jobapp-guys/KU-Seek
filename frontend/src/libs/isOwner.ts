export function isOwner(thisId?: string) {
  if (!thisId) return false

  // get this userId
  let userId = '1'

  return thisId === userId
}
export function isOwner(userId: string) {
  const thisId = userId
  const storedUserId = localStorage.getItem('userId')
  return storedUserId === thisId
}

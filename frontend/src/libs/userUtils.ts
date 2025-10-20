export function isOwner(userId: string) {
  const thisId = userId
  const storedUserId = localStorage.getItem('userId')
  return storedUserId === thisId
}

export function getUserId() {
  return localStorage.getItem('userId') || '1'
}

export function getUserRole() {
  return 'company'
}
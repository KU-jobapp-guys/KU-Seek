export function isOwner(userId: string) {
  const thisId = userId
  const storedUserId = getUserId()
  return storedUserId === thisId
}

export function getUserId() {
  return localStorage.getItem('user_id') || '1'
}

export function getUserRole() {
  return 'company'
}

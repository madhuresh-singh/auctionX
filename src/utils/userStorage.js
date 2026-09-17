const userStorageKey = 'auctionx-user'

export function getStoredUser() {
  try {
    const user = JSON.parse(window.localStorage.getItem(userStorageKey))
    return user?.id ? user : null
  } catch {
    return null
  }
}

export function saveUser(user) {
  window.localStorage.setItem(userStorageKey, JSON.stringify(user))
}

export function clearStoredUser() {
  window.localStorage.removeItem(userStorageKey)
}
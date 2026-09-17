import { apiBaseUrl } from './auctionApi'

export async function createOrFindUser(name, email) {
  const response = await fetch(`${apiBaseUrl}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  })
  const body = await response.json()

  if (!response.ok) throw new Error(body.error || 'Unable to create your account.')
  return body
}
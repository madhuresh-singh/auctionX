export const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '')

async function request(path, options) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.error || 'Unable to complete the request.')
  }

  return body
}

export function getAuction(auctionId) {
  return request(`/api/auctions/${auctionId}`)
}

export function getAuctions() {
  return request('/api/auctions')
}

export function getAuctionBids(auctionId) {
  return request(`/api/auctions/${auctionId}/bids`)
}

export function placeBid(auctionId, userId, amount) {
  return request(`/api/auctions/${auctionId}/bids`, {
    method: 'POST',
    body: JSON.stringify({ userId, amount }),
  })
}
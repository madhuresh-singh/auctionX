const localAuctionsKey = 'auctionx-local-auctions'

export function getLocalAuctions() {
  try {
    const auctions = JSON.parse(window.localStorage.getItem(localAuctionsKey))
    return Array.isArray(auctions) ? auctions : []
  } catch {
    return []
  }
}

export function saveLocalAuction(auction) {
  window.localStorage.setItem(localAuctionsKey, JSON.stringify([auction, ...getLocalAuctions()]))
}

export function getLocalAuction(id) {
  return getLocalAuctions().find((auction) => auction.id === id)
}
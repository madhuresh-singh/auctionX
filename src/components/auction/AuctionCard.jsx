import { Clock3, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Badge from '../common/Badge'
import Button from '../common/Button'

function formatRemainingTime(endTime, status) {
  if (status === 'ended') return 'Auction ended'

  const remaining = new Date(endTime).getTime() - Date.now()
  if (remaining <= 0) return 'Ending soon'

  const hours = Math.floor(remaining / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  const visibleHours = hours % 24

  if (days > 0) return `${days}d ${visibleHours}h remaining`
  return `${hours}h remaining`
}

function getBidderCount(auction) {
  try {
    const savedBids = window.localStorage.getItem(`auctionx-bids-${auction.id}`)
    return savedBids ? JSON.parse(savedBids).length : auction.bidderCount
  } catch {
    return auction.bidderCount
  }
}

function AuctionCard({ auction }) {
  const navigate = useNavigate()
  const bidderCount = getBidderCount(auction)

  return (
    <article className="auction-card">
      <div className="auction-image-wrap">
        <img alt={auction.itemName} className="auction-image" src={auction.image} />
        <Badge variant={auction.status}>{auction.status}</Badge>
      </div>
      <div className="auction-card-body">
        <h3>{auction.itemName}</h3>
        <p className="auction-description">{auction.description}</p>
        <div className="auction-meta">
          <span><Users size={15} /> {bidderCount} bidders</span>
          <span><Clock3 size={15} /> {formatRemainingTime(auction.endTime, auction.status)}</span>
        </div>
        <div className="auction-card-footer">
          <div>
            <span className="meta-label">Current bid</span>
            <strong>₹{auction.currentPrice.toLocaleString('en-IN')}</strong>
          </div>
          <Button onClick={() => navigate(`/auctions/${auction.id}`)} variant="secondary">
            View Auction
          </Button>
        </div>
      </div>
    </article>
  )
}

export default AuctionCard
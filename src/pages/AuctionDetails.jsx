import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Badge from '../components/common/Badge'
import BidForm from '../components/auction/BidForm'
import BidHistory from '../components/auction/BidHistory'
import Countdown from '../components/auction/Countdown'
import CurrentBid from '../components/auction/CurrentBid'
import { getAuction, getAuctionBids, placeBid } from '../api/auctionApi'
import mockAuctions from '../data/mockData'
import { getStoredUser } from '../utils/userStorage'
import { getLocalAuction } from '../utils/auctionStorage'

function formatBidTime(createdAt) {
  return new Date(createdAt).toLocaleString()
}

function mapBid(bid) {
  return {
    bidder: bid.user?.name || 'Bidder',
    amount: bid.amount,
    time: formatBidTime(bid.createdAt),
  }
}

function AuctionDetails() {
  const { id } = useParams()
  const localAuction = getLocalAuction(id)
  const presentation = mockAuctions[Number(id) - 1]
  const backendAuctionId = Number(id)
  const isLocalAuction = Boolean(localAuction)
  const [auction, setAuction] = useState(localAuction || null)
  const [currentBid, setCurrentBid] = useState(localAuction?.currentPrice ?? 0)
  const [bidderCount, setBidderCount] = useState(0)
  const [bids, setBids] = useState([])
  const [isLoading, setIsLoading] = useState(!isLocalAuction)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (isLocalAuction) return
    if (!Number.isInteger(backendAuctionId) || backendAuctionId <= 0) return

    async function loadAuctionData() {
      setIsLoading(true)
      setLoadError('')
      try {
        const [auctionData, bidData] = await Promise.all([
          getAuction(backendAuctionId),
          getAuctionBids(backendAuctionId),
        ])
        const mappedBids = bidData.map(mapBid)
        setAuction({ ...auctionData, itemName: presentation?.itemName || auctionData.itemName, description: presentation?.description || auctionData.description, image: auctionData.image || presentation?.image || mockAuctions[0].image, status: auctionData.status.toLowerCase() })
        setCurrentBid(auctionData.currentPrice)
        setBids(mappedBids)
        setBidderCount(mappedBids.length)
      } catch (error) {
        setLoadError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadAuctionData()
  }, [backendAuctionId, isLocalAuction, localAuction, presentation?.description, presentation?.image, presentation?.itemName])

  if (isLoading) {
    return (
      <main className="detail-page page-shell">
        <p className="detail-muted">Loading auction data...</p>
      </main>
    )
  }

  if (loadError || !auction) {
    return (
      <main className="detail-page page-shell">
        <section className="not-found-panel">
          <p className="eyebrow">AuctionX</p>
          <h1>Auction not found</h1>
          <p>The auction you are looking for may have ended or no longer exists.</p>
          <Link className="back-link" to="/auctions"><ArrowLeft size={16} /> Back to Auctions</Link>
        </section>
      </main>
    )
  }

  async function handleBidPlaced(amount) {
    setIsSubmitting(true)
    setSuccessMessage('')
    try {
      const user = getStoredUser()
      if (!user) throw new Error('Please log in before placing a bid.')
      await placeBid(backendAuctionId, user.id, amount)
      const [auctionData, bidData] = await Promise.all([
        getAuction(backendAuctionId),
        getAuctionBids(backendAuctionId),
      ])
      const mappedBids = bidData.map(mapBid)
      setCurrentBid(auctionData.currentPrice)
      setBids(mappedBids)
      setBidderCount(mappedBids.length)
      setSuccessMessage('Your bid was placed successfully.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="detail-page page-shell">
      <style>{`
        .detail-page { padding-bottom: 96px; padding-top: 44px; }
        .back-link { align-items: center; color: var(--muted-text); display: inline-flex; font-size: .9rem; gap: 7px; text-decoration: none; }
        .back-link:hover { color: var(--text); }
        .detail-layout { display: grid; gap: 28px; grid-template-columns: minmax(0, 1.35fr) minmax(320px, .65fr); margin-top: 28px; }
        .detail-main, .bidding-panel, .bid-history, .not-found-panel { background: linear-gradient(145deg, rgba(24, 32, 43, .92), rgba(18, 23, 32, .92)); border: 1px solid var(--border); border-radius: 16px; }
        .detail-main { overflow: hidden; }
        .detail-image { display: block; height: clamp(280px, 42vw, 520px); object-fit: cover; width: 100%; }
        .detail-copy { padding: clamp(24px, 4vw, 44px); }
        .detail-title-row { align-items: start; display: flex; gap: 16px; justify-content: space-between; }
        .detail-copy h1, .not-found-panel h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.2rem, 5vw, 4.8rem); letter-spacing: -.05em; line-height: .98; margin: 12px 0 18px; }
        .detail-description, .not-found-panel > p { color: var(--muted-text); font-size: 1.05rem; line-height: 1.65; margin: 0; max-width: 650px; }
        .bidding-column { display: flex; flex-direction: column; gap: 18px; }
        .bidding-panel { padding: 28px; }
        .current-bid { border-bottom: 1px solid var(--border); padding-bottom: 25px; }
        .detail-label { color: var(--muted-text); display: block; font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
        .current-bid > strong { display: block; font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.1rem, 5vw, 3.5rem); line-height: 1; margin: 9px 0 8px; }
        .detail-muted { color: var(--muted-text); font-size: .9rem; margin: 0; }
        .countdown { border-bottom: 1px solid var(--border); padding: 0 0 25px; }
        .countdown strong { color: var(--primary-accent); display: block; font-family: 'Space Grotesk', sans-serif; font-size: 2rem; letter-spacing: .04em; margin-top: 9px; }
        .bid-form { padding-top: 2px; }
        .bid-form > label { display: block; font-size: .9rem; font-weight: 600; margin-bottom: 9px; }
        .bid-input-row { align-items: center; background: var(--surface-raised); border: 1px solid var(--border); border-radius: 9px; display: flex; gap: 8px; padding-left: 12px; }
        .bid-input-row > span { color: var(--muted-text); }
        .bid-input-row input { background: transparent; border: 0; color: var(--text); min-width: 0; outline: 0; padding: 12px 0; width: 100%; }
        .bid-input-row input::-webkit-inner-spin-button { appearance: none; }
        .bid-input-row .button { flex: 0 0 auto; margin: 4px; }
        .bid-error { color: var(--danger); font-size: .85rem; margin: 9px 0 0; }
        .bid-success { align-items: center; color: var(--success); display: flex; font-size: .85rem; gap: 7px; margin: 18px 0 0; }
        .bid-history { padding: 24px 28px; }
        .detail-section-heading { align-items: center; display: flex; justify-content: space-between; margin-bottom: 17px; }
        .detail-section-heading h2 { font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; margin: 0; }
        .detail-section-heading > span { color: var(--muted-text); font-size: .8rem; }
        .bid-list { list-style: none; margin: 0; padding: 0; }
        .bid-row { align-items: center; border-top: 1px solid var(--border); display: flex; gap: 11px; padding: 14px 0; }
        .bid-avatar { align-items: center; background: rgba(85, 214, 190, .14); border-radius: 50%; color: var(--primary-accent); display: inline-flex; flex: 0 0 32px; font-weight: 700; height: 32px; justify-content: center; width: 32px; }
        .bid-person { display: flex; flex: 1; flex-direction: column; gap: 2px; }
        .bid-person small { color: var(--muted-text); font-size: .76rem; }
        .bid-amount { font-size: .95rem; }
        .not-found-panel { margin: 70px auto; max-width: 650px; padding: clamp(28px, 7vw, 64px); }
        .not-found-panel h1 { font-size: clamp(2.2rem, 6vw, 4.5rem); }
        .not-found-panel .back-link { margin-top: 28px; }
        @media (max-width: 820px) { .detail-layout { grid-template-columns: 1fr; } .bidding-column { display: grid; grid-template-columns: 1fr 1fr; } .bidding-panel { grid-column: span 2; } }
        @media (max-width: 560px) { .detail-page { padding-bottom: 60px; padding-top: 32px; } .detail-title-row { align-items: start; flex-direction: column; gap: 4px; } .detail-image { height: 260px; } .bidding-column { display: flex; } .bidding-panel, .bid-history { padding: 22px 20px; } .bid-input-row .button { padding-left: 12px; padding-right: 12px; } }
      `}</style>
      <Link className="back-link" to="/auctions"><ArrowLeft size={16} /> Back to Auctions</Link>
      <div className="detail-layout">
        <section className="detail-main">
          <img alt={auction.itemName} className="detail-image" src={auction.image} />
          <div className="detail-copy">
            <div className="detail-title-row">
              <div>
                <p className="eyebrow">Live auction</p>
                <h1>{auction.itemName}</h1>
              </div>
              <Badge variant={auction.status}>{auction.status}</Badge>
            </div>
            <p className="detail-description">{auction.description}</p>
          </div>
        </section>
        <div className="bidding-column">
          <section className="bidding-panel">
            <CurrentBid bidderCount={bidderCount} currentBid={currentBid} />
            <Countdown endTime={auction.endTime} />
            {loadError && <p className="bid-error" role="alert">{loadError}</p>}
            {isLoading ? <p className="detail-muted">Loading auction data...</p> : <BidForm currentBid={currentBid} isSubmitting={isSubmitting} onBidPlaced={handleBidPlaced} />}
            {successMessage && <p className="bid-success" role="status"><CheckCircle2 size={16} /> {successMessage}</p>}
          </section>
          <BidHistory bids={bids} />
        </div>
      </div>
    </main>
  )
}

export default AuctionDetails
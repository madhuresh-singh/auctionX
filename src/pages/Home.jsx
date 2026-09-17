import { ArrowUpRight, Gauge, LockKeyhole, Radio } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import AuctionCard from '../components/auction/AuctionCard'
import { useEffect, useState } from 'react'
import { getAuctions } from '../api/auctionApi'
import mockAuctions from '../data/mockData'
import { getLocalAuctions } from '../utils/auctionStorage'

const features = [
  { icon: Radio, title: 'Real-time bidding', text: 'See every bid as it happens with a live auction experience built for momentum.' },
  { icon: LockKeyhole, title: 'Reliable transactions', text: 'Clear pricing and dependable auction flows keep every exchange straightforward.' },
  { icon: Gauge, title: 'Built for high concurrency', text: 'A focused platform designed to stay responsive when the room gets busy.' },
]

function Home() {
  const navigate = useNavigate()
  const [auctions, setAuctions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAuctions()
      .then((data) => setAuctions([...data, ...getLocalAuctions()].filter((auction) => auction.status.toUpperCase() === 'LIVE')))
      .catch((loadError) => setError(loadError.message))
      .finally(() => setIsLoading(false))
  }, [])

  function addPresentationData(auction) {
    const presentation = mockAuctions[auction.id - 1] || mockAuctions.find((item) => item.itemName === auction.itemName)
    return { ...auction, itemName: presentation?.itemName || auction.itemName, description: presentation?.description || auction.description, image: auction.image || presentation?.image || mockAuctions[0].image, status: auction.status.toLowerCase() }
  }

  return (
    <div className="home-page">
      <main>
        <section className="home-hero page-shell">
          <div className="hero-copy">
            <p className="eyebrow">The auction floor, reimagined</p>
            <h1>REAL-TIME AUCTIONS.<br /><span>BUILT FOR SPEED.</span></h1>
            <p className="hero-supporting-text">Bid with confidence, watch the room move, and find remarkable items before the clock runs out.</p>
            <div className="hero-actions">
              <Button onClick={() => navigate('/auctions')} variant="primary">Explore Auctions <ArrowUpRight size={17} /></Button>
              <Button onClick={() => navigate('/create-auction')} variant="secondary">Create Auction</Button>
            </div>
          </div>
          <div className="hero-signal" aria-hidden="true">
            <span className="signal-line signal-line-one" />
            <span className="signal-line signal-line-two" />
            <span className="signal-dot" />
            <span className="signal-caption">LIVE / 03</span>
          </div>
        </section>

        <section className="home-section page-shell" aria-labelledby="live-auctions-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Now moving</p>
              <h2 id="live-auctions-heading">Live auctions</h2>
            </div>
            <Link className="text-link" to="/auctions">View all auctions <ArrowUpRight size={16} /></Link>
          </div>
          {isLoading && <p className="detail-muted">Loading live auctions...</p>}
          {error && <p className="bid-error" role="alert">{error}</p>}
          {!isLoading && !error && <div className="auction-grid">
            {auctions.map((auction) => <AuctionCard auction={addPresentationData(auction)} key={auction.id} />)}
          </div>}
        </section>

        <section className="why-section page-shell" aria-labelledby="why-heading">
          <div className="section-heading why-heading">
            <div>
              <p className="eyebrow">Why AuctionX</p>
              <h2 id="why-heading">A faster way to find<br />the next great thing.</h2>
            </div>
          </div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, text }) => (
              <article className="feature-card" key={title}>
                <Icon className="feature-icon" size={24} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer page-shell">
        <Link className="footer-brand" to="/">AuctionX</Link>
        <span>Real-time auctions for the things worth chasing.</span>
        <span>© 2026 AuctionX</span>
      </footer>
    </div>
  )
}

export default Home
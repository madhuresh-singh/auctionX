import { Link } from 'react-router-dom'
import Badge from '../components/common/Badge'
import mockAuctions from '../data/mockData'

const myBids = [
  { auctionId: 'aurora-headphones', myBid: 27000, status: 'live', time: 'Today, 10:42 AM' },
  { auctionId: 'nimbus-camera', myBid: 118000, status: 'live', time: 'Yesterday, 6:18 PM' },
  { auctionId: 'vector-watch', myBid: 64000, status: 'upcoming', time: 'Sep 14, 2:05 PM' },
]

function MyBids() {
  const bidsWithAuctions = myBids.map((bid) => ({
    ...bid,
    auction: mockAuctions.find((auction) => auction.id === bid.auctionId),
  }))

  const activeBids = bidsWithAuctions.filter((bid) => bid.status === 'live').length
  const totalBidValue = bidsWithAuctions.reduce((total, bid) => total + bid.myBid, 0)

  return (
    <main className="support-page page-shell">
      <style>{`
        .my-bids-header { align-items: end; display: flex; justify-content: space-between; margin-bottom: 32px; }
        .my-bids-header h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 5rem); letter-spacing: -.05em; line-height: .95; margin: 12px 0 16px; }
        .my-bids-description { color: var(--muted-text); font-size: 1.05rem; line-height: 1.6; margin: 0; }
        .bid-summary { display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); margin-bottom: 30px; }
        .summary-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 22px; }
        .summary-card strong { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 1.7rem; margin-top: 8px; }
        .summary-label { color: var(--muted-text); font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
        .bids-table-wrap { border: 1px solid var(--border); border-radius: 14px; overflow-x: auto; }
        .bids-table { border-collapse: collapse; min-width: 720px; text-align: left; width: 100%; }
        .bids-table th { color: var(--muted-text); font-size: .72rem; letter-spacing: .08em; padding: 16px 20px; text-transform: uppercase; }
        .bids-table td { border-top: 1px solid var(--border); padding: 17px 20px; white-space: nowrap; }
        .bid-item-link { color: var(--text); font-weight: 600; text-decoration: none; }
        .bid-item-link:hover { color: var(--primary-accent); }
        .table-amount { font-family: 'Space Grotesk', sans-serif; font-weight: 600; }
        .table-muted { color: var(--muted-text); font-size: .88rem; }
        .my-bids-empty { background: var(--surface); border: 1px dashed var(--border); border-radius: 14px; color: var(--muted-text); padding: 60px 24px; text-align: center; }
        @media (max-width: 680px) { .my-bids-header { align-items: start; flex-direction: column; gap: 8px; } .bid-summary { grid-template-columns: 1fr; } .summary-card { padding: 18px; } .bids-table-wrap { margin-inline: -20px; border-left: 0; border-radius: 0; border-right: 0; } }
      `}</style>
      <header className="my-bids-header">
        <div>
          <p className="eyebrow">Your activity</p>
          <h1>My Bids</h1>
          <p className="my-bids-description">Keep track of the auctions you are watching and the bids you have placed.</p>
        </div>
      </header>
      {bidsWithAuctions.length > 0 ? (
        <>
          <section className="bid-summary" aria-label="Bid summary">
            <div className="summary-card"><span className="summary-label">Total bids</span><strong>{bidsWithAuctions.length}</strong></div>
            <div className="summary-card"><span className="summary-label">Active auctions</span><strong>{activeBids}</strong></div>
            <div className="summary-card"><span className="summary-label">Total bid value</span><strong>₹{totalBidValue.toLocaleString('en-IN')}</strong></div>
          </section>
          <div className="bids-table-wrap">
            <table className="bids-table">
              <thead><tr><th>Item</th><th>My bid</th><th>Current bid</th><th>Status</th><th>Placed</th></tr></thead>
              <tbody>
                {bidsWithAuctions.map(({ auction, myBid, status, time }) => (
                  <tr key={auction.id}>
                    <td><Link className="bid-item-link" to={`/auctions/${auction.id}`}>{auction.itemName}</Link></td>
                    <td className="table-amount">₹{myBid.toLocaleString('en-IN')}</td>
                    <td className="table-amount">₹{auction.currentPrice.toLocaleString('en-IN')}</td>
                    <td><Badge variant={status}>{status}</Badge></td>
                    <td className="table-muted">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <section className="my-bids-empty"><h2>No bids yet</h2><p>When you place a bid, it will appear here.</p></section>
      )}
    </main>
  )
}

export default MyBids
function BidHistory({ bids }) {
  return (
    <section className="bid-history" aria-labelledby="bid-history-heading">
      <div className="detail-section-heading">
        <h2 id="bid-history-heading">Bid history</h2>
        <span>{bids.length} bids</span>
      </div>
      {bids.length > 0 ? (
        <ol className="bid-list">
          {bids.map((bid, index) => (
            <li className="bid-row" key={`${bid.time}-${bid.bidder}-${index}`}>
              <span className="bid-avatar" aria-hidden="true">{bid.bidder.charAt(0)}</span>
              <span className="bid-person"><strong>{bid.bidder}</strong><small>{bid.time}</small></span>
              <strong className="bid-amount">₹{bid.amount.toLocaleString('en-IN')}</strong>
            </li>
          ))}
        </ol>
      ) : (
        <p className="detail-muted">No bids have been placed yet.</p>
      )}
    </section>
  )
}

export default BidHistory
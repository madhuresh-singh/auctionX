function CurrentBid({ bidderCount, currentBid }) {
  return (
    <div className="current-bid">
      <span className="detail-label">Current Bid</span>
      <strong>₹{currentBid.toLocaleString('en-IN')}</strong>
      <span className="detail-muted">{bidderCount} bidders</span>
    </div>
  )
}

export default CurrentBid
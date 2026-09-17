import { useState } from 'react'
import Button from '../common/Button'

function BidForm({ currentBid, onBidPlaced }) {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const numericAmount = Number(amount)

    if (!amount.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Enter a valid positive bid amount.')
      return
    }

    if (numericAmount <= currentBid) {
      setError(`Your bid must be higher than ₹${currentBid.toLocaleString('en-IN')}.`)
      return
    }

    onBidPlaced(numericAmount)
    setAmount('')
    setError('')
  }

  return (
    <form className="bid-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="bid-amount">Your bid</label>
      <div className="bid-input-row">
        <span aria-hidden="true">₹</span>
        <input
          id="bid-amount"
          inputMode="decimal"
          min="0"
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Enter amount"
          step="1"
          type="number"
          value={amount}
        />
        <Button type="submit">Place Bid</Button>
      </div>
      {error && <p className="bid-error" role="alert">{error}</p>}
    </form>
  )
}

export default BidForm
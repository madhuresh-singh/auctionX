import { useEffect, useState } from 'react'

function getRemainingMilliseconds(endTime) {
  return Math.max(0, new Date(endTime).getTime() - Date.now())
}

function formatCountdown(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')
}

function Countdown({ endTime }) {
  const [, setTick] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick((tick) => tick + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [endTime])

  const remaining = getRemainingMilliseconds(endTime)

  return (
    <div className="countdown" aria-live="polite">
      <span className="detail-label">Time remaining</span>
      <strong>{remaining > 0 ? formatCountdown(remaining) : 'Auction ended'}</strong>
    </div>
  )
}

export default Countdown
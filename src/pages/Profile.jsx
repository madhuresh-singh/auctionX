import { Gavel, LogOut, Mail, Trophy, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import { getAuctions, getAuctionBids } from '../api/auctionApi'
import { clearStoredUser, getStoredUser } from '../utils/userStorage'

function Profile() {
  const navigate = useNavigate()
  const user = getStoredUser()
  const userId = user?.id
  const [userBids, setUserBids] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(userId))

  useEffect(() => {
    if (!userId) return
    getAuctions()
      .then((auctions) => Promise.all(auctions.map((auction) => getAuctionBids(auction.id))))
      .then((bidLists) => setUserBids(bidLists.flat().filter((bid) => bid.userId === userId)))
      .catch(() => setUserBids([]))
      .finally(() => setIsLoading(false))
  }, [userId])

  const activeAuctions = userBids.length
  const initials = user?.name?.split(/\s+/).filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || '?'

  function handleLogout() {
    clearStoredUser()
    navigate('/', { replace: true })
  }

  return (
    <main className="page-shell profile-page">
      <section className="profile-header">
        <div className="profile-avatar" aria-hidden="true">{initials}</div>
        <div>
          <p className="eyebrow">AuctionX member</p>
          <h1>{user?.name}</h1>
          <p className="profile-email"><Mail size={16} /> {user?.email}</p>
        </div>
        <span className="profile-logout"><Button onClick={handleLogout} variant="secondary"><LogOut size={16} /> Log out</Button></span>
      </section>

      <section className="profile-stats" aria-label="Auction activity">
        <article className="profile-stat"><Gavel size={20} /><span>Total bids</span><strong>{isLoading ? '...' : userBids.length}</strong></article>
        <article className="profile-stat"><UserRound size={20} /><span>Active bids</span><strong>{isLoading ? '...' : activeAuctions}</strong></article>
        <article className="profile-stat"><Trophy size={20} /><span>Won auctions</span><strong>0</strong></article>
      </section>

      <style>{`
        .profile-page { padding-bottom: 96px; }
        .profile-header { align-items: center; background: linear-gradient(145deg, rgba(24, 32, 43, .92), rgba(18, 23, 32, .92)); border: 1px solid var(--border); border-radius: 16px; display: flex; gap: 24px; padding: clamp(28px, 6vw, 56px); }
        .profile-logout { margin-left: auto; }
        .profile-avatar { align-items: center; background: rgba(85, 214, 190, .14); border: 1px solid rgba(85, 214, 190, .32); border-radius: 50%; color: var(--primary-accent); display: flex; flex: 0 0 88px; font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; height: 88px; justify-content: center; width: 88px; }
        .profile-header h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem, 5vw, 4rem); letter-spacing: -.04em; line-height: 1; margin: 10px 0 12px; }
        .profile-email { align-items: center; color: var(--muted-text); display: flex; gap: 8px; margin: 0; }
        .profile-stats { display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); margin-top: 20px; }
        .profile-stat { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; display: grid; gap: 8px; padding: 24px; }
        .profile-stat svg { color: var(--primary-accent); }
        .profile-stat span { color: var(--muted-text); font-size: .9rem; }
        .profile-stat strong { font-family: 'Space Grotesk', sans-serif; font-size: 2rem; }
        @media (max-width: 560px) { .profile-header { align-items: flex-start; flex-direction: column; } .profile-logout { margin-left: 0; } .profile-stats { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  )
}

export default Profile
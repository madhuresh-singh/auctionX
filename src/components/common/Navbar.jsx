import { Gavel } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from './Button'
import { getStoredUser } from '../../utils/userStorage'

const navItems = [
  { label: 'Auctions', to: '/auctions' },
  { label: 'My Bids', to: '/my-bids' },
  { label: 'Profile', to: '/profile' },
]

function Navbar() {
  const navigate = useNavigate()
  const user = getStoredUser()
  const initial = user?.name?.charAt(0).toUpperCase() || '?'

  return (
    <header className="navbar">
      <NavLink className="brand" to="/" aria-label="AuctionX home">
        <span className="brand-mark" aria-hidden="true">
          <Gavel size={20} strokeWidth={2.5} />
        </span>
        <span>AuctionX</span>
      </NavLink>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            key={item.to}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar-user" title={user?.email}>
        <span className="navbar-user-avatar" aria-hidden="true">{initial}</span>
        <span className="navbar-user-name">{user?.name}</span>
      </div>
      <Button onClick={() => navigate('/create-auction')} variant="primary">
        Create Auction
      </Button>
      <style>{`
        .navbar-user { align-items: center; color: var(--muted-text); display: flex; font-size: .85rem; gap: 8px; max-width: 180px; }
        .navbar-user-avatar { align-items: center; background: rgba(85, 214, 190, .14); border: 1px solid rgba(85, 214, 190, .3); border-radius: 50%; color: var(--primary-accent); display: inline-flex; flex: 0 0 30px; font-size: .75rem; font-weight: 700; height: 30px; justify-content: center; width: 30px; }
        .navbar-user-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        @media (max-width: 680px) { .navbar-user { order: 2; } .navbar-user-name { display: none; } }
      `}</style>
    </header>
  )
}

export default Navbar
import { Gavel } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from './Button'

const navItems = [
  { label: 'Auctions', to: '/auctions' },
  { label: 'My Bids', to: '/my-bids' },
  { label: 'Profile', to: '/profile' },
]

function Navbar() {
  const navigate = useNavigate()

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

      <Button onClick={() => navigate('/create-auction')} variant="primary">
        Create Auction
      </Button>
    </header>
  )
}

export default Navbar
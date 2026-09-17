import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Auctions from './pages/Auctions'
import AuctionDetails from './pages/AuctionDetails'
import CreateAuction from './pages/CreateAuction'
import MyBids from './pages/MyBids'
import Profile from './pages/Profile'
import Login from './pages/Login'
import { getStoredUser } from './utils/userStorage'

function PlaceholderPage({ title, description }) {
  return (
    <main className="page-shell">
      <section className="placeholder-panel">
        <p className="eyebrow">AuctionX</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
    </main>
  )
}

function AppContent() {
  useLocation()
  const hasUser = Boolean(getStoredUser())

  if (!hasUser && window.location.pathname !== '/') return <Navigate replace to="/" />

  return (
    <>
      {hasUser && <Navbar />}
      <Routes>
        <Route element={hasUser ? <Home /> : <Login />} path="/" />
        <Route element={<Auctions />} path="/auctions" />
        <Route element={<AuctionDetails />} path="/auctions/:id" />
        <Route element={<CreateAuction />} path="/create-auction" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<MyBids />} path="/my-bids" />
        <Route element={<PlaceholderPage title="Dashboard" description="Your auction dashboard is coming next." />} path="/dashboard" />
        <Route element={<PlaceholderPage title="Page not found" description="The page you requested does not exist." />} path="*" />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

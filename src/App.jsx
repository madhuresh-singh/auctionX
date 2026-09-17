import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Auctions from './pages/Auctions'
import AuctionDetails from './pages/AuctionDetails'

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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Auctions />} path="/auctions" />
        <Route element={<AuctionDetails />} path="/auctions/:id" />
        <Route element={<PlaceholderPage title="Create an auction" description="Auction creation will be available in the next stage." />} path="/create-auction" />
        <Route element={<PlaceholderPage title="Profile" description="Your profile and activity will appear here." />} path="/profile" />
        <Route element={<PlaceholderPage title="My bids" description="Track your bids and auction activity here." />} path="/my-bids" />
        <Route element={<PlaceholderPage title="Dashboard" description="Your auction dashboard is coming next." />} path="/dashboard" />
        <Route element={<PlaceholderPage title="Page not found" description="The page you requested does not exist." />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}

export default App

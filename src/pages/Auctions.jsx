import { useEffect, useMemo, useState } from 'react'
import AuctionCard from '../components/auction/AuctionCard'
import AuctionFilters from '../components/auction/AuctionFilters'
import { getAuctions } from '../api/auctionApi'
import mockAuctions from '../data/mockData'
import { getLocalAuctions } from '../utils/auctionStorage'

const categoriesByAuctionId = {
  'aurora-headphones': 'Electronics',
  'nimbus-camera': 'Electronics',
  'vector-watch': 'Fashion',
}

function Auctions() {
  const [auctions, setAuctions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [category, setCategory] = useState('All Categories')
  const [sort, setSort] = useState('ending-soon')

  useEffect(() => {
    getAuctions()
      .then((data) => setAuctions([...data, ...getLocalAuctions()].map((auction) => {
        const presentation = mockAuctions[auction.id - 1] || mockAuctions.find((item) => item.itemName === auction.itemName)
        return { ...auction, itemName: presentation?.itemName || auction.itemName, description: presentation?.description || auction.description, image: auction.image || presentation?.image || mockAuctions[0].image, status: auction.status.toLowerCase() }
      })))
      .catch((loadError) => setError(loadError.message))
      .finally(() => setIsLoading(false))
  }, [])

  const filteredAuctions = useMemo(() => {
    const matchingAuctions = auctions.filter((auction) => {
      const matchesSearch = auction.itemName.toLowerCase().includes(search.trim().toLowerCase())
      const matchesStatus = status === 'all' || auction.status === status
      const presentation = mockAuctions.find((item) => item.itemName === auction.itemName)
      const auctionCategory = presentation ? categoriesByAuctionId[presentation.id] || 'Other' : 'Other'
      const matchesCategory = category === 'All Categories' || auctionCategory === category

      return matchesSearch && matchesStatus && matchesCategory
    })

    return matchingAuctions.sort((firstAuction, secondAuction) => {
      if (sort === 'highest-bid') return secondAuction.currentPrice - firstAuction.currentPrice
      if (sort === 'lowest-bid') return firstAuction.currentPrice - secondAuction.currentPrice
      if (sort === 'newest') return new Date(secondAuction.createdAt).getTime() - new Date(firstAuction.createdAt).getTime()
      return new Date(firstAuction.endTime).getTime() - new Date(secondAuction.endTime).getTime()
    })
  }, [auctions, category, search, sort, status])

  return (
    <main className="auctions-page page-shell">
      <style>{`
        .auctions-page { padding-bottom: 96px; padding-top: 64px; }
        .auctions-header { align-items: end; display: flex; justify-content: space-between; margin-bottom: 34px; }
        .auctions-header h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 5rem); letter-spacing: -0.05em; line-height: .95; margin: 12px 0 16px; }
        .auctions-description { color: var(--muted-text); font-size: 1.05rem; line-height: 1.6; max-width: 560px; }
        .auction-count { color: var(--muted-text); font-size: .85rem; white-space: nowrap; }
        .auction-filters { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; display: grid; gap: 14px; grid-template-columns: minmax(220px, 1.5fr) repeat(3, minmax(140px, 1fr)); margin-bottom: 32px; padding: 16px; }
        .auction-filters label { display: flex; flex-direction: column; gap: 7px; }
        .auction-filters label span { color: var(--muted-text); font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
        .auction-filters input, .auction-filters select { background: var(--surface-raised); border: 1px solid var(--border); border-radius: 8px; color: var(--text); min-height: 42px; outline: none; padding: 0 12px; width: 100%; }
        .auction-filters input:focus, .auction-filters select:focus { border-color: var(--primary-accent); box-shadow: 0 0 0 2px rgba(85, 214, 190, .14); }
        .auction-results-grid { display: grid; gap: 18px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .auction-empty { background: var(--surface); border: 1px dashed var(--border); border-radius: 14px; color: var(--muted-text); padding: 64px 24px; text-align: center; }
        .auction-empty h2 { color: var(--text); font-family: 'Space Grotesk', sans-serif; margin: 0 0 8px; }
        @media (max-width: 900px) { .auction-filters { grid-template-columns: repeat(2, minmax(0, 1fr)); } .filter-search { grid-column: span 2; } .auction-results-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 680px) { .auctions-page { padding-bottom: 60px; padding-top: 40px; } .auctions-header { align-items: start; flex-direction: column; gap: 8px; } .auction-filters { grid-template-columns: 1fr; } .filter-search { grid-column: auto; } .auction-results-grid { grid-template-columns: 1fr; } }
      `}</style>
      <header className="auctions-header">
        <div>
          <p className="eyebrow">The marketplace</p>
          <h1>All Auctions</h1>
          <p className="auctions-description">Explore live, upcoming, and completed auctions from the AuctionX community.</p>
        </div>
        <p className="auction-count">{filteredAuctions.length} {filteredAuctions.length === 1 ? 'auction' : 'auctions'} found</p>
      </header>

      <AuctionFilters
        category={category}
        onCategoryChange={setCategory}
        onSearchChange={setSearch}
        onSortChange={setSort}
        onStatusChange={setStatus}
        search={search}
        sort={sort}
        status={status}
      />

      {isLoading && <p className="detail-muted">Loading auctions...</p>}
      {error && <section className="auction-empty" role="alert"><h2>Unable to load auctions</h2><p>{error}</p></section>}
      {!isLoading && !error && (filteredAuctions.length > 0 ? (
        <div className="auction-results-grid">
          {filteredAuctions.map((auction) => <AuctionCard auction={auction} key={auction.id} />)}
        </div>
      ) : (
        <section className="auction-empty" role="status">
          <h2>No auctions found</h2>
          <p>Try adjusting your search or filters to see more results.</p>
        </section>
      ))}
    </main>
  )
}

export default Auctions
const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Live', value: 'live' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Ended', value: 'ended' },
]

const categoryOptions = ['All Categories', 'Electronics', 'Gaming', 'Collectibles', 'Fashion', 'Other']

const sortOptions = [
  { label: 'Ending Soon', value: 'ending-soon' },
  { label: 'Highest Current Bid', value: 'highest-bid' },
  { label: 'Lowest Current Bid', value: 'lowest-bid' },
  { label: 'Newest', value: 'newest' },
]

function AuctionFilters({ category, onCategoryChange, onSearchChange, onSortChange, onStatusChange, search, sort, status }) {
  return (
    <form className="auction-filters" onSubmit={(event) => event.preventDefault()}>
      <label className="filter-search">
        <span>Search auctions</span>
        <input
          aria-label="Search auctions by item name"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by item name"
          type="search"
          value={search}
        />
      </label>
      <label>
        <span>Status</span>
        <select aria-label="Filter auctions by status" onChange={(event) => onStatusChange(event.target.value)} value={status}>
          {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
      <label>
        <span>Category</span>
        <select aria-label="Filter auctions by category" onChange={(event) => onCategoryChange(event.target.value)} value={category}>
          {categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
      <label>
        <span>Sort by</span>
        <select aria-label="Sort auctions" onChange={(event) => onSortChange(event.target.value)} value={sort}>
          {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
    </form>
  )
}

export default AuctionFilters
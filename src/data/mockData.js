import gamingLaptopImage from '../assets/gaming-laptop.svg'
import smartwatchImage from '../assets/smartwatch.svg'
import wirelessEarbudsImage from '../assets/wireless-earbuds.svg'

const mockAuctions = [
  {
    id: 'aurora-headphones',
    itemName: 'Aurora Wireless Headphones',
    description: 'Studio-grade sound with adaptive noise cancellation.',
    currentPrice: 28500,
    startingPrice: 18000,
    bidderCount: 3,
    status: 'live',
    endTime: '2026-09-18T21:30:00',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'nimbus-camera',
    itemName: 'Nimbus Pro Camera',
    description: 'A compact mirrorless camera built for crisp, fast-moving shots.',
    currentPrice: 124000,
    startingPrice: 90000,
    bidderCount: 3,
    status: 'live',
    endTime: '2026-09-19T18:00:00',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'vector-watch',
    itemName: 'Pulse Smartwatch',
    description: 'A health-focused smartwatch with GPS, sleep tracking, and a bright AMOLED display.',
    currentPrice: 76000,
    startingPrice: 60000,
    bidderCount: 3,
    status: 'upcoming',
    endTime: '2026-09-22T16:45:00',
    image: smartwatchImage,
  },
  {
    id: 'gaming-laptop',
    itemName: 'Nebula Gaming Laptop',
    description: 'A high-performance gaming laptop with a fast display and dedicated graphics.',
    currentPrice: 110000,
    startingPrice: 85000,
    bidderCount: 0,
    status: 'live',
    endTime: '2026-09-24T16:00:00',
    image: gamingLaptopImage,
  },
  {
    id: 'wireless-earbuds',
    itemName: 'Echo Wireless Earbuds',
    description: 'Compact wireless earbuds with adaptive noise cancellation and a pocket charging case.',
    currentPrice: 14500,
    startingPrice: 10000,
    bidderCount: 0,
    status: 'live',
    endTime: '2026-09-25T12:00:00',
    image: wirelessEarbudsImage,
  },
]

export default mockAuctions
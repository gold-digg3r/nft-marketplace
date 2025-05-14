export interface Collection {
  id: string
  name: string
  description: string
  bannerImage: string
  logoImage: string
  themeColor: string
  totalItems: number
  floorPrice: number
  volumeTraded: number
  creator: string
  creatorAddress: string
  mintDate: string
  tags: string[]
  featured: boolean
  // New fields for enhanced collection details
  story?: string
  lore?: string
  roadmap?: RoadmapItem[]
  priceHistory?: PriceHistoryPoint[]
  rarityDistribution?: RarityDistribution[]
  attributes?: CollectionAttribute[]
  statistics?: CollectionStatistics
  team?: TeamMember[]
  socialLinks?: SocialLink[]
}

export interface LeaderboardEntry {
  id: string
  name: string
  logo: string
  floorPrice: number
  priceChange24h: number
  priceChange7d: number
  priceChange30d: number
  volume24h: number
  volume7d: number
  volume30d: number
  volumeAll: number
  sales24h: number
  sales7d: number
  sales30d: number
  marketCap: number
  totalItems: number
  uniqueOwners: number
  ownershipPercentage: number
}

export interface RoadmapItem {
  title: string
  description: string
  date: string
  completed: boolean
}

export interface PriceHistoryPoint {
  date: string
  price: number
  volume?: number
}

export interface RarityDistribution {
  rarity: string
  percentage: number
  count: number
}

export interface CollectionAttribute {
  name: string
  values: {
    name: string
    count: number
    percentage: number
  }[]
}

export interface CollectionStatistics {
  holders: number
  uniqueOwners: number
  listedPercentage: number
  averagePrice: number
  highestSale: number
  lowestSale: number
  dailyVolume: number
  weeklyVolume: number
  monthlyVolume: number
}

export interface TeamMember {
  name: string
  role: string
  avatar?: string
  bio?: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface Character {
  id: string | number
  name: string
  image: string
  description?: string
  collection: string
  rarity: string
  price?: number
  attributes?: {
    [key: string]: any
  }
  owner?: string
  listed?: boolean
  mintAddress?: string
  tokenStandard?: string
  createdAt?: string
  alias?: string
  stars?: number
}

export interface NFTMetadata {
  mint: string
  name: string
  symbol: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
  collection: string | null
  creators: Array<{
    address: string
    share: number
    verified: boolean
  }>
  isMutable: boolean
  primarySaleHappened: boolean
  updateAuthority: string
  tokenStandard: any
  editionNonce: number | null
  tokenProgram: any
}

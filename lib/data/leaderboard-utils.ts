import { collections } from "./collections"
import type { Collection, LeaderboardEntry } from "@/types/nft"

// Generate random stats for leaderboard entries
function generateLeaderboardStats(collection: Collection): LeaderboardEntry {
  // Calculate price change percentages
  const priceChange24h = Math.random() * 20 - 10 // -10% to +10%
  const priceChange7d = Math.random() * 40 - 20 // -20% to +20%
  const priceChange30d = Math.random() * 60 - 30 // -30% to +30%

  // Calculate volume for different time periods
  const volume24h = Math.round(Math.random() * 50 * 100) / 100
  const volume7d = volume24h * (Math.random() * 3 + 4) // 4-7x daily volume
  const volume30d = volume7d * (Math.random() * 3 + 3) // 3-6x weekly volume

  // Calculate sales count
  const sales24h = Math.floor(Math.random() * 20)
  const sales7d = sales24h * (Math.random() * 3 + 4)
  const sales30d = sales7d * (Math.random() * 3 + 3)

  // Calculate market cap (floor price * total items)
  const marketCap = collection.floorPrice * collection.totalItems

  return {
    id: collection.id,
    name: collection.name,
    logo: collection.logoImage,
    floorPrice: collection.floorPrice,
    priceChange24h,
    priceChange7d,
    priceChange30d,
    volume24h,
    volume7d,
    volume30d,
    volumeAll: collection.volumeTraded,
    sales24h,
    sales7d,
    sales30d,
    marketCap,
    totalItems: collection.totalItems,
    uniqueOwners: collection.statistics?.uniqueOwners || Math.floor(collection.totalItems * 0.7),
    ownershipPercentage: collection.statistics?.uniqueOwners
      ? (collection.statistics.uniqueOwners / collection.totalItems) * 100
      : Math.floor(Math.random() * 30 + 60), // 60-90%
  }
}

// Get leaderboard data
export function getLeaderboardData(): LeaderboardEntry[] {
  return collections.map((collection) => generateLeaderboardStats(collection))
}

// Sort leaderboard data by a specific metric
export function sortLeaderboardData(
  data: LeaderboardEntry[],
  sortBy: string,
  sortDirection: "asc" | "desc" = "desc",
): LeaderboardEntry[] {
  return [...data].sort((a, b) => {
    const aValue = a[sortBy as keyof LeaderboardEntry]
    const bValue = b[sortBy as keyof LeaderboardEntry]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })
}

// Filter leaderboard data by time period
export function filterLeaderboardData(
  data: LeaderboardEntry[],
  timePeriod: "24h" | "7d" | "30d" | "all" = "all",
): LeaderboardEntry[] {
  // This function would typically filter data based on the time period
  // For our mock data, we'll just return all data
  return data
}

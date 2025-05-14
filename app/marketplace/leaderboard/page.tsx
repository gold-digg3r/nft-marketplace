import type { Metadata } from "next"
import { LeaderboardHeader } from "@/components/marketplace/leaderboard/leaderboard-header"
import { LeaderboardTable } from "@/components/marketplace/leaderboard/leaderboard-table"
import { getLeaderboardData } from "@/lib/data/leaderboard-utils"

export const metadata: Metadata = {
  title: "Collections Leaderboard | Gold Digger",
  description: "Explore and compare top NFT collections in the Gold Digger marketplace by various metrics.",
}

export default async function LeaderboardPage() {
  const leaderboardData = getLeaderboardData()

  return (
    <div className="min-h-screen bg-black">
      <LeaderboardHeader />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Collections Leaderboard</h1>
        <p className="text-gray-400 mb-8 max-w-3xl">
          Track and compare the performance of Gold Digger collections across various metrics. Sort by volume, floor
          price, market cap, and more to discover trending collections.
        </p>

        <LeaderboardTable initialData={leaderboardData} />
      </div>
    </div>
  )
}

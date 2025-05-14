import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Trophy } from "lucide-react"

export function LeaderboardHeader() {
  return (
    <div className="relative h-[200px] overflow-hidden">
      <Image
        src="/images/collections/leaderboard-banner.png"
        alt="Leaderboard Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 flex flex-col items-center justify-center">
        <div className="text-center px-4">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-gold mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Collections <span className="text-gold">Leaderboard</span>
            </h1>
          </div>

          <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
            <Link href="/marketplace" className="hover:text-gold transition-colors">
              Marketplace
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-white">Leaderboard</span>
          </div>
        </div>
      </div>
    </div>
  )
}

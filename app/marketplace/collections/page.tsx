import type { Metadata } from "next"
import Link from "next/link"
import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllCollections } from "@/lib/data/collections"
import { CollectionsGrid } from "@/components/marketplace/collections/collections-grid"
import { CollectionsHeader } from "@/components/marketplace/collections/collections-header"

export const metadata: Metadata = {
  title: "NFT Collections | Gold Digger",
  description: "Explore themed character collections in the Gold Digger universe.",
}

export default async function CollectionsPage() {
  const collections = getAllCollections()

  return (
    <div className="min-h-screen bg-black">
      <CollectionsHeader />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Character Collections</h1>
            <p className="text-gray-400 max-w-3xl">
              Explore our themed character collections from the Gold Digger universe. Each collection tells a unique
              story and features characters with special attributes and abilities.
            </p>
          </div>

          <Link href="/marketplace/leaderboard" className="mt-4 md:mt-0">
            <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              View Leaderboard
            </Button>
          </Link>
        </div>

        <CollectionsGrid collections={collections} />
      </div>
    </div>
  )
}

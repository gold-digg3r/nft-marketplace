"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MarketplaceListingCard } from "@/components/marketplace/marketplace-listing-card"
import type { Character } from "@/types/nft"

interface CollectionItemsProps {
  characters: Character[]
  collectionId: string
}

export function CollectionItems({ characters, collectionId }: CollectionItemsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name-asc")
  const [filterRarity, setFilterRarity] = useState("all")

  // Filter characters based on search and rarity
  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRarity = filterRarity === "all" || character.rarity.toLowerCase() === filterRarity.toLowerCase()
    return matchesSearch && matchesRarity
  })

  // Sort characters
  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    const [field, direction] = sortBy.split("-")

    if (field === "name") {
      return direction === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }

    if (field === "price") {
      const priceA = a.price || 0
      const priceB = b.price || 0
      return direction === "asc" ? priceA - priceB : priceB - priceA
    }

    if (field === "rarity") {
      const rarityOrder = ["common", "uncommon", "rare", "epic", "legendary", "mythic"]
      const rarityA = rarityOrder.indexOf(a.rarity.toLowerCase())
      const rarityB = rarityOrder.indexOf(b.rarity.toLowerCase())
      return direction === "asc" ? rarityA - rarityB : rarityB - rarityA
    }

    return 0
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black/40 border-gold/20 text-white"
          />
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <select
              value={filterRarity}
              onChange={(e) => setFilterRarity(e.target.value)}
              className="appearance-none bg-black/40 border border-gold/20 text-white rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-gold/50"
            >
              <option value="all">All Rarities</option>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
              <option value="legendary">Legendary</option>
              <option value="mythic">Mythic</option>
            </select>
            <SlidersHorizontal className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-black/40 border border-gold/20 text-white rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-gold/50"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rarity-asc">Rarity (Common to Legendary)</option>
              <option value="rarity-desc">Rarity (Legendary to Common)</option>
            </select>
            <SlidersHorizontal className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {sortedCharacters.length === 0 ? (
        <div className="text-center py-12 bg-black/30 border border-gold/20 rounded-lg">
          <Search className="h-12 w-12 text-gold/50 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Characters Found</h3>
          <p className="text-gray-400 mb-4">No characters match your search criteria. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedCharacters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/marketplace/character/${character.id}`}>
                <MarketplaceListingCard
                  listing={{
                    id: character.id,
                    character: character,
                    price: character.price || 0,
                    currency: "SOL",
                    seller_id: character.owner || "",
                    created_at: character.createdAt || new Date().toISOString(),
                  }}
                  onBuy={(e) => {
                    e.preventDefault()
                    // Handle buy action
                  }}
                  onViewDetails={(e) => {
                    e.preventDefault()
                    // Handle view details action
                  }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

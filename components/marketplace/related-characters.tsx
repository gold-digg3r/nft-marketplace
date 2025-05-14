"use client"

import { useState, useEffect } from "react"
import { useMarketplace } from "@/app/context/marketplace-context"
import { MarketplaceListingCard } from "@/components/marketplace/marketplace-listing-card"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

interface RelatedCharactersProps {
  currentCharacterId: string | number
  rarity?: string
  type?: string
  limit?: number
}

export default function RelatedCharacters({
  currentCharacterId,
  rarity = "common",
  type = "guard",
  limit = 4,
}: RelatedCharactersProps) {
  const { filteredListings } = useMarketplace()
  const [relatedCharacters, setRelatedCharacters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getRelatedCharacters = () => {
      setLoading(true)

      if (!filteredListings || filteredListings.length === 0) {
        setRelatedCharacters([])
        setLoading(false)
        return
      }

      // Filter out the current character
      const otherCharacters = filteredListings.filter(
        (listing) => listing && listing.id && listing.id.toString() !== currentCharacterId.toString(),
      )

      // First, try to find characters with the same rarity and type
      let related = otherCharacters.filter(
        (listing) =>
          listing?.character?.rarity?.toLowerCase() === rarity.toLowerCase() &&
          listing?.character?.type?.toLowerCase() === type.toLowerCase(),
      )

      // If we don't have enough, add characters with the same rarity
      if (related.length < limit) {
        const sameRarity = otherCharacters.filter(
          (listing) => listing?.character?.rarity?.toLowerCase() === rarity.toLowerCase() && !related.includes(listing),
        )
        related = [...related, ...sameRarity].slice(0, limit)
      }

      // If we still don't have enough, add characters with the same type
      if (related.length < limit) {
        const sameType = otherCharacters.filter(
          (listing) => listing?.character?.type?.toLowerCase() === type.toLowerCase() && !related.includes(listing),
        )
        related = [...related, ...sameType].slice(0, limit)
      }

      // If we still don't have enough, add random characters
      if (related.length < limit) {
        const random = otherCharacters.filter((listing) => !related.includes(listing))
        related = [...related, ...random].slice(0, limit)
      }

      setRelatedCharacters(related.slice(0, limit))
      setLoading(false)
    }

    getRelatedCharacters()
  }, [currentCharacterId, filteredListings, rarity, type, limit])

  // Handle navigation to character detail page
  const handleNavigateToCharacter = (characterId: string | number) => {
    router.push(`/marketplace/character/${characterId}`)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-80 w-full bg-gold/10 rounded-lg" />
        ))}
      </div>
    )
  }

  if (relatedCharacters.length === 0) {
    return (
      <div className="text-center py-8 bg-black/30 border border-gold/20 rounded-lg">
        <p className="text-gray-400">No related characters found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedCharacters.map((character) => (
        <div
          key={character?.id || Math.random().toString()}
          className="transition-transform hover:scale-[1.02] cursor-pointer"
          onClick={() => handleNavigateToCharacter(character?.id || "")}
        >
          <MarketplaceListingCard
            listing={character}
            isWrappedInLink={true} // Indicate that this card is already wrapped in a clickable element
            onBuy={(e) => {
              e.stopPropagation() // Prevent navigation when clicking the buy button
            }}
            onViewDetails={(e) => {
              e.stopPropagation() // This is redundant now but kept for consistency
            }}
          />
        </div>
      ))}
    </div>
  )
}

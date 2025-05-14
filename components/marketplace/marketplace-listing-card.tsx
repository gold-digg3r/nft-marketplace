"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils/formatting"
import { CharacterDetailsDialog } from "./character-details-dialog"
import { Badge } from "@/components/ui/badge"

interface MarketplaceListingCardProps {
  listing: any
  showDetailsButton?: boolean
  onBuy?: (e: React.MouseEvent) => void
  onViewDetails?: (e: React.MouseEvent) => void
  isWrappedInLink?: boolean // New prop to indicate if the card is already wrapped in a Link
}

export function MarketplaceListingCard({
  listing,
  showDetailsButton = false,
  onBuy,
  onViewDetails,
  isWrappedInLink = false, // Default to false
}: MarketplaceListingCardProps) {
  const [isImageError, setIsImageError] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Handle case when listing is undefined
  if (!listing) {
    return (
      <Card className="overflow-hidden border-gold-500/30 h-full">
        <div className="aspect-square bg-muted flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Listing not available</p>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold">Unavailable</h3>
          <p className="text-sm text-muted-foreground">This listing is not available</p>
        </CardContent>
      </Card>
    )
  }

  // Extract character from listing, or use listing as character if it's already a character
  const character = listing.character || listing

  // Handle image loading error
  const handleImageError = () => {
    setIsImageError(true)
  }

  // Get rarity color
  const getRarityColor = (rarity = "common") => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "bg-slate-500"
      case "uncommon":
        return "bg-green-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-amber-500"
      default:
        return "bg-slate-500"
    }
  }

  // Ensure we have an ID for the link
  const id = listing.id || character?.id || "unknown"

  // Content for the card that doesn't use Link components
  const cardContent = (
    <>
      <div className="relative aspect-square overflow-hidden">
        {character?.rarity && (
          <Badge className={`absolute top-2 left-2 z-10 ${getRarityColor(character.rarity)}`}>{character.rarity}</Badge>
        )}
        {!isImageError ? (
          <Image
            src={character?.image || "/placeholder.svg"}
            alt={character?.name || "Character"}
            fill
            className="object-cover transition-transform hover:scale-105"
            onError={handleImageError}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <p className="text-muted-foreground text-sm">Image not available</p>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold truncate">{character?.name || "Unknown Character"}</h3>
        <p className="text-sm text-muted-foreground truncate">{character?.collection || "Gold Digger Collection"}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Price</p>
          <p className="font-bold">{formatPrice(listing.price || character?.price || 0)} SOL</p>
        </div>
        {showDetailsButton && (
          <button className="text-sm text-blue-500 hover:text-blue-700" onClick={() => setIsDialogOpen(true)}>
            Details
          </button>
        )}
        {onBuy && (
          <button className="text-sm text-gold hover:text-gold/80" onClick={onBuy}>
            Buy
          </button>
        )}
      </CardFooter>
    </>
  )

  return (
    <>
      <Card className="overflow-hidden border-gold-500/30 hover:border-gold-500/50 transition-all duration-300 h-full">
        {/* If already wrapped in a Link, don't use Link components inside */}
        {isWrappedInLink ? (
          <div onClick={onViewDetails} className="cursor-pointer">
            {cardContent}
          </div>
        ) : (
          // This branch is used when the card is not wrapped in a Link
          <div>
            <div onClick={onViewDetails} className="cursor-pointer">
              {cardContent}
            </div>
          </div>
        )}
      </Card>

      {showDetailsButton && character && (
        <CharacterDetailsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} character={character} />
      )}
    </>
  )
}

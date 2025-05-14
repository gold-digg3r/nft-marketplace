"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Character } from "@/app/types/character"
import { formatPrice } from "@/lib/utils/formatting"
import { getFeaturedCharacters } from "@/lib/data/character-utils"
import { Skeleton } from "@/components/ui/skeleton"

export function FeaturedCharacters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeaturedCharacters = async () => {
      try {
        const featured = await getFeaturedCharacters(3)
        setCharacters(featured)
      } catch (error) {
        console.error("Failed to load featured characters:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedCharacters()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {characters.map((character) => (
        <Card key={character.id} className="overflow-hidden border-gold-500/30 bg-black/50 backdrop-blur-sm">
          <div className="relative aspect-square">
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold text-white">{character.name}</h3>
              <p className="text-white/80 mb-4">{formatPrice(character.price || 0)} SOL</p>
              <Button asChild className="w-full">
                <Link href={`/marketplace/character/${character.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

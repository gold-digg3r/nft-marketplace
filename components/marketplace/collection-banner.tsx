"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { getFeaturedCollections } from "@/lib/data/collections"
import type { Collection } from "@/types/nft"

export function CollectionBanner() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const featured = getFeaturedCollections()
        setCollections(featured)
      } catch (error) {
        console.error("Failed to load featured collections:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCollections()
  }, [])

  useEffect(() => {
    if (collections.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % collections.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [collections.length])

  if (loading || collections.length === 0) {
    return (
      <div className="w-full h-[300px] bg-black/40 rounded-lg mb-12 animate-pulse">
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Loading collections...</p>
        </div>
      </div>
    )
  }

  const currentCollection = collections[currentIndex]

  return (
    <div className="mb-12 relative overflow-hidden rounded-lg">
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={currentCollection.bannerImage || "/placeholder.svg"}
          alt={currentCollection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-12"
        >
          <div className="max-w-xl">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 relative mr-3 rounded-full overflow-hidden border-2 border-gold/50">
                <Image
                  src={currentCollection.logoImage || "/placeholder.svg"}
                  alt={`${currentCollection.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{currentCollection.name}</h2>
            </div>

            <p className="text-gray-300 mb-6 line-clamp-3">{currentCollection.description}</p>

            <div className="flex flex-wrap gap-4">
              <Link href={`/marketplace/collections/${currentCollection.id}`}>
                <Button className="bg-gold/20 text-gold hover:bg-gold/30 border border-gold/50">View Collection</Button>
              </Link>
              <div className="flex items-center space-x-1">
                {collections.map((_, i) => (
                  <button
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i === currentIndex ? "w-6 bg-gold" : "w-2 bg-gray-600"
                    }`}
                    onClick={() => setCurrentIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

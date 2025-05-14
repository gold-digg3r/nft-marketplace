"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatNumber } from "@/lib/utils/formatting"
import type { Collection } from "@/types/nft"

interface CollectionsGridProps {
  collections: Collection[]
}

export function CollectionsGrid({ collections }: CollectionsGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/marketplace/collections/${collection.id}`}
          className="block"
          onMouseEnter={() => setHoveredId(collection.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <Card className="overflow-hidden border-gold/30 hover:border-gold/50 transition-all duration-300 h-full bg-black/60">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={collection.bannerImage || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-500"
                  style={{
                    transform: hoveredId === collection.id ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center">
                  <div className="h-12 w-12 relative mr-3 rounded-full overflow-hidden border-2 border-gold/50">
                    <Image
                      src={collection.logoImage || "/placeholder.svg"}
                      alt={`${collection.name} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{collection.name}</h3>
                    <p className="text-xs text-gray-300">by {collection.creator}</p>
                  </div>
                </div>
                {collection.featured && (
                  <Badge className="absolute top-3 right-3 bg-gold/80 text-black border-none">Featured</Badge>
                )}
              </div>
              <CardContent className="p-4">
                <p className="text-gray-400 text-sm line-clamp-2 h-10">{collection.description}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {collection.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-black/50 text-gray-300 border-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 border-t border-gray-800 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Items</p>
                  <p className="font-bold text-white">{collection.totalItems}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Floor</p>
                  <p className="font-bold text-white">{collection.floorPrice} SOL</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Volume</p>
                  <p className="font-bold text-white">{formatNumber(collection.volumeTraded)}</p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

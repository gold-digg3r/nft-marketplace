"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Collection } from "@/types/nft"

interface CollectionStoryProps {
  collection: Collection
}

export function CollectionStory({ collection }: CollectionStoryProps) {
  if (!collection.story && !collection.lore) {
    return null
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-black/40 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">Collection Story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {collection.story && (
            <div>
              <h3 className="text-white font-medium mb-2">Overview</h3>
              <p className="text-gray-300">{collection.story}</p>
            </div>
          )}

          {collection.lore && (
            <div>
              <h3 className="text-white font-medium mb-2">Lore</h3>
              <p className="text-gray-300">{collection.lore}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

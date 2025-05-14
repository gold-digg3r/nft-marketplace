"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle } from "lucide-react"
import type { Collection } from "@/types/nft"

interface CollectionRoadmapProps {
  collection: Collection
}

export function CollectionRoadmap({ collection }: CollectionRoadmapProps) {
  if (!collection.roadmap || collection.roadmap.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="bg-black/40 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-700" />

            <div className="space-y-8">
              {collection.roadmap.map((item, index) => (
                <div key={index} className="relative pl-10">
                  {/* Milestone marker */}
                  <div className="absolute left-0 top-0">
                    {item.completed ? (
                      <CheckCircle className="h-6 w-6 text-gold" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-500" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-medium">{item.title}</h3>
                      <span className="text-sm text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

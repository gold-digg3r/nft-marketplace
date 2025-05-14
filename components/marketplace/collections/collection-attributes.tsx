"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Dumbbell, Brain, Shield, Zap, Heart, Target } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface CollectionAttributesProps {
  collectionId: string
}

interface Attribute {
  name: string
  icon: JSX.Element
  distribution: {
    label: string
    count: number
    percentage: number
  }[]
}

export function CollectionAttributes({ collectionId }: CollectionAttributesProps) {
  const [attributes, setAttributes] = useState<Attribute[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would typically fetch from an API
    // For now, we'll use mock data based on the collection ID
    const mockAttributes: Record<string, Attribute[]> = {
      jailbirds: [
        {
          name: "Strength",
          icon: <Dumbbell className="h-5 w-5 text-gold" />,
          distribution: [
            { label: "Low", count: 8, percentage: 33 },
            { label: "Medium", count: 10, percentage: 42 },
            { label: "High", count: 6, percentage: 25 },
          ],
        },
        {
          name: "Intelligence",
          icon: <Brain className="h-5 w-5 text-gold" />,
          distribution: [
            { label: "Low", count: 5, percentage: 21 },
            { label: "Medium", count: 12, percentage: 50 },
            { label: "High", count: 7, percentage: 29 },
          ],
        },
        {
          name: "Defense",
          icon: <Shield className="h-5 w-5 text-gold" />,
          distribution: [
            { label: "Low", count: 7, percentage: 29 },
            { label: "Medium", count: 11, percentage: 46 },
            { label: "High", count: 6, percentage: 25 },
          ],
        },
        {
          name: "Speed",
          icon: <Zap className="h-5 w-5 text-gold" />,
          distribution: [
            { label: "Low", count: 9, percentage: 38 },
            { label: "Medium", count: 9, percentage: 38 },
            { label: "High", count: 6, percentage: 24 },
          ],
        },
        {
          name: "Health",
          icon: <Heart className="h-5 w-5 text-gold" />,
          distribution: [
            { label: "Low", count: 6, percentage: 25 },
            { label: "Medium", count: 12, percentage: 50 },
            { label: "High", count: 6, percentage: 25 },
          ],
        },
        {
          name: "Accuracy",
          icon: <Target className="h-5 w-5 text-gold" />,
          distribution: [
            { label: "Low", count: 8, percentage: 33 },
            { label: "Medium", count: 10, percentage: 42 },
            { label: "High", count: 6, percentage: 25 },
          ],
        },
      ],
      // Add more collections with their attributes
    }

    setTimeout(() => {
      setAttributes(mockAttributes[collectionId] || [])
      setLoading(false)
    }, 500)
  }, [collectionId])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-black/40 border border-gold/20 rounded-lg p-4 animate-pulse">
            <div className="h-6 w-32 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="h-4 w-20 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {attributes.map((attribute, index) => (
        <motion.div
          key={attribute.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-black/40 border border-gold/20 rounded-lg p-4"
        >
          <div className="flex items-center mb-4">
            {attribute.icon}
            <h3 className="text-white font-semibold ml-2">{attribute.name}</h3>
          </div>

          <div className="space-y-3">
            {attribute.distribution.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-gray-400">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

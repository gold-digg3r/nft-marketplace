"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Tag, ArrowUpDown, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface CollectionActivityProps {
  collectionId: string
}

interface ActivityItem {
  id: string
  type: "sale" | "listing" | "transfer" | "mint"
  item: string
  price?: number
  from: string
  to: string
  timestamp: string
}

export function CollectionActivity({ collectionId }: CollectionActivityProps) {
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would typically fetch from an API
    // For now, we'll use mock data
    const mockActivity: ActivityItem[] = [
      {
        id: "act-1",
        type: "sale",
        item: "Grimshaw #001",
        price: 1.2,
        from: "GD5x7dB...",
        to: "8fHj2K9...",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      },
      {
        id: "act-2",
        type: "listing",
        item: "Blackstone #042",
        price: 2.5,
        from: "3tYp8L7...",
        to: "Marketplace",
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      },
      {
        id: "act-3",
        type: "transfer",
        item: "Blackwood #013",
        from: "9qRs5V2...",
        to: "7mNj4P1...",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      },
      {
        id: "act-4",
        type: "mint",
        item: "Warden Chief #007",
        from: "Creator",
        to: "2xZc8B3...",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
      {
        id: "act-5",
        type: "sale",
        item: "Inmate Hacker #019",
        price: 1.8,
        from: "5vKp7T4...",
        to: "1aLm9R6...",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), // 30 hours ago
      },
    ]

    setTimeout(() => {
      setActivity(mockActivity)
      setLoading(false)
    }, 500)
  }, [collectionId])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ShoppingCart className="h-4 w-4 text-green-500" />
      case "listing":
        return <Tag className="h-4 w-4 text-gold" />
      case "transfer":
        return <ArrowUpDown className="h-4 w-4 text-blue-500" />
      case "mint":
        return <Calendar className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }

  const getActivityLabel = (type: string) => {
    switch (type) {
      case "sale":
        return "Sale"
      case "listing":
        return "Listing"
      case "transfer":
        return "Transfer"
      case "mint":
        return "Mint"
      default:
        return type
    }
  }

  if (loading) {
    return (
      <div className="bg-black/40 border border-gold/20 rounded-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-700"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-gray-800 p-4 flex">
              <div className="h-8 w-8 bg-gray-700 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black/40 border border-gold/20 rounded-lg overflow-hidden">
      <div className="bg-black/60 px-4 py-3 text-white font-semibold flex justify-between items-center">
        <span>Recent Activity</span>
        <span className="text-sm text-gray-400">Last 7 days</span>
      </div>

      {activity.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-400">No recent activity for this collection</p>
        </div>
      ) : (
        <div>
          {activity.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-t border-gray-800 p-4 hover:bg-black/20 transition-colors"
            >
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-black/40 border border-gray-700 flex items-center justify-center mr-3">
                  {getActivityIcon(item.type)}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-white font-medium">{item.item}</span>
                      <span className="text-gray-400 text-sm ml-2">{getActivityLabel(item.type)}</span>
                    </div>
                    {item.price && <span className="text-gold font-semibold">{item.price} SOL</span>}
                  </div>

                  <div className="text-sm text-gray-400 mt-1 flex flex-wrap gap-x-4">
                    <span>From: {item.from}</span>
                    <span>To: {item.to}</span>
                    <span>{formatDistanceToNow(new Date(item.timestamp))} ago</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

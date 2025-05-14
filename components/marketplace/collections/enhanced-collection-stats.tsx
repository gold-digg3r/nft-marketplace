"use client"

import { motion } from "framer-motion"
import { Users, ShoppingBag, TrendingUp, Calendar, Wallet, BarChart3, Award } from "lucide-react"
import type { Collection } from "@/types/nft"
import { formatNumber } from "@/lib/utils/formatting"

interface EnhancedCollectionStatsProps {
  collection: Collection
}

export function EnhancedCollectionStats({ collection }: EnhancedCollectionStatsProps) {
  const stats = [
    {
      label: "Items",
      value: collection.totalItems,
      icon: <Users className="h-5 w-5 text-gold" />,
    },
    {
      label: "Floor Price",
      value: `${collection.floorPrice} SOL`,
      icon: <ShoppingBag className="h-5 w-5 text-gold" />,
    },
    {
      label: "Volume Traded",
      value: `${formatNumber(collection.volumeTraded)} SOL`,
      icon: <TrendingUp className="h-5 w-5 text-gold" />,
    },
    {
      label: "Mint Date",
      value: new Date(collection.mintDate).toLocaleDateString(),
      icon: <Calendar className="h-5 w-5 text-gold" />,
    },
  ]

  // Additional stats from the enhanced collection data
  const additionalStats = collection.statistics
    ? [
        {
          label: "Unique Owners",
          value: collection.statistics.uniqueOwners,
          icon: <Wallet className="h-5 w-5 text-gold" />,
        },
        {
          label: "Listed",
          value: `${collection.statistics.listedPercentage}%`,
          icon: <ShoppingBag className="h-5 w-5 text-gold" />,
        },
        {
          label: "Daily Volume",
          value: `${collection.statistics.dailyVolume} SOL`,
          icon: <BarChart3 className="h-5 w-5 text-gold" />,
        },
        {
          label: "Highest Sale",
          value: `${collection.statistics.highestSale} SOL`,
          icon: <Award className="h-5 w-5 text-gold" />,
        },
      ]
    : []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-black/40 border border-gold/20 rounded-lg p-4 flex flex-col"
          >
            <div className="flex items-center mb-2">
              {stat.icon}
              <span className="text-gray-400 text-sm ml-2">{stat.label}</span>
            </div>
            <span className="text-white text-xl font-bold">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      {collection.statistics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="bg-black/40 border border-gold/20 rounded-lg p-4 flex flex-col"
            >
              <div className="flex items-center mb-2">
                {stat.icon}
                <span className="text-gray-400 text-sm ml-2">{stat.label}</span>
              </div>
              <span className="text-white text-xl font-bold">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

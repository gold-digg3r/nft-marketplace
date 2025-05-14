"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { sortLeaderboardData, filterLeaderboardData } from "@/lib/data/leaderboard-utils"
import { formatNumber } from "@/lib/utils/formatting"
import type { LeaderboardEntry } from "@/types/nft"

interface LeaderboardTableProps {
  initialData: LeaderboardEntry[]
}

type SortField =
  | "floorPrice"
  | "volume24h"
  | "volume7d"
  | "volume30d"
  | "volumeAll"
  | "priceChange24h"
  | "priceChange7d"
  | "priceChange30d"
  | "marketCap"
  | "uniqueOwners"

export function LeaderboardTable({ initialData }: LeaderboardTableProps) {
  const [data, setData] = useState<LeaderboardEntry[]>(initialData)
  const [sortField, setSortField] = useState<SortField>("volumeAll")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [timePeriod, setTimePeriod] = useState<"24h" | "7d" | "30d" | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // New field, default to descending
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Handle time period change
  const handleTimePeriodChange = (period: "24h" | "7d" | "30d" | "all") => {
    setTimePeriod(period)

    // Update sort field based on time period for volume
    if (sortField.startsWith("volume")) {
      if (period === "24h") setSortField("volume24h")
      else if (period === "7d") setSortField("volume7d")
      else if (period === "30d") setSortField("volume30d")
      else setSortField("volumeAll")
    }

    // Update sort field based on time period for price change
    if (sortField.startsWith("priceChange")) {
      if (period === "24h") setSortField("priceChange24h")
      else if (period === "7d") setSortField("priceChange7d")
      else if (period === "30d") setSortField("priceChange30d")
      else setSortField("volumeAll") // Default to volume for "all" time
    }
  }

  // Filter and sort data when dependencies change
  useEffect(() => {
    let filteredData = filterLeaderboardData(initialData, timePeriod)

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredData = filteredData.filter((item) => item.name.toLowerCase().includes(query))
    }

    // Sort data
    const sortedData = sortLeaderboardData(filteredData, sortField, sortDirection)
    setData(sortedData)
  }, [initialData, sortField, sortDirection, timePeriod, searchQuery])

  // Get volume field based on time period
  const getVolumeField = (): SortField => {
    if (timePeriod === "24h") return "volume24h"
    if (timePeriod === "7d") return "volume7d"
    if (timePeriod === "30d") return "volume30d"
    return "volumeAll"
  }

  // Get price change field based on time period
  const getPriceChangeField = (): SortField => {
    if (timePeriod === "24h") return "priceChange24h"
    if (timePeriod === "7d") return "priceChange7d"
    if (timePeriod === "30d") return "priceChange30d"
    return "priceChange30d" // Default to 30d for "all" time
  }

  // Format price change with color and arrow
  const formatPriceChange = (change: number) => {
    const isPositive = change >= 0
    const color = isPositive ? "text-green-500" : "text-red-500"
    const Icon = isPositive ? ArrowUp : ArrowDown

    return (
      <div className={`flex items-center ${color}`}>
        <Icon className="h-3 w-3 mr-1" />
        <span>{Math.abs(change).toFixed(2)}%</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Time period tabs */}
        <Tabs
          defaultValue={timePeriod}
          onValueChange={(value) => handleTimePeriodChange(value as any)}
          className="w-full md:w-auto"
        >
          <TabsList className="bg-black/40 border border-gold/20 w-full md:w-auto">
            <TabsTrigger value="24h" className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              24h
            </TabsTrigger>
            <TabsTrigger value="7d" className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              7d
            </TabsTrigger>
            <TabsTrigger value="30d" className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              30d
            </TabsTrigger>
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              All Time
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/40 border-gold/20 text-white w-full"
          />
        </div>
      </div>

      {/* Leaderboard table */}
      <div className="rounded-lg overflow-hidden border border-gold/20">
        <Table>
          <TableHeader className="bg-black/60">
            <TableRow>
              <TableHead className="text-gray-300 w-12 text-center">#</TableHead>
              <TableHead className="text-gray-300">Collection</TableHead>
              <TableHead className="text-gray-300">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-normal text-gray-300 hover:text-gold"
                  onClick={() => handleSort("floorPrice")}
                >
                  Floor Price
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-gray-300">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-normal text-gray-300 hover:text-gold"
                  onClick={() => handleSort(getPriceChangeField())}
                >
                  Price Change
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-gray-300">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-normal text-gray-300 hover:text-gold"
                  onClick={() => handleSort(getVolumeField())}
                >
                  Volume
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-gray-300 hidden md:table-cell">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-normal text-gray-300 hover:text-gold"
                  onClick={() => handleSort("marketCap")}
                >
                  Market Cap
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-gray-300 hidden lg:table-cell">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-normal text-gray-300 hover:text-gold"
                  onClick={() => handleSort("uniqueOwners")}
                >
                  Owners
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                  No collections found matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              data.map((collection, index) => (
                <motion.tr
                  key={collection.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`
                    border-b border-gray-800 hover:bg-black/40 
                    ${index % 2 === 0 ? "bg-black/20" : "bg-black/10"}
                  `}
                >
                  <TableCell className="font-medium text-center text-gray-400">{index + 1}</TableCell>
                  <TableCell>
                    <Link
                      href={`/marketplace/collections/${collection.id}`}
                      className="flex items-center gap-3 hover:text-gold"
                    >
                      <div className="h-10 w-10 relative rounded-full overflow-hidden border border-gold/30">
                        <Image
                          src={collection.logo || "/placeholder.svg"}
                          alt={collection.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-white">{collection.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-white">{collection.floorPrice} SOL</div>
                  </TableCell>
                  <TableCell>
                    {timePeriod === "24h" && formatPriceChange(collection.priceChange24h)}
                    {timePeriod === "7d" && formatPriceChange(collection.priceChange7d)}
                    {timePeriod === "30d" && formatPriceChange(collection.priceChange30d)}
                    {timePeriod === "all" && formatPriceChange(collection.priceChange30d)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-white">
                      {timePeriod === "24h" && `${formatNumber(collection.volume24h)} SOL`}
                      {timePeriod === "7d" && `${formatNumber(collection.volume7d)} SOL`}
                      {timePeriod === "30d" && `${formatNumber(collection.volume30d)} SOL`}
                      {timePeriod === "all" && `${formatNumber(collection.volumeAll)} SOL`}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="font-medium text-white">{formatNumber(collection.marketCap)} SOL</div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{collection.uniqueOwners}</span>
                      <Badge className="bg-gold/10 text-gold border-gold/30 text-xs">
                        {collection.ownershipPercentage.toFixed(0)}%
                      </Badge>
                    </div>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

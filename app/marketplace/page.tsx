"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Coins, Tag, Filter, SlidersHorizontal, Search, Grid3X3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useMarketplace } from "@/app/context/marketplace-context"
import { FeaturedCharacters } from "@/components/marketplace/featured-characters"
import { CollectionBanner } from "@/components/marketplace/collection-banner"
import { motion } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"

// Create a custom hook to safely access wallet
// function useSafeWallet() {
//   // Default wallet state when not available
//   const defaultWallet = {
//     publicKey: null,
//     connected: false,
//   }

//   // Try to dynamically import the wallet adapter
//   const [wallet, setWallet] = useState(defaultWallet)

//   useEffect(() => {
//     // Dynamically import the wallet adapter to avoid SSR issues
//     const loadWallet = async () => {
//       try {
//         const { useWallet } = await import("@solana/wallet-adapter-react")
//         // We need to call the hook in a useEffect to follow React rules
//         const walletContext = useWallet()
//         setWallet(walletContext)
//       } catch (error) {
//         console.error("Failed to load wallet adapter:", error)
//       }
//     }

//     loadWallet()
//   }, [])

//   return wallet
// }

export default function MarketplacePage() {
  // Use our safe wallet hook instead of direct import
  // const wallet = useSafeWallet()
  const wallet = useWallet()

  const {
    filteredListings,
    userNFTs,
    isLoading,
    isProcessing,
    selectedListing,
    setSelectedListing,
    selectedCharacter,
    setSelectedCharacter,
    showBuyDialog,
    setShowBuyDialog,
    showListDialog,
    setShowListDialog,
    showCharacterDetails,
    setShowCharacterDetails,
    handleBuy,
    handleList,
    filters,
    updateFilter,
    refreshListings,
  } = useMarketplace()

  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    updateFilter("search", e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const openBuyDialog = (listing: any) => {
    if (listing) {
      setSelectedListing(listing)
      setShowBuyDialog(true)
    }
  }

  const openListDialog = (character: any) => {
    if (character) {
      setSelectedCharacter(character)
      setShowListDialog(true)
    }
  }

  const openCharacterDetails = (character: any) => {
    if (character) {
      setSelectedCharacter(character)
      setShowCharacterDetails(true)
    }
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentListings = filteredListings ? filteredListings.slice(indexOfFirstItem, indexOfLastItem) : []
  const totalPages = filteredListings ? Math.ceil(filteredListings.length / itemsPerPage) : 0

  // Rarity options
  const rarityOptions = [
    { value: "all", label: "All Rarities" },
    { value: "common", label: "Common" },
    { value: "uncommon", label: "Uncommon" },
    { value: "rare", label: "Rare" },
    { value: "epic", label: "Epic" },
    { value: "legendary", label: "Legendary" },
    { value: "mythic", label: "Mythic" },
  ]

  // Price range options - Updated to use SOL with smaller values
  const priceRangeOptions = [
    { value: "all", label: "Any Price" },
    { value: "0-0.5", label: "< 0.5 SOL" },
    { value: "0.5-1", label: "0.5 - 1 SOL" },
    { value: "1-2.5", label: "1 - 2.5 SOL" },
    { value: "2.5+", label: "> 2.5 SOL" },
  ]

  // Fetch marketplace data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      await refreshListings()
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0">
            <Image
              src="/images/marketplace/marketplace-bg.png"
              alt="Marketplace Background"
              width={1200}
              height={600}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="relative z-10">
            <Badge variant="gold" className="px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-6">
              <span className="text-gold text-sm font-medium">MARKETPLACE</span>
            </Badge>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Jailbirds <span className="text-gold">Marketplace</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-300 text-lg max-w-3xl mx-auto mb-8"
            >
              Buy and sell Jailbirds NFTs in the Gold Digger marketplace. Find rare characters to complete your
              collection and earn more DIGR through staking.
            </motion.p>

            {/* Collections Button */}
            <Link href="/marketplace/collections">
              <Button className="flex items-center gap-2 bg-gold/20 text-gold hover:bg-gold/30 border border-gold/50">
                <Grid3X3 className="h-4 w-4" />
                Browse Collections
              </Button>
            </Link>
          </div>
        </div>

        {/* Collection Banner */}
        <CollectionBanner />

        {/* Featured Characters Section */}
        <FeaturedCharacters onViewDetails={openCharacterDetails} onBuy={openBuyDialog} />

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="bg-black/40 border border-gold/20 mb-6 w-full md:w-auto">
            <TabsTrigger
              value="buy"
              className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold flex-1 md:flex-none"
            >
              <Coins className="h-4 w-4 mr-2 text-gold" />
              Mint NFTs
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold flex-1 md:flex-none"
            >
              <Tag className="h-4 w-4 mr-2 text-gold" />
              Sell Characters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-0">
            {/* Search and filter bar */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search characters..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 bg-black/40 border-gold/20 text-white"
                />
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <select
                    value={filters.rarity}
                    onChange={(e) => updateFilter("rarity", e.target.value)}
                    className="appearance-none bg-black/40 border border-gold/20 text-white rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-gold/50"
                  >
                    {rarityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <SlidersHorizontal className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={filters.priceRange}
                    onChange={(e) => updateFilter("priceRange", e.target.value)}
                    className="appearance-none bg-black/40 border border-gold/20 text-white rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-gold/50"
                  >
                    {priceRangeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <SlidersHorizontal className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 border-gold/30 text-gold hover:bg-gold/10"
                  variant="outline"
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">More Filters</span>
                </Button>
              </div>
            </div>

            {/* Advanced filters (collapsible) */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-black/40 border border-gold/20 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Additional filter options would go here */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => updateFilter("sortBy", e.target.value)}
                      className="w-full bg-black/60 border border-gold/20 text-white rounded-md px-3 py-2"
                    >
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="rarity">Rarity</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Character Type</label>
                    <select
                      value={filters.characterType}
                      onChange={(e) => updateFilter("characterType", e.target.value)}
                      className="w-full bg-black/60 border border-gold/20 text-white rounded-md px-3 py-2"
                    >
                      <option value="all">All Types</option>
                      <option value="guard">Guard</option>
                      <option value="inmate">Inmate</option>
                      <option value="warden">Warden</option>
                      <option value="visitor">Visitor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Collection</label>
                    <select
                      value={filters.collection || "all"}
                      onChange={(e) => updateFilter("collection", e.target.value)}
                      className="w-full bg-black/60 border border-gold/20 text-white rounded-md px-3 py-2"
                    >
                      <option value="all">All Collections</option>
                      <option value="jailbirds">Jailbirds</option>
                      <option value="syndicate">The Syndicate</option>
                      <option value="guardians">The Guardians</option>
                      <option value="escapists">The Escapists</option>
                      <option value="wardens">The Wardens</option>
                      <option value="gold-diggers">Gold Diggers</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => {
                      // Reset all filters
                      updateFilter("rarity", "all")
                      updateFilter("priceRange", "all")
                      updateFilter("sortBy", "newest")
                      updateFilter("characterType", "all")
                      updateFilter("paymentMethod", "all")
                      updateFilter("collection", "all")
                      updateFilter("search", "")
                      setSearchQuery("")
                      setCurrentPage(1)
                    }}
                    variant="secondary"
                    className="text-sm"
                  >
                    Reset Filters
                  </Button>
                </div>
              </motion.div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Loading skeletons would go here */}
              </div>
            ) : (
              <div>{/* Marketplace listings would go here */}</div>
            )}
          </TabsContent>

          <TabsContent value="sell" className="mt-0">
            {/* Sell content would go here */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

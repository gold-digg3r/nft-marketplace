"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getAllMarketplaceCharacters } from "@/lib/data/character-utils"

// Define the shape of our marketplace context
interface MarketplaceContextType {
  filteredListings: any[]
  userNFTs: any[]
  isLoading: boolean
  isProcessing: boolean
  selectedListing: any | null
  setSelectedListing: (listing: any | null) => void
  selectedCharacter: any | null
  setSelectedCharacter: (character: any | null) => void
  showBuyDialog: boolean
  setShowBuyDialog: (show: boolean) => void
  showListDialog: boolean
  setShowListDialog: (show: boolean) => void
  showCharacterDetails: boolean
  setShowCharacterDetails: (show: boolean) => void
  handleBuy: (listing: any) => Promise<void>
  handleList: (character: any, price: number) => Promise<void>
  filters: {
    rarity: string
    priceRange: string
    sortBy: string
    characterType: string
    paymentMethod: string
    collection?: string
    search?: string
  }
  updateFilter: (key: string, value: string) => void
  refreshListings: () => Promise<void>
}

// Create the context with default values
const MarketplaceContext = createContext<MarketplaceContextType>({
  filteredListings: [],
  userNFTs: [],
  isLoading: false,
  isProcessing: false,
  selectedListing: null,
  setSelectedListing: () => {},
  selectedCharacter: null,
  setSelectedCharacter: () => {},
  showBuyDialog: false,
  setShowBuyDialog: () => {},
  showListDialog: false,
  setShowListDialog: () => {},
  showCharacterDetails: false,
  setShowCharacterDetails: () => {},
  handleBuy: async () => {},
  handleList: async () => {},
  filters: {
    rarity: "all",
    priceRange: "all",
    sortBy: "newest",
    characterType: "all",
    paymentMethod: "all",
  },
  updateFilter: () => {},
  refreshListings: async () => {},
})

// Provider component
export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<any[]>([])
  const [filteredListings, setFilteredListings] = useState<any[]>([])
  const [userNFTs, setUserNFTs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedListing, setSelectedListing] = useState<any | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null)
  const [showBuyDialog, setShowBuyDialog] = useState(false)
  const [showListDialog, setShowListDialog] = useState(false)
  const [showCharacterDetails, setShowCharacterDetails] = useState(false)
  const [filters, setFilters] = useState({
    rarity: "all",
    priceRange: "all",
    sortBy: "newest",
    characterType: "all",
    paymentMethod: "all",
    collection: "all",
    search: "",
  })

  // Function to update a specific filter
  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Function to refresh listings
  const refreshListings = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would fetch from an API
      const characters = await getAllMarketplaceCharacters()

      // Transform characters into listings format
      const marketplaceListings = characters.map((character) => ({
        id: character.id,
        character: character,
        price: character.price || 0,
        currency: "SOL",
        seller_id: character.owner || "",
        created_at: character.createdAt || new Date().toISOString(),
      }))

      setListings(marketplaceListings)
      setFilteredListings(marketplaceListings)
    } catch (error) {
      console.error("Failed to fetch marketplace listings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Apply filters whenever they change
  useEffect(() => {
    if (listings.length === 0) return

    let result = [...listings]

    // Filter by rarity
    if (filters.rarity !== "all") {
      result = result.filter((listing) => listing.character?.rarity?.toLowerCase() === filters.rarity.toLowerCase())
    }

    // Filter by price range
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map((val) => Number.parseFloat(val) || 0)
      if (filters.priceRange.endsWith("+")) {
        result = result.filter((listing) => listing.price >= min)
      } else {
        result = result.filter((listing) => listing.price >= min && listing.price <= max)
      }
    }

    // Filter by character type
    if (filters.characterType !== "all") {
      result = result.filter(
        (listing) => listing.character?.type?.toLowerCase() === filters.characterType.toLowerCase(),
      )
    }

    // Filter by collection
    if (filters.collection && filters.collection !== "all") {
      result = result.filter(
        (listing) => listing.character?.collection?.toLowerCase() === filters.collection.toLowerCase(),
      )
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(
        (listing) =>
          listing.character?.name?.toLowerCase().includes(searchTerm) ||
          listing.character?.description?.toLowerCase().includes(searchTerm),
      )
    }

    // Sort results
    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === "newest") {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (filters.sortBy === "rarity") {
      const rarityOrder = {
        common: 1,
        uncommon: 2,
        rare: 3,
        epic: 4,
        legendary: 5,
        mythic: 6,
      }
      result.sort((a, b) => {
        const rarityA = a.character?.rarity?.toLowerCase() || "common"
        const rarityB = b.character?.rarity?.toLowerCase() || "common"
        return (
          (rarityOrder[rarityB as keyof typeof rarityOrder] || 0) -
          (rarityOrder[rarityA as keyof typeof rarityOrder] || 0)
        )
      })
    }

    setFilteredListings(result)
  }, [listings, filters])

  // Mock function to handle buying an NFT
  const handleBuy = async (listing: any) => {
    setIsProcessing(true)
    try {
      // In a real app, this would call a blockchain transaction
      console.log("Buying listing:", listing)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update listings (remove the bought item)
      setListings((prev) => prev.filter((item) => item.id !== listing.id))

      // Close dialog
      setShowBuyDialog(false)

      // Success message would be shown here
    } catch (error) {
      console.error("Failed to buy NFT:", error)
      // Error message would be shown here
    } finally {
      setIsProcessing(false)
    }
  }

  // Mock function to handle listing an NFT
  const handleList = async (character: any, price: number) => {
    setIsProcessing(true)
    try {
      // In a real app, this would call a blockchain transaction
      console.log("Listing character:", character, "for price:", price)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update listings (add the new listing)
      const newListing = {
        id: `listing-${Date.now()}`,
        character: character,
        price: price,
        currency: "SOL",
        seller_id: "current-user-wallet-address",
        created_at: new Date().toISOString(),
      }

      setListings((prev) => [newListing, ...prev])

      // Close dialog
      setShowListDialog(false)

      // Success message would be shown here
    } catch (error) {
      console.error("Failed to list NFT:", error)
      // Error message would be shown here
    } finally {
      setIsProcessing(false)
    }
  }

  // Load initial data
  useEffect(() => {
    refreshListings()
  }, [])

  // Context value
  const value = {
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
  }

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>
}

// Custom hook to use the marketplace context
export function useMarketplace() {
  const context = useContext(MarketplaceContext)
  if (context === undefined) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider")
  }
  return context
}

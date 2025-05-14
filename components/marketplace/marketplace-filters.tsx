"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MarketplaceFiltersProps {
  onFilterChange?: (filters: any) => void
}

export function MarketplaceFilters({ onFilterChange }: MarketplaceFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    rarity: "all",
    priceRange: "all",
    sortBy: "newest",
    characterType: "all",
    paymentMethod: "all",
  })

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

  // Price range options
  const priceRangeOptions = [
    { value: "all", label: "Any Price" },
    { value: "0-0.5", label: "< 0.5 SOL" },
    { value: "0.5-1", label: "0.5 - 1 SOL" },
    { value: "1-2.5", label: "1 - 2.5 SOL" },
    { value: "2.5+", label: "> 2.5 SOL" },
  ]

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    if (onFilterChange) {
      onFilterChange(newFilters)
    }
  }

  const resetFilters = () => {
    const defaultFilters = {
      search: "",
      rarity: "all",
      priceRange: "all",
      sortBy: "newest",
      characterType: "all",
      paymentMethod: "all",
    }
    setFilters(defaultFilters)
    if (onFilterChange) {
      onFilterChange(defaultFilters)
    }
  }

  return (
    <div className="bg-black/40 border border-gold/20 rounded-lg p-4 sticky top-24">
      <h3 className="text-lg font-semibold mb-4 text-white">Filters</h3>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search characters..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-10 bg-black/40 border-gold/20 text-white"
          />
        </div>
      </div>

      {/* Rarity Filter */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Rarity</label>
        <select
          value={filters.rarity}
          onChange={(e) => handleFilterChange("rarity", e.target.value)}
          className="w-full bg-black/40 border border-gold/20 text-white rounded-md px-3 py-2"
        >
          {rarityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Price Range</label>
        <select
          value={filters.priceRange}
          onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          className="w-full bg-black/40 border border-gold/20 text-white rounded-md px-3 py-2"
        >
          {priceRangeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          className="w-full bg-black/40 border border-gold/20 text-white rounded-md px-3 py-2"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="rarity">Rarity</option>
        </select>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-gold hover:text-gold/80 mb-4 text-sm"
      >
        <SlidersHorizontal className="h-4 w-4" />
        {showAdvanced ? "Hide Advanced Filters" : "Show Advanced Filters"}
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-4 border-t border-gold/20 pt-4">
          {/* Character Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Character Type</label>
            <select
              value={filters.characterType}
              onChange={(e) => handleFilterChange("characterType", e.target.value)}
              className="w-full bg-black/40 border border-gold/20 text-white rounded-md px-3 py-2"
            >
              <option value="all">All Types</option>
              <option value="guard">Guard</option>
              <option value="inmate">Inmate</option>
              <option value="warden">Warden</option>
              <option value="visitor">Visitor</option>
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Payment Method</label>
            <select
              value={filters.paymentMethod}
              onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
              className="w-full bg-black/40 border border-gold/20 text-white rounded-md px-3 py-2"
            >
              <option value="all">All Methods</option>
              <option value="sol">SOL Only</option>
              <option value="usdc">USDC Only</option>
            </select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.rarity !== "all" && (
              <Badge variant="outline" className="bg-gold/10 text-gold border-gold/30">
                Rarity: {filters.rarity}
                <button className="ml-2 text-xs" onClick={() => handleFilterChange("rarity", "all")}>
                  ×
                </button>
              </Badge>
            )}
            {filters.priceRange !== "all" && (
              <Badge variant="outline" className="bg-gold/10 text-gold border-gold/30">
                Price: {filters.priceRange}
                <button className="ml-2 text-xs" onClick={() => handleFilterChange("priceRange", "all")}>
                  ×
                </button>
              </Badge>
            )}
            {filters.characterType !== "all" && (
              <Badge variant="outline" className="bg-gold/10 text-gold border-gold/30">
                Type: {filters.characterType}
                <button className="ml-2 text-xs" onClick={() => handleFilterChange("characterType", "all")}>
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Reset Filters */}
      <div className="mt-6">
        <Button onClick={resetFilters} variant="secondary" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  )
}

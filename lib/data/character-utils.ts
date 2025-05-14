import type { Character } from "@/app/types/character"
import { characters } from "@/app/data/characters"
import { marketplaceListings } from "@/app/data/marketplace-listings"

/**
 * Get a character by ID
 */
export async function getCharacterById(id: string): Promise<Character | undefined> {
  // First check marketplace listings
  const marketplaceCharacter = marketplaceListings.find((listing) => listing.id === id)
  if (marketplaceCharacter) {
    return marketplaceCharacter
  }

  // Then check all characters
  return characters.find((character) => character.id === id)
}

/**
 * Get related characters based on the current character
 */
export async function getRelatedCharacters(currentId: string, rarity?: string, limit = 4): Promise<Character[]> {
  // Filter out the current character
  const filtered = marketplaceListings.filter((character) => character.id !== currentId)

  // If rarity is provided, prioritize characters with the same rarity
  let related: Character[] = []

  if (rarity) {
    const sameRarity = filtered.filter((character) => character.rarity === rarity)
    related = [...sameRarity]
  }

  // Add other characters until we reach the limit
  if (related.length < limit) {
    const others = filtered.filter((character) => !related.includes(character))
    related = [...related, ...others].slice(0, limit)
  } else {
    related = related.slice(0, limit)
  }

  return related
}

/**
 * Get all characters for the marketplace
 */
export async function getAllMarketplaceCharacters(): Promise<Character[]> {
  return marketplaceListings
}

/**
 * Get featured characters for the marketplace
 */
export async function getFeaturedCharacters(limit = 3): Promise<Character[]> {
  // Sort by price descending to get the most valuable characters
  const sorted = [...marketplaceListings].sort((a, b) => (b.price || 0) - (a.price || 0))
  return sorted.slice(0, limit)
}

/**
 * Filter characters by various criteria
 */
export async function filterCharacters(options: {
  rarity?: string
  minPrice?: number
  maxPrice?: number
  collection?: string
  searchTerm?: string
}): Promise<Character[]> {
  const { rarity, minPrice, maxPrice, collection, searchTerm } = options

  return marketplaceListings.filter((character) => {
    // Filter by rarity
    if (rarity && character.rarity !== rarity) {
      return false
    }

    // Filter by price range
    if (minPrice !== undefined && (character.price || 0) < minPrice) {
      return false
    }
    if (maxPrice !== undefined && (character.price || 0) > maxPrice) {
      return false
    }

    // Filter by collection
    if (collection && character.collection !== collection) {
      return false
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return character.name.toLowerCase().includes(term) || character.description?.toLowerCase().includes(term) || false
    }

    return true
  })
}

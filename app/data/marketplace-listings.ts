import { characters } from "./characters"

// Create marketplace listings from characters
export const marketplaceListings = characters.map((character) => ({
  ...character,
  listed: true,
  // Add some random variation to the listing dates
  createdAt: new Date(
    new Date(character.createdAt).getTime() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
  ).toISOString(),
}))

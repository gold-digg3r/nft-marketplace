import type { Collection, PriceHistoryPoint } from "@/types/nft"
import { characters } from "@/app/data/characters" // Import characters directly

// Helper function to generate price history data
function generatePriceHistory(days: number, startPrice: number, volatility = 0.1): PriceHistoryPoint[] {
  const history: PriceHistoryPoint[] = []
  let currentPrice = startPrice

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // Random price fluctuation
    const change = (Math.random() - 0.5) * volatility
    currentPrice = Math.max(0.1, currentPrice * (1 + change))

    // Random volume between 5 and 30
    const volume = Math.floor(Math.random() * 25) + 5

    history.push({
      date: date.toISOString().split("T")[0],
      price: Number.parseFloat(currentPrice.toFixed(2)),
      volume,
    })
  }

  return history
}

export const collections: Collection[] = [
  {
    id: "jailbirds",
    name: "Jailbirds",
    description:
      "The original Jailbirds collection featuring inmates, guards, wardens, and visitors from the notorious Gold Digger Penitentiary.",
    bannerImage: "/images/collections/jailbirds-banner.png",
    logoImage: "/images/collections/jailbirds-logo.png",
    themeColor: "#FFD700", // Gold
    totalItems: 24,
    floorPrice: 0.8,
    volumeTraded: 450,
    creator: "Gold Digger Studios",
    creatorAddress: "GD5x7dB...",
    mintDate: "2023-09-15",
    tags: ["original", "characters", "prison"],
    featured: true,
    story:
      "The Jailbirds collection represents the core characters of the Gold Digger universe. Set in a futuristic prison facility where inmates mine digital gold, these characters form the backbone of the ecosystem's narrative.",
    lore: "In the year 2142, the world's most dangerous criminals are sent to the Gold Digger Penitentiary, a maximum-security facility built over the largest digital gold mine ever discovered. Inmates are forced to mine DIGR tokens, while guards maintain order and wardens oversee the entire operation. The prison has become its own micro-economy, with power struggles, alliances, and a complex social hierarchy.",
    priceHistory: generatePriceHistory(30, 0.5, 0.15),
    rarityDistribution: [
      { rarity: "Common", percentage: 50, count: 12 },
      { rarity: "Uncommon", percentage: 25, count: 6 },
      { rarity: "Rare", percentage: 15, count: 4 },
      { rarity: "Epic", percentage: 7, count: 1 },
      { rarity: "Legendary", percentage: 3, count: 1 },
    ],
    attributes: [
      {
        name: "Role",
        values: [
          { name: "Inmate", count: 12, percentage: 50 },
          { name: "Guard", count: 8, percentage: 33 },
          { name: "Warden", count: 2, percentage: 8 },
          { name: "Visitor", count: 2, percentage: 8 },
        ],
      },
      {
        name: "Background",
        values: [
          { name: "Cell Block", count: 10, percentage: 42 },
          { name: "Yard", count: 6, percentage: 25 },
          { name: "Mess Hall", count: 4, percentage: 17 },
          { name: "Warden's Office", count: 2, percentage: 8 },
          { name: "Solitary", count: 2, percentage: 8 },
        ],
      },
    ],
    statistics: {
      holders: 18,
      uniqueOwners: 14,
      listedPercentage: 25,
      averagePrice: 0.95,
      highestSale: 2.5,
      lowestSale: 0.4,
      dailyVolume: 3.2,
      weeklyVolume: 18.5,
      monthlyVolume: 65.3,
    },
    team: [
      {
        name: "Alex Warden",
        role: "Lead Artist",
        avatar: "/images/team/alex-warden.png",
        bio: "Digital artist specializing in character design with 10+ years of experience in the gaming industry.",
      },
      {
        name: "Sam Lockwood",
        role: "Narrative Designer",
        avatar: "/images/team/sam-lockwood.png",
        bio: "Former game writer who crafted the rich lore and backstories for each Jailbird character.",
      },
    ],
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com/jailbirds" },
      { platform: "Discord", url: "https://discord.gg/jailbirds" },
    ],
    roadmap: [
      {
        title: "Initial Release",
        description: "Launch of the first 24 Jailbirds characters",
        date: "2023-09-15",
        completed: true,
      },
      {
        title: "Staking Rewards",
        description: "Implementation of DIGR token rewards for staking Jailbirds NFTs",
        date: "2023-11-01",
        completed: true,
      },
      {
        title: "Character Missions",
        description: "Interactive missions for Jailbirds characters to earn additional rewards",
        date: "2024-01-15",
        completed: false,
      },
      {
        title: "Jailbirds Expansion",
        description: "Release of 12 new Jailbirds characters with enhanced attributes",
        date: "2024-06-01",
        completed: false,
      },
    ],
  },
  {
    id: "syndicate",
    name: "The Syndicate",
    description:
      "Elite criminal masterminds who operate both inside and outside the prison walls. Known for their cunning and influence.",
    bannerImage: "/images/collections/syndicate-banner.png",
    logoImage: "/images/collections/syndicate-logo.png",
    themeColor: "#800020", // Burgundy
    totalItems: 12,
    floorPrice: 1.2,
    volumeTraded: 320,
    creator: "Gold Digger Studios",
    creatorAddress: "GD5x7dB...",
    mintDate: "2023-11-10",
    tags: ["villains", "crime", "elite"],
    featured: true,
    story:
      "The Syndicate represents the criminal elite of the Gold Digger universe. These masterminds control vast networks of influence both inside and outside the prison walls, manipulating the flow of DIGR tokens and contraband.",
    lore: "When the Gold Digger Penitentiary was established, it didn't take long for the most intelligent and ruthless inmates to form a shadow organization known as The Syndicate. Through bribery, blackmail, and strategic alliances, they've established a criminal empire that extends beyond the prison walls. They control much of the black market DIGR trade and have informants in every cell block.",
    priceHistory: generatePriceHistory(30, 0.9, 0.2),
    rarityDistribution: [
      { rarity: "Uncommon", percentage: 33, count: 4 },
      { rarity: "Rare", percentage: 42, count: 5 },
      { rarity: "Epic", percentage: 17, count: 2 },
      { rarity: "Legendary", percentage: 8, count: 1 },
    ],
    attributes: [
      {
        name: "Specialization",
        values: [
          { name: "Hacker", count: 3, percentage: 25 },
          { name: "Enforcer", count: 3, percentage: 25 },
          { name: "Smuggler", count: 2, percentage: 17 },
          { name: "Fixer", count: 2, percentage: 17 },
          { name: "Mastermind", count: 2, percentage: 17 },
        ],
      },
      {
        name: "Influence Level",
        values: [
          { name: "Local", count: 5, percentage: 42 },
          { name: "Regional", count: 4, percentage: 33 },
          { name: "Global", count: 3, percentage: 25 },
        ],
      },
    ],
    statistics: {
      holders: 10,
      uniqueOwners: 8,
      listedPercentage: 17,
      averagePrice: 1.4,
      highestSale: 3.8,
      lowestSale: 0.9,
      dailyVolume: 2.8,
      weeklyVolume: 14.2,
      monthlyVolume: 48.5,
    },
    roadmap: [
      {
        title: "Syndicate Launch",
        description: "Initial release of The Syndicate collection",
        date: "2023-11-10",
        completed: true,
      },
      {
        title: "Syndicate Operations",
        description: "Special missions and operations exclusive to Syndicate holders",
        date: "2024-02-15",
        completed: false,
      },
      {
        title: "Underworld Expansion",
        description: "Introduction of new Syndicate characters and expanded criminal network",
        date: "2024-08-01",
        completed: false,
      },
    ],
  },
  // Other collections with similar detailed data...
  {
    id: "guardians",
    name: "The Guardians",
    description:
      "Elite prison guards with special abilities and advanced technology. They maintain order in the most chaotic situations.",
    bannerImage: "/images/collections/guardians-banner.png",
    logoImage: "/images/collections/guardians-logo.png",
    themeColor: "#1E3A8A", // Dark blue
    totalItems: 10,
    floorPrice: 1.5,
    volumeTraded: 280,
    creator: "Gold Digger Studios",
    creatorAddress: "GD5x7dB...",
    mintDate: "2024-01-22",
    tags: ["guards", "heroes", "authority"],
    featured: true,
    priceHistory: generatePriceHistory(30, 1.2, 0.15),
    rarityDistribution: [
      { rarity: "Rare", percentage: 50, count: 5 },
      { rarity: "Epic", percentage: 30, count: 3 },
      { rarity: "Legendary", percentage: 20, count: 2 },
    ],
  },
  {
    id: "escapists",
    name: "The Escapists",
    description: "Legendary inmates known for their daring escape attempts and the chaos they leave in their wake.",
    bannerImage: "/images/collections/escapists-banner.png",
    logoImage: "/images/collections/escapists-logo.png",
    themeColor: "#FF4500", // Orange-red
    totalItems: 8,
    floorPrice: 2.1,
    volumeTraded: 310,
    creator: "Gold Digger Studios",
    creatorAddress: "GD5x7dB...",
    mintDate: "2024-02-15",
    tags: ["rebels", "escape", "notorious"],
    featured: false,
    priceHistory: generatePriceHistory(30, 1.8, 0.25),
    rarityDistribution: [
      { rarity: "Epic", percentage: 62.5, count: 5 },
      { rarity: "Legendary", percentage: 37.5, count: 3 },
    ],
  },
  {
    id: "wardens",
    name: "The Wardens",
    description:
      "The most powerful figures in the prison hierarchy, each with their own management style and dark secrets.",
    bannerImage: "/images/collections/wardens-banner.png",
    logoImage: "/images/collections/wardens-logo.png",
    themeColor: "#2E8B57", // Sea green
    totalItems: 5,
    floorPrice: 3.2,
    volumeTraded: 290,
    creator: "Gold Digger Studios",
    creatorAddress: "GD5x7dB...",
    mintDate: "2024-03-01",
    tags: ["authority", "power", "leadership"],
    featured: false,
    priceHistory: generatePriceHistory(30, 2.5, 0.2),
    rarityDistribution: [
      { rarity: "Epic", percentage: 40, count: 2 },
      { rarity: "Legendary", percentage: 60, count: 3 },
    ],
  },
  {
    id: "gold-diggers",
    name: "Gold Diggers",
    description:
      "The original Gold Diggers collection featuring the most iconic characters who started it all. These are the OGs of the Gold Digger universe.",
    bannerImage: "/images/collections/gold-diggers-banner.png",
    logoImage: "/images/collections/gold-diggers-logo.png",
    themeColor: "#DAA520", // Golden rod
    totalItems: 15,
    floorPrice: 2.5,
    volumeTraded: 520,
    creator: "Gold Digger Studios",
    creatorAddress: "GD5x7dB...",
    mintDate: "2023-08-01",
    tags: ["original", "iconic", "founders"],
    featured: true,
    priceHistory: generatePriceHistory(30, 2.0, 0.18),
    rarityDistribution: [
      { rarity: "Rare", percentage: 40, count: 6 },
      { rarity: "Epic", percentage: 40, count: 6 },
      { rarity: "Legendary", percentage: 20, count: 3 },
    ],
    statistics: {
      holders: 12,
      uniqueOwners: 10,
      listedPercentage: 20,
      averagePrice: 2.8,
      highestSale: 5.2,
      lowestSale: 1.5,
      dailyVolume: 4.5,
      weeklyVolume: 22.3,
      monthlyVolume: 78.6,
    },
  },
]

// Get all collections
export function getAllCollections(): Collection[] {
  return collections
}

// Get featured collections
export function getFeaturedCollections(): Collection[] {
  return collections.filter((collection) => collection.featured)
}

// Get collection by ID
export function getCollectionById(id: string): Collection | undefined {
  return collections.find((collection) => collection.id === id)
}

// Get characters by collection ID - Updated to use ES module imports
export function getCharactersByCollection(collectionId: string): any[] {
  // Filter characters by collection
  return characters.filter((character) => character.collection === collectionId)
}

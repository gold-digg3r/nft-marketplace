import type { Character } from "@/app/types/character"

// Generate a random price between min and max
function randomPrice(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2))
}

// Generate a random mint address
function randomMintAddress(): string {
  return `mint${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
}

// Generate a random owner address
function randomOwner(): string {
  return `owner${Math.random().toString(36).substring(2, 10)}`
}

// Character data
export const characters: Character[] = [
  // Jailbirds Collection - Inmates
  {
    id: "jb-inmate-001",
    name: "Grimshaw",
    image: "/placeholder.svg?key=j6jki",
    description:
      "A notorious bank robber with a talent for lockpicking. Known for his elaborate tattoos that tell the story of his criminal career.",
    collection: "jailbirds",
    rarity: "Legendary",
    price: 2.5,
    attributes: {
      strength: 75,
      intelligence: 85,
      defense: 60,
      speed: 70,
      charisma: 65,
      luck: 90,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-09-15T12:00:00Z",
    type: "inmate",
  },
  {
    id: "jb-inmate-002",
    name: "Rusty",
    image: "/placeholder.svg?key=5wa40",
    description:
      "An old-timer who's been in prison longer than most guards have been alive. Has connections throughout the prison system.",
    collection: "jailbirds",
    rarity: "Epic",
    price: 1.8,
    attributes: {
      strength: 50,
      intelligence: 90,
      defense: 65,
      speed: 40,
      charisma: 85,
      luck: 75,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-09-15T12:00:00Z",
    type: "inmate",
  },
  {
    id: "jb-inmate-003",
    name: "Knuckles",
    image: "/placeholder.svg?key=xuhkr",
    description:
      "Former boxer who doesn't say much but lets his fists do the talking. Respected and feared by inmates and guards alike.",
    collection: "jailbirds",
    rarity: "Rare",
    price: 1.2,
    attributes: {
      strength: 95,
      intelligence: 60,
      defense: 85,
      speed: 75,
      charisma: 50,
      luck: 65,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-09-15T12:00:00Z",
    type: "inmate",
  },
  {
    id: "jb-inmate-004",
    name: "Fingers",
    image: "/placeholder.svg?key=zw4do",
    description:
      "The best pickpocket on the outside, now the best thief on the inside. Can steal almost anything from anyone.",
    collection: "jailbirds",
    rarity: "Uncommon",
    price: 0.8,
    attributes: {
      strength: 45,
      intelligence: 80,
      defense: 50,
      speed: 90,
      charisma: 70,
      luck: 85,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-09-15T12:00:00Z",
    type: "inmate",
  },

  // Jailbirds Collection - Guards
  {
    id: "jb-guard-001",
    name: "Sergeant Steel",
    image: "/placeholder.svg?key=j98ci",
    description: "A no-nonsense guard who's been working at the prison for 25 years. Knows every trick in the book.",
    collection: "jailbirds",
    rarity: "Epic",
    price: 1.7,
    attributes: {
      strength: 80,
      intelligence: 75,
      defense: 90,
      speed: 65,
      charisma: 60,
      luck: 70,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-09-15T12:00:00Z",
    type: "guard",
  },
  {
    id: "jb-guard-002",
    name: "Rookie",
    image: "/placeholder.svg?height=500&width=500&query=young+nervous+prison+guard",
    description: "Fresh out of training, still learning the ropes. Easily manipulated but has a good heart.",
    collection: "jailbirds",
    rarity: "Common",
    price: 0.5,
    attributes: {
      strength: 65,
      intelligence: 60,
      defense: 55,
      speed: 70,
      charisma: 75,
      luck: 50,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-09-15T12:00:00Z",
    type: "guard",
  },

  // Jailbirds Collection - Wardens
  {
    id: "jb-warden-001",
    name: "Warden Blackwood",
    image: "/placeholder.svg?height=500&width=500&query=stern+prison+warden+in+suit",
    description:
      "The iron-fisted ruler of the prison. His word is law, and he's not afraid to make examples of troublemakers.",
    collection: "jailbirds",
    rarity: "Legendary",
    price: 2.8,
    attributes: {
      strength: 70,
      intelligence: 90,
      defense: 85,
      speed: 60,
      charisma: 80,
      luck: 75,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-09-15T12:00:00Z",
    type: "warden",
  },

  // Syndicate Collection
  {
    id: "syn-001",
    name: "The Mastermind",
    image: "/placeholder.svg?height=500&width=500&query=criminal+mastermind+in+shadows",
    description:
      "The enigmatic leader of The Syndicate. Nobody knows their true identity, but their influence extends far beyond the prison walls.",
    collection: "syndicate",
    rarity: "Legendary",
    price: 3.2,
    attributes: {
      strength: 65,
      intelligence: 98,
      defense: 80,
      speed: 75,
      charisma: 90,
      luck: 85,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-11-10T12:00:00Z",
    type: "mastermind",
  },
  {
    id: "syn-002",
    name: "The Hacker",
    image: "/placeholder.svg?height=500&width=500&query=cyberpunk+hacker+with+prison+tattoos",
    description:
      "A digital genius who can break into any system. Runs the Syndicate's information network from within the prison.",
    collection: "syndicate",
    rarity: "Epic",
    price: 1.9,
    attributes: {
      strength: 45,
      intelligence: 95,
      defense: 60,
      speed: 80,
      charisma: 70,
      luck: 75,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-11-10T12:00:00Z",
    type: "hacker",
  },

  // Guardians Collection
  {
    id: "guard-001",
    name: "Captain Justice",
    image: "/placeholder.svg?height=500&width=500&query=elite+prison+guard+with+advanced+armor",
    description:
      "Leader of the elite Guardians unit. Equipped with the latest technology and trained in advanced combat techniques.",
    collection: "guardians",
    rarity: "Legendary",
    price: 2.7,
    attributes: {
      strength: 90,
      intelligence: 85,
      defense: 95,
      speed: 80,
      charisma: 75,
      luck: 70,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2024-01-22T12:00:00Z",
    type: "guardian",
  },

  // Escapists Collection
  {
    id: "esc-001",
    name: "The Ghost",
    image: "/placeholder.svg?height=500&width=500&query=elusive+prisoner+in+shadows",
    description: "Has escaped from seven maximum-security prisons. No wall can hold them, no guard can catch them.",
    collection: "escapists",
    rarity: "Legendary",
    price: 3.0,
    attributes: {
      strength: 75,
      intelligence: 90,
      defense: 70,
      speed: 95,
      charisma: 80,
      luck: 85,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2024-02-15T12:00:00Z",
    type: "escapist",
  },

  // Wardens Collection
  {
    id: "ward-001",
    name: "The Director",
    image: "/placeholder.svg?height=500&width=500&query=prison+director+in+expensive+suit",
    description:
      "The administrative head of the entire prison system. More politician than prison official, with connections to the highest levels of government.",
    collection: "wardens",
    rarity: "Legendary",
    price: 3.5,
    attributes: {
      strength: 60,
      intelligence: 95,
      defense: 85,
      speed: 70,
      charisma: 90,
      luck: 80,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2024-03-01T12:00:00Z",
    type: "warden",
  },

  // Gold Diggers Collection
  {
    id: "gd-001",
    name: "Old Timer",
    image: "/placeholder.svg?height=500&width=500&query=old+gold+miner+with+gold+teeth",
    description:
      "The original Gold Digger who discovered the digital gold mine beneath the prison. Now serves a life sentence for his crimes.",
    collection: "gold-diggers",
    rarity: "Legendary",
    price: 4.0,
    attributes: {
      strength: 65,
      intelligence: 90,
      defense: 75,
      speed: 60,
      charisma: 85,
      luck: 95,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-08-01T12:00:00Z",
    type: "miner",
  },
  {
    id: "gd-002",
    name: "The Prospector",
    image: "/placeholder.svg?height=500&width=500&query=prison+miner+with+digital+tools",
    description:
      "Has an uncanny ability to find the richest digital gold veins. Highly valued by both inmates and guards for his skills.",
    collection: "gold-diggers",
    rarity: "Epic",
    price: 2.2,
    attributes: {
      strength: 70,
      intelligence: 85,
      defense: 65,
      speed: 75,
      charisma: 80,
      luck: 90,
    },
    owner: randomOwner(),
    mintAddress: randomMintAddress(),
    tokenStandard: "Solana NFT",
    createdAt: "2023-08-01T12:00:00Z",
    type: "miner",
  },
]

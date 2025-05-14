export interface TokenBalance {
  mint: string
  amount: string
  decimals: number
  token_account: string
  associated_token_address: string
  state: string
  owner: string
  program_id: string
  is_native: boolean
  is_frozen: boolean
  metadata?: {
    name: string
    symbol: string
    image: string
    description: string
    extensions?: {
      coingeckoId?: string
      website?: string
      twitter?: string
      discord?: string
      telegram?: string
    }
  }
}

export interface TokenTransfer {
  id: string
  mint: string
  amount: string
  decimals: number
  from: string
  to: string
  timestamp: number
  slot: number
  signature: string
  type: "TRANSFER" | "MINT" | "BURN"
}

export interface TokenPrice {
  mint: string
  price: number
  currency: string
  source: string
  timestamp: number
}

export interface TokenMetadata {
  mint: string
  name: string
  symbol: string
  image: string
  description: string
  decimals: number
  extensions?: {
    coingeckoId?: string
    website?: string
    twitter?: string
    discord?: string
    telegram?: string
  }
}

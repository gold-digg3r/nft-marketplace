export interface Character {
  id: string | number
  name: string
  image: string
  description?: string
  collection: string
  rarity: string
  price?: number
  attributes?: {
    strength?: number
    intelligence?: number
    defense?: number
    speed?: number
    charisma?: number
    luck?: number
    [key: string]: any
  }
  owner?: string
  listed?: boolean
  mintAddress?: string
  tokenStandard?: string
  createdAt?: string
  type?: string
  alias?: string
  stars?: number
}

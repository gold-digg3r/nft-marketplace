export enum AssetType {
  NFT = "NFT",
  FT = "FT",
  UNKNOWN = "UNKNOWN",
}

export interface NFTAsset {
  id: string
  content: {
    $schema: string
    json_uri: string
    files: Array<{
      uri: string
      mime: string
      cdn_uri?: string
    }>
    metadata: {
      name: string
      symbol: string
      description: string
      image: string
      attributes: Array<{
        trait_type: string
        value: string
      }>
      properties: {
        files: Array<{
          uri: string
          type: string
        }>
        category: string
        creators: Array<{
          address: string
          share: number
        }>
      }
    }
    links: {
      image: string
      animation?: string
    }
  }
  authorities: Array<{
    address: string
    scopes: string[]
  }>
  compression: {
    eligible: boolean
    compressed: boolean
    data_hash: string
    creator_hash: string
    asset_hash: string
    tree: string
    seq: number
    leaf_id: number
  }
  grouping: Array<{
    group_key: string
    group_value: string
  }>
  royalty: {
    royalty_model: string
    target: string
    percent: number
    basis_points: number
    primary_sale_happened: boolean
    locked: boolean
  }
  creators: Array<{
    address: string
    share: number
    verified: boolean
  }>
  ownership: {
    owner: string
    frozen: boolean
    delegated: boolean
    delegate: string | null
    ownership_model: string
  }
  supply: {
    print_max_supply: number
    print_current_supply: number
    edition_nonce: number | null
  }
  mutable: boolean
  burnt: boolean
  token_info: {
    symbol: string
    supply: string
    decimals: number
    token_program: string
    associated_token_program: string
  }
  features: string[]
  interface: string
  created_at: string
  updated_at: string
  listings?: Array<{
    id: string
    price: number
    currency: string
    source: string
    seller: string
    url: string
  }>
  offers?: Array<{
    id: string
    price: number
    currency: string
    source: string
    buyer: string
    url: string
  }>
  last_sale?: {
    price: number
    currency: string
    source: string
    buyer: string
    seller: string
    signature: string
    slot: number
    timestamp: number
  }
}

export interface TokenAsset {
  id: string
  content: {
    $schema: string
    json_uri: string
    files: Array<{
      uri: string
      mime: string
      cdn_uri?: string
    }>
    metadata: {
      name: string
      symbol: string
      description: string
      image: string
    }
    links: {
      image: string
    }
  }
  authorities: Array<{
    address: string
    scopes: string[]
  }>
  compression: null
  grouping: Array<{
    group_key: string
    group_value: string
  }>
  royalty: null
  creators: null
  ownership: {
    owner: string
    frozen: boolean
    delegated: boolean
    delegate: string | null
    ownership_model: string
  }
  supply: {
    print_max_supply: number
    print_current_supply: number
    edition_nonce: number | null
  }
  mutable: boolean
  burnt: boolean
  token_info: {
    symbol: string
    supply: string
    decimals: number
    token_program: string
    associated_token_program: string
  }
  features: string[]
  interface: string
  created_at: string
  updated_at: string
}

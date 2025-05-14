import { Connection } from "@solana/web3.js"
import type { NFTAsset } from "@/types/helius/non-fungible"
import type { TokenBalance } from "@/types/helius/fungible-token"

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`

// Get Helius-enhanced connection
export const getHeliusConnection = (): Connection => {
  return new Connection(HELIUS_RPC_URL, "confirmed")
}

// Get all assets by owner
export const getAssetsByOwner = async (owner: string, page = 1, limit = 100): Promise<NFTAsset[]> => {
  try {
    const response = await fetch(HELIUS_RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAssetsByOwner",
        params: {
          ownerAddress: owner,
          page,
          limit,
        },
      }),
    })

    const { result } = await response.json()
    return result.items
  } catch (error) {
    console.error("Error fetching assets by owner:", error)
    return []
  }
}

// Get asset by mint address
export const getAssetByMint = async (mint: string): Promise<NFTAsset | null> => {
  try {
    const response = await fetch(HELIUS_RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAsset",
        params: {
          id: mint,
        },
      }),
    })

    const { result } = await response.json()
    return result
  } catch (error) {
    console.error("Error fetching asset by mint:", error)
    return null
  }
}

// Get assets by group (collection)
export const getAssetsByGroup = async (groupId: string, page = 1, limit = 100): Promise<NFTAsset[]> => {
  try {
    const response = await fetch(HELIUS_RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAssetsByGroup",
        params: {
          groupKey: "collection",
          groupValue: groupId,
          page,
          limit,
        },
      }),
    })

    const { result } = await response.json()
    return result.items
  } catch (error) {
    console.error("Error fetching assets by group:", error)
    return []
  }
}

// Get token balances for a wallet
export const getTokenBalances = async (wallet: string): Promise<TokenBalance[]> => {
  try {
    const response = await fetch(HELIUS_RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getTokenBalances",
        params: {
          wallet,
        },
      }),
    })

    const { result } = await response.json()
    return result
  } catch (error) {
    console.error("Error fetching token balances:", error)
    return []
  }
}

// Get NFT events (mints, sales, listings, etc.)
export const getNFTEvents = async (mint: string, eventTypes: string[] = ["NFT_SALE"], limit = 10): Promise<any[]> => {
  try {
    const response = await fetch(HELIUS_RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getEvents",
        params: {
          query: {
            nfts: [mint],
            types: eventTypes,
          },
          options: {
            limit,
          },
        },
      }),
    })

    const { result } = await response.json()
    return result.items
  } catch (error) {
    console.error("Error fetching NFT events:", error)
    return []
  }
}

// Get collection floor price
export const getCollectionFloorPrice = async (collectionId: string): Promise<number | null> => {
  try {
    // This is a simplified example - in a real app, you might query a marketplace API
    const assets = await getAssetsByGroup(collectionId, 1, 100)

    if (assets.length === 0) return null

    // Find the lowest price among listed assets
    const listedAssets = assets.filter((asset) => asset.listings && asset.listings.length > 0)

    if (listedAssets.length === 0) return null

    const prices = listedAssets.map((asset) => Math.min(...asset.listings!.map((listing) => listing.price)))

    return Math.min(...prices)
  } catch (error) {
    console.error("Error fetching collection floor price:", error)
    return null
  }
}

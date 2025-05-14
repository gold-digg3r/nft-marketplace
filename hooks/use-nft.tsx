"use client"

import { useState, useEffect, useCallback } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection } from "@solana/web3.js"
import { fetchNFTMetadata, fetchWalletNFTs } from "@/lib/solana/metaplex"
import { getAssetByMint, getAssetsByOwner } from "@/lib/solana/helius"
import type { NFTMetadata } from "@/types/nft"
import type { NFTAsset } from "@/types/helius/non-fungible"

// Hook for fetching a single NFT
export function useNFT(mintAddress: string | undefined) {
  const [nft, setNft] = useState<NFTMetadata | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchNFT = useCallback(async () => {
    if (!mintAddress) return

    setLoading(true)
    setError(null)

    try {
      const connection = new Connection(
        process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com",
        "confirmed",
      )

      const nftData = await fetchNFTMetadata(connection, mintAddress)
      setNft(nftData)
    } catch (err) {
      console.error("Error fetching NFT:", err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [mintAddress])

  useEffect(() => {
    fetchNFT()
  }, [fetchNFT])

  return { nft, loading, error, refetch: fetchNFT }
}

// Hook for fetching NFTs owned by the connected wallet
export function useWalletNFTs() {
  const { publicKey } = useWallet()
  const [nfts, setNfts] = useState<NFTMetadata[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchNFTs = useCallback(async () => {
    if (!publicKey) {
      setNfts([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const connection = new Connection(
        process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com",
        "confirmed",
      )

      const walletNFTs = await fetchWalletNFTs(connection, publicKey.toString())
      setNfts(walletNFTs)
    } catch (err) {
      console.error("Error fetching wallet NFTs:", err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [publicKey])

  useEffect(() => {
    fetchNFTs()
  }, [fetchNFTs])

  return { nfts, loading, error, refetch: fetchNFTs }
}

// Hook for fetching NFTs with Helius enhanced data
export function useHeliusNFTs() {
  const { publicKey } = useWallet()
  const [assets, setAssets] = useState<NFTAsset[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchAssets = useCallback(async () => {
    if (!publicKey) {
      setAssets([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const walletAssets = await getAssetsByOwner(publicKey.toString())
      setAssets(walletAssets)
    } catch (err) {
      console.error("Error fetching Helius assets:", err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [publicKey])

  useEffect(() => {
    fetchAssets()
  }, [fetchAssets])

  return { assets, loading, error, refetch: fetchAssets }
}

// Hook for fetching a single NFT with Helius enhanced data
export function useHeliusNFT(mintAddress: string | undefined) {
  const [asset, setAsset] = useState<NFTAsset | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchAsset = useCallback(async () => {
    if (!mintAddress) return

    setLoading(true)
    setError(null)

    try {
      const nftAsset = await getAssetByMint(mintAddress)
      setAsset(nftAsset)
    } catch (err) {
      console.error("Error fetching Helius asset:", err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [mintAddress])

  useEffect(() => {
    fetchAsset()
  }, [fetchAsset])

  return { asset, loading, error, refetch: fetchAsset }
}

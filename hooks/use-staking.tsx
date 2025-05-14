"use client"

import { useState, useEffect, useCallback } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection, PublicKey } from "@solana/web3.js"
import {
  getGoldDiggerStateInfo,
  getStakingAccountInfo,
  stakeNFT,
  unstakeNFT,
  claimRewards,
} from "@/lib/programs/gold-digger"

// Hook for interacting with the staking program
export function useStaking(nftMint?: string) {
  const wallet = useWallet()
  const { publicKey } = wallet

  const [stakingInfo, setStakingInfo] = useState<any>(null)
  const [programInfo, setProgramInfo] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [transactionPending, setTransactionPending] = useState<boolean>(false)

  const connection = new Connection(
    process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com",
    "confirmed",
  )

  // Fetch staking info for the NFT
  const fetchStakingInfo = useCallback(async () => {
    if (!publicKey || !nftMint) return

    setLoading(true)
    setError(null)

    try {
      const nftMintPubkey = new PublicKey(nftMint)
      const info = await getStakingAccountInfo(connection, publicKey, nftMintPubkey)
      setStakingInfo(info)
    } catch (err: any) {
      setError(err)
      console.error("Error fetching staking info:", err)
    } finally {
      setLoading(false)
    }
  }, [connection, publicKey, nftMint])

  // Fetch program info
  const fetchProgramInfo = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const info = await getGoldDiggerStateInfo(connection)
      setProgramInfo(info)
    } catch (err: any) {
      setError(err)
      console.error("Error fetching program info:", err)
    } finally {
      setLoading(false)
    }
  }, [connection])

  // Stake NFT
  const stake = useCallback(async () => {
    if (!publicKey || !nftMint) return

    setTransactionPending(true)
    setError(null)

    try {
      const nftMintPubkey = new PublicKey(nftMint)
      await stakeNFT(connection, wallet, nftMintPubkey)
      // Refresh staking info after staking
      await fetchStakingInfo()
    } catch (err: any) {
      setError(err)
      console.error("Error staking NFT:", err)
    } finally {
      setTransactionPending(false)
    }
  }, [connection, wallet, nftMint, publicKey, fetchStakingInfo])

  // Unstake NFT
  const unstake = useCallback(async () => {
    if (!publicKey || !nftMint) return

    setTransactionPending(true)
    setError(null)

    try {
      const nftMintPubkey = new PublicKey(nftMint)
      await unstakeNFT(connection, wallet, nftMintPubkey)
      // Refresh staking info after unstaking
      await fetchStakingInfo()
    } catch (err: any) {
      setError(err)
      console.error("Error unstaking NFT:", err)
    } finally {
      setTransactionPending(false)
    }
  }, [connection, wallet, nftMint, publicKey, fetchStakingInfo])

  // Claim Rewards
  const claim = useCallback(async () => {
    if (!publicKey || !nftMint) return

    setTransactionPending(true)
    setError(null)

    try {
      const nftMintPubkey = new PublicKey(nftMint)
      await claimRewards(connection, wallet, nftMintPubkey)
      // Refresh staking info after claiming rewards
      await fetchStakingInfo()
    } catch (err: any) {
      setError(err)
      console.error("Error claiming rewards:", err)
    } finally {
      setTransactionPending(false)
    }
  }, [connection, wallet, nftMint, publicKey, fetchStakingInfo])

  useEffect(() => {
    if (publicKey && nftMint) {
      fetchStakingInfo()
    }
  }, [publicKey, nftMint, fetchStakingInfo])

  useEffect(() => {
    fetchProgramInfo()
  }, [fetchProgramInfo])

  return {
    stakingInfo,
    programInfo,
    loading,
    error,
    transactionPending,
    stake,
    unstake,
    claim,
    fetchStakingInfo,
  }
}

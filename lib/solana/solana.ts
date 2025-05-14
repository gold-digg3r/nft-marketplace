import { Connection, PublicKey, Transaction, type VersionedTransaction, type SendOptions } from "@solana/web3.js"
import type { WalletContextState } from "@solana/wallet-adapter-react"

// Initialize Solana connection
export const getSolanaConnection = () => {
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com"
  return new Connection(endpoint, "confirmed")
}

// Get cluster from environment
export const getSolanaNetwork = () => {
  return process.env.NEXT_PUBLIC_SOLANA_NETWORK || "mainnet-beta"
}

// Validate Solana address
export const isValidSolanaAddress = (address: string): boolean => {
  try {
    new PublicKey(address)
    return true
  } catch (error) {
    return false
  }
}

// Format Solana address for display
export const formatSolanaAddress = (address: string, start = 4, end = 4): string => {
  if (!address) return ""
  if (address.length <= start + end) return address
  return `${address.slice(0, start)}...${address.slice(-end)}`
}

// Send transaction helper
export const sendTransaction = async (
  wallet: WalletContextState,
  transaction: Transaction | VersionedTransaction,
  connection: Connection,
  options?: SendOptions,
): Promise<string> => {
  try {
    if (!wallet.publicKey || !wallet.signTransaction) {
      throw new Error("Wallet not connected")
    }

    let signature: string

    if (transaction instanceof Transaction) {
      transaction.feePayer = wallet.publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      const signedTransaction = await wallet.signTransaction(transaction)
      signature = await connection.sendRawTransaction(signedTransaction.serialize(), options)
    } else {
      // Handle VersionedTransaction
      const signedTransaction = await wallet.signTransaction(transaction)
      signature = await connection.sendRawTransaction(signedTransaction.serialize(), options)
    }

    await connection.confirmTransaction(signature, "confirmed")
    return signature
  } catch (error) {
    console.error("Transaction error:", error)
    throw error
  }
}

// Get SOL balance
export const getSolBalance = async (connection: Connection, publicKey: PublicKey): Promise<number> => {
  try {
    const balance = await connection.getBalance(publicKey)
    return balance / 1_000_000_000 // Convert lamports to SOL
  } catch (error) {
    console.error("Error getting SOL balance:", error)
    return 0
  }
}

// Estimate transaction fee
export const estimateTransactionFee = async (connection: Connection, transaction: Transaction): Promise<number> => {
  try {
    const { feeCalculator } = await connection.getRecentBlockhash()
    const fee = feeCalculator.lamportsPerSignature * transaction.signatures.length
    return fee / 1_000_000_000 // Convert lamports to SOL
  } catch (error) {
    console.error("Error estimating transaction fee:", error)
    return 0
  }
}

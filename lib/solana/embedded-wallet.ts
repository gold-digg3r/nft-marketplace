import type { Connection, PublicKey, Transaction } from "@solana/web3.js"
import { createEmbeddedWallet, type EmbeddedWallet } from "@solana/wallet-adapter-base"

// Interface for embedded wallet state
interface EmbeddedWalletState {
  wallet: EmbeddedWallet | null
  publicKey: PublicKey | null
  connected: boolean
}

// Create a new embedded wallet
export const createNewEmbeddedWallet = async (email: string, password: string): Promise<EmbeddedWalletState> => {
  try {
    const wallet = await createEmbeddedWallet({
      authToken: await getAuthToken(email, password),
    })

    const publicKey = wallet.publicKey

    return {
      wallet,
      publicKey,
      connected: !!publicKey,
    }
  } catch (error) {
    console.error("Error creating embedded wallet:", error)
    return {
      wallet: null,
      publicKey: null,
      connected: false,
    }
  }
}

// Connect to existing embedded wallet
export const connectEmbeddedWallet = async (email: string, password: string): Promise<EmbeddedWalletState> => {
  try {
    const wallet = await createEmbeddedWallet({
      authToken: await getAuthToken(email, password),
    })

    await wallet.connect()
    const publicKey = wallet.publicKey

    return {
      wallet,
      publicKey,
      connected: !!publicKey,
    }
  } catch (error) {
    console.error("Error connecting to embedded wallet:", error)
    return {
      wallet: null,
      publicKey: null,
      connected: false,
    }
  }
}

// Sign and send transaction with embedded wallet
export const signAndSendTransaction = async (
  wallet: EmbeddedWallet,
  transaction: Transaction,
  connection: Connection,
): Promise<string> => {
  try {
    if (!wallet.publicKey) {
      throw new Error("Wallet not connected")
    }

    transaction.feePayer = wallet.publicKey
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

    const signedTransaction = await wallet.signTransaction(transaction)
    const signature = await connection.sendRawTransaction(signedTransaction.serialize())

    await connection.confirmTransaction(signature, "confirmed")
    return signature
  } catch (error) {
    console.error("Error signing and sending transaction:", error)
    throw error
  }
}

// Helper function to get auth token (mock implementation)
const getAuthToken = async (email: string, password: string): Promise<string> => {
  // In a real implementation, this would call your authentication API
  // This is just a placeholder
  const response = await fetch("/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()
  return data.token
}

// Disconnect embedded wallet
export const disconnectEmbeddedWallet = async (wallet: EmbeddedWallet): Promise<void> => {
  try {
    await wallet.disconnect()
  } catch (error) {
    console.error("Error disconnecting embedded wallet:", error)
  }
}

import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { type Connection, PublicKey, SystemProgram } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import type { WalletContextState } from "@solana/wallet-adapter-react"
import { IDL } from "./idl/gold_digger"

// Program ID for Gold Digger
export const GOLD_DIGGER_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_STAKING_PROGRAM_ID || "GD1gUzFPzJP1xwdDVbYgbQmRQgmrDvPGNFSZ3KC1HXpx",
)

// Initialize the Gold Digger program
export const getGoldDiggerProgram = (connection: Connection, wallet: WalletContextState) => {
  const provider = new anchor.AnchorProvider(connection, wallet as any, { commitment: "confirmed" })

  return new Program(IDL, GOLD_DIGGER_PROGRAM_ID, provider)
}

// Find the Gold Digger state PDA
export const findGoldDiggerStatePDA = async (): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddressSync([Buffer.from("gold_digger_state")], GOLD_DIGGER_PROGRAM_ID)
}

// Find the staking account PDA for an NFT
export const findStakingAccountPDA = async (nftMint: PublicKey): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddressSync([Buffer.from("staking"), nftMint.toBuffer()], GOLD_DIGGER_PROGRAM_ID)
}

// Initialize the Gold Digger program
export const initializeGoldDigger = async (connection: Connection, wallet: WalletContextState): Promise<string> => {
  try {
    const program = getGoldDiggerProgram(connection, wallet)
    const [goldDiggerState, _] = await findGoldDiggerStatePDA()

    const tx = await program.methods
      .initialize()
      .accounts({
        goldDiggerState,
        authority: wallet.publicKey!,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    return tx
  } catch (error) {
    console.error("Error initializing Gold Digger:", error)
    throw error
  }
}

// Stake an NFT
export const stakeNFT = async (
  connection: Connection,
  wallet: WalletContextState,
  nftMint: PublicKey,
): Promise<string> => {
  try {
    const program = getGoldDiggerProgram(connection, wallet)
    const [goldDiggerState, _] = await findGoldDiggerStatePDA()
    const [stakingAccount, __] = await findStakingAccountPDA(nftMint)

    const tx = await program.methods
      .stakeNft()
      .accounts({
        goldDiggerState,
        stakingAccount,
        nftMint,
        owner: wallet.publicKey!,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .rpc()

    return tx
  } catch (error) {
    console.error("Error staking NFT:", error)
    throw error
  }
}

// Unstake an NFT
export const unstakeNFT = async (
  connection: Connection,
  wallet: WalletContextState,
  nftMint: PublicKey,
): Promise<string> => {
  try {
    const program = getGoldDiggerProgram(connection, wallet)
    const [goldDiggerState, _] = await findGoldDiggerStatePDA()
    const [stakingAccount, __] = await findStakingAccountPDA(nftMint)

    const tx = await program.methods
      .unstakeNft()
      .accounts({
        goldDiggerState,
        stakingAccount,
        nftMint,
        owner: wallet.publicKey!,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()

    return tx
  } catch (error) {
    console.error("Error unstaking NFT:", error)
    throw error
  }
}

// Claim rewards
export const claimRewards = async (
  connection: Connection,
  wallet: WalletContextState,
  nftMint: PublicKey,
): Promise<string> => {
  try {
    const program = getGoldDiggerProgram(connection, wallet)
    const [goldDiggerState, _] = await findGoldDiggerStatePDA()
    const [stakingAccount, __] = await findStakingAccountPDA(nftMint)

    const tx = await program.methods
      .claimRewards()
      .accounts({
        goldDiggerState,
        stakingAccount,
        nftMint,
        owner: wallet.publicKey!,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()

    return tx
  } catch (error) {
    console.error("Error claiming rewards:", error)
    throw error
  }
}

// Get staking account info
export const getStakingAccountInfo = async (
  connection: Connection,
  wallet: WalletContextState,
  nftMint: PublicKey,
): Promise<any> => {
  try {
    const program = getGoldDiggerProgram(connection, wallet)
    const [stakingAccount, _] = await findStakingAccountPDA(nftMint)

    return await program.account.stakingAccount.fetch(stakingAccount)
  } catch (error) {
    console.error("Error getting staking account info:", error)
    return null
  }
}

// Get Gold Digger state info
export const getGoldDiggerStateInfo = async (connection: Connection, wallet: WalletContextState): Promise<any> => {
  try {
    const program = getGoldDiggerProgram(connection, wallet)
    const [goldDiggerState, _] = await findGoldDiggerStatePDA()

    return await program.account.goldDiggerState.fetch(goldDiggerState)
  } catch (error) {
    console.error("Error getting Gold Digger state info:", error)
    return null
  }
}

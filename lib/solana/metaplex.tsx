import { Metaplex, walletAdapterIdentity, bundlrStorage, toMetaplexFileFromBrowser } from "@metaplex-foundation/js"
import { type Connection, PublicKey } from "@solana/web3.js"
import type { WalletContextState } from "@solana/wallet-adapter-react"
import type { NFTMetadata } from "@/types/nft"

// Initialize Metaplex
export const getMetaplex = (connection: Connection, wallet: WalletContextState) => {
  return Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(
      bundlrStorage({
        address: "https://node1.bundlr.network",
        providerUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT,
        timeout: 60000,
      }),
    )
}

// Fetch NFT metadata
export const fetchNFTMetadata = async (connection: Connection, mintAddress: string): Promise<NFTMetadata | null> => {
  try {
    const metaplex = Metaplex.make(connection)
    const mint = new PublicKey(mintAddress)
    const nft = await metaplex.nfts().findByMint({ mintAddress: mint })

    if (!nft) return null

    // Fetch JSON metadata if URI exists
    let jsonMetadata = {}
    if (nft.uri) {
      try {
        const response = await fetch(nft.uri)
        jsonMetadata = await response.json()
      } catch (error) {
        console.error("Error fetching NFT JSON metadata:", error)
      }
    }

    return {
      mint: mintAddress,
      name: nft.name,
      symbol: nft.symbol,
      description: jsonMetadata.description || "",
      image: jsonMetadata.image || "",
      attributes: jsonMetadata.attributes || [],
      collection: nft.collection?.address?.toString() || null,
      creators: nft.creators.map((creator) => ({
        address: creator.address.toString(),
        share: creator.share,
        verified: creator.verified,
      })),
      isMutable: nft.isMutable,
      primarySaleHappened: nft.primarySaleHappened,
      updateAuthority: nft.updateAuthorityAddress.toString(),
      tokenStandard: nft.tokenStandard,
      editionNonce: nft.editionNonce,
      tokenProgram: nft.tokenProgram?.toString(),
    }
  } catch (error) {
    console.error("Error fetching NFT:", error)
    return null
  }
}

// Fetch all NFTs for a wallet
export const fetchWalletNFTs = async (connection: Connection, walletAddress: string): Promise<NFTMetadata[]> => {
  try {
    const metaplex = Metaplex.make(connection)
    const owner = new PublicKey(walletAddress)
    const nfts = await metaplex.nfts().findAllByOwner({ owner })

    const nftPromises = nfts.map(async (nft) => {
      // Fetch JSON metadata if URI exists
      let jsonMetadata = {}
      if (nft.uri) {
        try {
          const response = await fetch(nft.uri)
          jsonMetadata = await response.json()
        } catch (error) {
          console.error("Error fetching NFT JSON metadata:", error)
        }
      }

      return {
        mint: nft.mintAddress.toString(),
        name: nft.name,
        symbol: nft.symbol,
        description: jsonMetadata.description || "",
        image: jsonMetadata.image || "",
        attributes: jsonMetadata.attributes || [],
        collection: nft.collection?.address?.toString() || null,
        creators: nft.creators.map((creator) => ({
          address: creator.address.toString(),
          share: creator.share,
          verified: creator.verified,
        })),
        isMutable: nft.isMutable,
        primarySaleHappened: nft.primarySaleHappened,
        updateAuthority: nft.updateAuthorityAddress.toString(),
        tokenStandard: nft.tokenStandard,
        editionNonce: nft.editionNonce,
        tokenProgram: nft.tokenProgram?.toString(),
      }
    })

    return await Promise.all(nftPromises)
  } catch (error) {
    console.error("Error fetching wallet NFTs:", error)
    return []
  }
}

// Upload metadata to Arweave via Bundlr
export const uploadMetadata = async (
  connection: Connection,
  wallet: WalletContextState,
  metadata: any,
  image?: File,
): Promise<string> => {
  try {
    const metaplex = getMetaplex(connection, wallet)

    // Upload image if provided
    let imageUri = metadata.image
    if (image) {
      const metaplexFile = await toMetaplexFileFromBrowser(image)
      const imageUploadResult = await metaplex.storage().upload(metaplexFile)
      imageUri = imageUploadResult
      metadata.image = imageUri
    }

    // Upload metadata
    const { uri } = await metaplex.nfts().uploadMetadata(metadata)
    return uri
  } catch (error) {
    console.error("Error uploading metadata:", error)
    throw error
  }
}

// Create NFT
export const createNFT = async (
  connection: Connection,
  wallet: WalletContextState,
  metadata: any,
  image?: File,
): Promise<string> => {
  try {
    const metaplex = getMetaplex(connection, wallet)

    // Upload metadata and image
    const metadataUri = await uploadMetadata(connection, wallet, metadata, image)

    // Create NFT
    const { nft } = await metaplex.nfts().create({
      uri: metadataUri,
      name: metadata.name,
      symbol: metadata.symbol,
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints || 500, // 5%
      creators: metadata.creators || undefined,
      isMutable: metadata.isMutable !== undefined ? metadata.isMutable : true,
      maxSupply: metadata.maxSupply || null,
      collection: metadata.collection ? new PublicKey(metadata.collection) : null,
      uses: metadata.uses || null,
    })

    return nft.mintAddress.toString()
  } catch (error) {
    console.error("Error creating NFT:", error)
    throw error
  }
}

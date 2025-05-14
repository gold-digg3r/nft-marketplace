"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Heart, Share2, ShoppingCart, Shield, Zap, Brain, Swords, Clock, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/app/context/marketplace-context"
import { BuyDialog } from "@/components/marketplace/buy-dialog"
import RelatedCharacters from "@/components/marketplace/related-characters"

export default function CharacterDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [character, setCharacter] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showBuyDialog, setShowBuyDialog] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const { filteredListings, handleBuy, isProcessing } = useMarketplace()

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true)

      // In a real app, you would fetch the character from an API
      // For now, we'll use the filteredListings from the marketplace context
      if (filteredListings && filteredListings.length > 0) {
        const foundCharacter = filteredListings.find((listing) => listing && listing.id && listing.id.toString() === id)

        if (foundCharacter) {
          setCharacter(foundCharacter)
        } else {
          // Character not found, redirect to 404
          router.push("/marketplace/character/not-found")
        }
      }

      setLoading(false)
    }

    fetchCharacter()
  }, [id, filteredListings, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gold/20 rounded mb-4"></div>
            <div className="h-12 w-64 bg-gold/20 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gold/10 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-10 w-3/4 bg-gold/20 rounded"></div>
                <div className="h-6 w-1/2 bg-gold/20 rounded"></div>
                <div className="h-24 w-full bg-gold/10 rounded"></div>
                <div className="h-12 w-full bg-gold/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Character Not Found</h1>
          <p className="text-gray-400 mb-8">The character you're looking for doesn't exist or has been removed.</p>
          <Button
            onClick={() => router.push("/marketplace")}
            className="bg-gold/20 text-gold hover:bg-gold/30 border border-gold/50"
          >
            Back to Marketplace
          </Button>
        </div>
      </div>
    )
  }

  // Get rarity color
  const getRarityColor = (rarity = "common") => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "text-gray-400 border-gray-400"
      case "uncommon":
        return "text-green-400 border-green-400"
      case "rare":
        return "text-blue-400 border-blue-400"
      case "epic":
        return "text-purple-400 border-purple-400"
      case "legendary":
        return "text-gold border-gold"
      case "mythic":
        return "text-red-400 border-red-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const rarityClass = getRarityColor(character.character?.rarity || "common")

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push("/marketplace")}
            className="text-gray-400 hover:text-gold flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Character Image */}
          <div className="relative">
            <div className={`relative aspect-square rounded-lg overflow-hidden border-2 ${rarityClass.split(" ")[1]}`}>
              <Image
                src={character.character?.image || "/placeholder.svg?height=600&width=600&query=character"}
                alt={character.character?.name || "Character"}
                fill
                className="object-cover"
                priority
              />

              {/* Rarity Badge */}
              <div className="absolute top-4 right-4">
                <Badge className={`${rarityClass} bg-black/70 px-3 py-1 text-sm font-medium`}>
                  {character.character?.rarity || "Common"}
                </Badge>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-full ${isFavorite ? "bg-red-500/20 text-red-500" : "bg-black/40 text-gray-400"} border border-gold/20`}
              >
                <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
              </button>

              <button className="p-3 rounded-full bg-black/40 text-gray-400 border border-gold/20">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Character Info */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{character.character?.name || "Character Name"}</h1>

            <div className="flex items-center mb-4">
              <span className="text-gray-400">Collection:</span>
              <Badge variant="outline" className="ml-2 bg-gold/10 text-gold border-gold/30">
                {character.character?.collection || "Jailbirds"}
              </Badge>
            </div>

            <p className="text-gray-300 mb-6">
              {character.character?.description || "No description available for this character."}
            </p>

            {/* Price and Buy */}
            <div className="bg-black/40 border border-gold/20 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-gray-400 text-sm">Current Price</span>
                  <div className="flex items-center">
                    <Image src="/images/solana-icon.png" alt="SOL" width={24} height={24} className="mr-2" />
                    <span className="text-2xl font-bold text-white">{character.price || "0.00"} SOL</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowBuyDialog(true)}
                  className="flex items-center bg-gold/20 text-gold hover:bg-gold/30 border border-gold/50"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
              </div>

              <div className="text-sm text-gray-400">
                <p>
                  Listed by: {character.seller_id?.substring(0, 6) || "Unknown"}...
                  {character.seller_id?.substring(character.seller_id.length - 4) || ""}
                </p>
                <p>Listed on: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Character Attributes */}
            <Tabs defaultValue="attributes" className="w-full">
              <TabsList className="bg-black/40 border border-gold/20 mb-4">
                <TabsTrigger
                  value="attributes"
                  className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold"
                >
                  Attributes
                </TabsTrigger>
                <TabsTrigger value="details" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  Details
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="attributes" className="mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 border border-gold/20 rounded-lg p-3 flex items-center">
                    <Shield className="h-5 w-5 text-gold mr-3" />
                    <div>
                      <div className="text-sm text-gray-400">Defense</div>
                      <div className="text-white font-medium">
                        {character.character?.attributes?.defense || "50"}/100
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-gold/20 rounded-lg p-3 flex items-center">
                    <Zap className="h-5 w-5 text-gold mr-3" />
                    <div>
                      <div className="text-sm text-gray-400">Strength</div>
                      <div className="text-white font-medium">
                        {character.character?.attributes?.strength || "70"}/100
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-gold/20 rounded-lg p-3 flex items-center">
                    <Brain className="h-5 w-5 text-gold mr-3" />
                    <div>
                      <div className="text-sm text-gray-400">Intelligence</div>
                      <div className="text-white font-medium">
                        {character.character?.attributes?.intelligence || "85"}/100
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-gold/20 rounded-lg p-3 flex items-center">
                    <Swords className="h-5 w-5 text-gold mr-3" />
                    <div>
                      <div className="text-sm text-gray-400">Combat</div>
                      <div className="text-white font-medium">
                        {character.character?.attributes?.combat || "65"}/100
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-gold/20 rounded-lg p-3 flex items-center">
                    <Clock className="h-5 w-5 text-gold mr-3" />
                    <div>
                      <div className="text-sm text-gray-400">Speed</div>
                      <div className="text-white font-medium">{character.character?.attributes?.speed || "75"}/100</div>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-gold/20 rounded-lg p-3 flex items-center">
                    <Award className="h-5 w-5 text-gold mr-3" />
                    <div>
                      <div className="text-sm text-gray-400">Charisma</div>
                      <div className="text-white font-medium">
                        {character.character?.attributes?.charisma || "60"}/100
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-0">
                <div className="bg-black/40 border border-gold/20 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Mint Address</div>
                      <div className="text-white font-medium truncate">
                        {character.character?.mintAddress || "0x1234...5678"}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">Owner</div>
                      <div className="text-white font-medium truncate">{character.seller_id || "0x8765...4321"}</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">Token Standard</div>
                      <div className="text-white font-medium">Solana NFT</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">Character Type</div>
                      <div className="text-white font-medium">{character.character?.type || "Guard"}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <div className="bg-black/40 border border-gold/20 rounded-lg p-4">
                  <div className="text-center py-8">
                    <p className="text-gray-400">No transaction history available for this character yet.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Characters */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Related Characters</h2>
          <RelatedCharacters
            currentCharacterId={character.id}
            rarity={character.character?.rarity || "common"}
            type={character.character?.type || "guard"}
          />
        </div>

        {/* Buy Dialog */}
        <BuyDialog
          listing={character}
          open={showBuyDialog}
          onOpenChange={setShowBuyDialog}
          onBuy={() => handleBuy(character)}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  )
}

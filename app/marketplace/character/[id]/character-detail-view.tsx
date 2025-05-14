"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Share2, Heart, Clock, Award, Shield, Zap, Sword, Brain, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Character } from "@/app/types/character"
import { formatPrice } from "@/lib/utils/formatting"
import { BuyDialog } from "@/components/marketplace/buy-dialog"
import { useWallet } from "@/hooks/use-wallet"
import RelatedCharacters from "../../../components/marketplace/related-characters"

interface CharacterDetailViewProps {
  character: Character
}

export default function CharacterDetailView({ character }: CharacterDetailViewProps) {
  const router = useRouter()
  const { connected } = useWallet()
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Calculate rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "bg-slate-500"
      case "uncommon":
        return "bg-green-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-amber-500"
      default:
        return "bg-slate-500"
    }
  }

  // Character attributes with icons
  const attributes = [
    { name: "Strength", value: character.attributes?.strength || 0, icon: Sword },
    { name: "Intelligence", value: character.attributes?.intelligence || 0, icon: Brain },
    { name: "Defense", value: character.attributes?.defense || 0, icon: Shield },
    { name: "Speed", value: character.attributes?.speed || 0, icon: Zap },
    { name: "Charisma", value: character.attributes?.charisma || 0, icon: Heart },
    { name: "Luck", value: character.attributes?.luck || 0, icon: Coins },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.back()}>
        <ArrowLeft size={16} />
        Back to Marketplace
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Character image */}
        <div className="lg:w-1/2">
          <div className="relative rounded-lg overflow-hidden border border-gold-500/50 shadow-xl">
            <div className="aspect-square relative">
              <Image
                src={character.image || "/placeholder.svg"}
                alt={character.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
              >
                <Share2 size={18} />
              </Button>
            </div>
            <Badge className={`absolute top-4 left-4 ${getRarityColor(character.rarity || "common")}`}>
              {character.rarity || "Common"}
            </Badge>
          </div>
        </div>

        {/* Character details */}
        <div className="lg:w-1/2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <p className="text-muted-foreground">#{character.tokenId || "000"}</p>
          </div>

          <p className="text-lg">{character.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Listed 3 days ago</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Collection: {character.collection || "Gold Digger"}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current price</p>
                <p className="text-3xl font-bold">{formatPrice(character.price || 0)} SOL</p>
              </div>
              <div className="flex gap-3">
                <Button
                  className="flex-1 sm:flex-none"
                  variant="outline"
                  onClick={() => window.open(`https://solscan.io/token/${character.mintAddress || ""}`, "_blank")}
                >
                  View on Solscan
                </Button>
                <Button className="flex-1 sm:flex-none" onClick={() => setIsBuyDialogOpen(true)} disabled={!connected}>
                  {connected ? "Buy Now" : "Connect Wallet to Buy"}
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="attributes" className="pt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="attributes">Attributes</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="attributes" className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {attributes.map((attr) => (
                  <Card key={attr.name} className="border border-gold-500/30">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="bg-gold-500/10 p-2 rounded-full">
                        <attr.icon size={20} className="text-gold-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{attr.name}</p>
                        <p className="font-bold">{attr.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="details" className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Mint Address</p>
                  <p className="font-mono text-sm truncate">{character.mintAddress || "..."}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Owner</p>
                  <p className="font-mono text-sm truncate">{character.owner || "..."}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Token Standard</p>
                  <p>Solana NFT</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blockchain</p>
                  <p>Solana</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="history" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <p>Listed</p>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                  <p className="font-bold">{formatPrice(character.price || 0)} SOL</p>
                </div>
                <div className="flex items-center justify-between p-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <p>Minted</p>
                    <p className="text-sm text-muted-foreground">30 days ago</p>
                  </div>
                  <p className="font-mono text-sm truncate max-w-[150px]">
                    {character.mintAddress?.substring(0, 8) || "..."}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related characters section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">More Characters Like This</h2>
        <RelatedCharacters currentCharacterId={character.id} rarity={character.rarity} />
      </div>

      {/* Buy dialog */}
      <BuyDialog open={isBuyDialogOpen} onOpenChange={setIsBuyDialogOpen} character={character} />
    </div>
  )
}

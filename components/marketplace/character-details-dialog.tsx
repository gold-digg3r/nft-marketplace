"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils/formatting"
import type { Character } from "@/app/types/character"

interface CharacterDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  character: Character
}

export function CharacterDetailsDialog({ open, onOpenChange, character }: CharacterDetailsDialogProps) {
  // Get rarity color
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-black/90 border-gold/30">
        <DialogHeader>
          <DialogTitle className="text-white">{character.name}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {character.collection || "Gold Digger Collection"}
          </DialogDescription>
        </DialogHeader>

        <div className="relative aspect-square w-full mb-4">
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            fill
            className="object-cover rounded-md"
          />
          {character.rarity && (
            <Badge className={`absolute top-2 right-2 ${getRarityColor(character.rarity)}`}>{character.rarity}</Badge>
          )}
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{character.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">Price</p>
            <p className="text-lg font-bold text-white">{formatPrice(character.price || 0)} SOL</p>
          </div>

          <Link href={`/marketplace/character/${character.id}`}>
            <Button className="bg-gold/20 text-gold hover:bg-gold/30 border border-gold/50">View Details</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

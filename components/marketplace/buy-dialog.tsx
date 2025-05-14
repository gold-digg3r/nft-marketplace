"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { formatPrice } from "@/lib/utils/formatting"
import { Loader2 } from "lucide-react"

interface BuyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  listing: any
  onBuy?: () => void
  isProcessing?: boolean
}

export function BuyDialog({ open, onOpenChange, listing, onBuy, isProcessing = false }: BuyDialogProps) {
  const [step, setStep] = useState<"confirm" | "processing" | "success">("confirm")

  const handleBuy = () => {
    if (onBuy) {
      onBuy()
    } else {
      // If no onBuy function is provided, simulate the process
      setStep("processing")
      setTimeout(() => {
        setStep("success")
      }, 2000)
    }
  }

  const handleClose = () => {
    // Reset the dialog state when closing
    setStep("confirm")
    onOpenChange(false)
  }

  // Handle case when listing is undefined
  if (!listing) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-black/90 border-gold/30">
          <DialogHeader>
            <DialogTitle className="text-white">Error</DialogTitle>
            <DialogDescription className="text-gray-400">
              The character information is not available. Please try again later.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Extract character from listing, or use listing as character if it's already a character
  const character = listing.character || listing

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-black/90 border-gold/30">
        <DialogHeader>
          <DialogTitle className="text-white">Buy Character</DialogTitle>
          <DialogDescription className="text-gray-400">Confirm your purchase of this character NFT</DialogDescription>
        </DialogHeader>

        {step === "confirm" && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-md overflow-hidden">
                <Image
                  src={character?.image || "/placeholder.svg"}
                  alt={character?.name || "Character"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-white">{character?.name || "Character"}</h3>
                <p className="text-sm text-gray-400">{character?.collection || "Gold Digger Collection"}</p>
              </div>
            </div>

            <div className="bg-black/50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Price</span>
                <span className="text-white font-bold">{formatPrice(listing.price || 0)} SOL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transaction Fee</span>
                <span className="text-white">0.001 SOL</span>
              </div>
              <div className="border-t border-gray-800 mt-2 pt-2 flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="text-white font-bold">{formatPrice((listing.price || 0) + 0.001)} SOL</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleBuy}
                disabled={isProcessing}
                className="bg-gold/20 text-gold hover:bg-gold/30 border border-gold/50"
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Purchase
              </Button>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="py-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-gold mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Processing Transaction</h3>
            <p className="text-gray-400">Please wait while we process your purchase...</p>
          </div>
        )}

        {step === "success" && (
          <div className="py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Purchase Successful!</h3>
            <p className="text-gray-400 mb-4">You have successfully purchased {character?.name || "this character"}!</p>
            <Button onClick={handleClose} className="bg-gold/20 text-gold hover:bg-gold/30 border border-gold/50">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

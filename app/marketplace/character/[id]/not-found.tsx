"use client"

import { useRouter } from "next/navigation"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CharacterNotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 text-center">
        <FileQuestion className="h-24 w-24 text-gold/50 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Character Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The character you're looking for doesn't exist or has been removed from the marketplace.
        </p>
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

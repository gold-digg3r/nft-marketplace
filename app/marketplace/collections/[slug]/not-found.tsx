import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { GoldButton } from "@/components/ui/gold-button"

export default function CollectionNotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <FileQuestion className="h-24 w-24 text-gold/50 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-2">Collection Not Found</h1>
        <p className="text-gray-400 mb-8">The collection you're looking for doesn't exist or may have been removed.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/marketplace/collections">
            <GoldButton>Browse Collections</GoldButton>
          </Link>
          <Link href="/marketplace">
            <GoldButton variant="outline">Back to Marketplace</GoldButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

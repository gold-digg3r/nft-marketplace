import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Collection } from "@/types/nft"

interface CollectionAboutProps {
  collection: Collection
}

export function CollectionAbout({ collection }: CollectionAboutProps) {
  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-[300px] relative overflow-hidden">
        <Image
          src={collection.bannerImage || "/placeholder.svg"}
          alt={`${collection.name} banner`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black"></div>
      </div>

      {/* Collection info */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 -mt-20 relative z-10">
          {/* Logo */}
          <div
            className="h-32 w-32 rounded-xl overflow-hidden border-4 shadow-lg"
            style={{ borderColor: collection.themeColor }}
          >
            <Image
              src={collection.logoImage || "/placeholder.svg"}
              alt={`${collection.name} logo`}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Link href="/marketplace/collections" className="text-sm text-gray-400 hover:text-gold transition-colors">
                Collections
              </Link>
              <ChevronRight className="h-3 w-3 text-gray-600" />
              <span className="text-sm text-white">{collection.name}</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">{collection.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-400">by</span>
              <span className="text-white">{collection.creator}</span>
              <a href="#" className="text-gold hover:underline flex items-center">
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>

            <p className="text-gray-300 max-w-3xl mb-4">{collection.description}</p>

            <div className="flex flex-wrap gap-2">
              {collection.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-black/50 text-white border-gray-700 hover:border-gold">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

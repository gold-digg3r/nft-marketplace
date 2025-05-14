import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function CollectionsHeader() {
  return (
    <div className="relative h-[300px] md:h-[400px] overflow-hidden">
      <Image
        src="/images/collections/collections-header-banner.png"
        alt="Collections Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 flex flex-col items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Character <span className="text-gold">Collections</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Explore themed character sets from the Gold Digger universe
          </p>

          <div className="flex items-center justify-center mt-8 text-sm text-gray-400">
            <Link href="/marketplace" className="hover:text-gold transition-colors">
              Marketplace
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-white">Collections</span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HeroDemo() {
  return (
    <div className="min-h-screen">
      <div className="relative h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?key=d2f6q" alt="Hero Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover Rare Digital <span className="text-gold-300">Treasures</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Explore, collect, and trade unique NFTs in the Gold Digger marketplace. Join the community of digital
              miners today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gold-300 hover:bg-gold-400 text-gray-950">
                Explore Marketplace
              </Button>
              <Button size="lg" variant="outline" className="border-gold-300 text-gold-300 hover:bg-gold-300/10">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Collections</h2>
          <p className="text-muted-foreground mb-12">
            Discover our handpicked selection of the most exclusive and valuable NFT collections.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden bg-card">
                <div className="aspect-square relative">
                  <Image
                    src={`/placeholder.svg?key=pc1j0&height=400&width=400&query=nft+collection+${i}+gold`}
                    alt={`Collection ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">Collection {i}</h3>
                  <p className="text-sm text-muted-foreground">24 items · Floor: 0.8 SOL</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/marketplace/collections">
              <Button variant="outline">View All Collections</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

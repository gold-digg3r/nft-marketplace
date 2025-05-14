import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCollectionById, getCharactersByCollection } from "@/lib/data/collections"
import { EnhancedCollectionStats } from "@/components/marketplace/collections/enhanced-collection-stats"
import { CollectionItems } from "@/components/marketplace/collections/collection-items"
import { CollectionAttributes } from "@/components/marketplace/collections/collection-attributes"
import { CollectionActivity } from "@/components/marketplace/collections/collection-activity"
import { CollectionAbout } from "@/components/marketplace/collections/collection-about"
import { CollectionStory } from "@/components/marketplace/collections/collection-story"
import { CollectionTeam } from "@/components/marketplace/collections/collection-team"
import { CollectionRoadmap } from "@/components/marketplace/collections/collection-roadmap"
import { PriceHistoryChart } from "@/components/marketplace/collections/price-history-chart"
import { RarityDistributionChart } from "@/components/marketplace/collections/rarity-distribution"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CollectionPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const collection = getCollectionById(params.slug)

  if (!collection) {
    return {
      title: "Collection Not Found | Gold Digger",
      description: "The requested collection could not be found.",
    }
  }

  return {
    title: `${collection.name} Collection | Gold Digger`,
    description: collection.description,
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection = getCollectionById(params.slug)

  if (!collection) {
    notFound()
  }

  const characters = getCharactersByCollection(params.slug)

  return (
    <div className="min-h-screen bg-black">
      <CollectionAbout collection={collection} />

      <div className="container mx-auto px-4 py-8">
        <EnhancedCollectionStats collection={collection} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {collection.priceHistory && (
            <PriceHistoryChart data={collection.priceHistory} themeColor={collection.themeColor} />
          )}

          {collection.rarityDistribution && (
            <RarityDistributionChart data={collection.rarityDistribution} themeColor={collection.themeColor} />
          )}
        </div>

        <div className="mt-8 space-y-6">
          <CollectionStory collection={collection} />
          <CollectionTeam collection={collection} />
          <CollectionRoadmap collection={collection} />
        </div>

        <Tabs defaultValue="items" className="mt-8">
          <TabsList className="bg-black/40 border border-gold/20 mb-6">
            <TabsTrigger value="items" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              Items ({characters.length})
            </TabsTrigger>
            <TabsTrigger value="attributes" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              Attributes
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="items">
            <CollectionItems characters={characters} collectionId={collection.id} />
          </TabsContent>

          <TabsContent value="attributes">
            <CollectionAttributes collectionId={collection.id} />
          </TabsContent>

          <TabsContent value="activity">
            <CollectionActivity collectionId={collection.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

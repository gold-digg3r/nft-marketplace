import { Skeleton } from "@/components/ui/skeleton"

export default function CharacterDetailLoading() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <Skeleton className="h-6 w-32 bg-gold/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Character Image */}
          <div className="relative">
            <Skeleton className="aspect-square rounded-lg bg-gold/10" />

            {/* Action buttons */}
            <div className="flex justify-between mt-4">
              <Skeleton className="h-12 w-12 rounded-full bg-gold/10" />
              <Skeleton className="h-12 w-12 rounded-full bg-gold/10" />
            </div>
          </div>

          {/* Character Info */}
          <div>
            <Skeleton className="h-10 w-3/4 bg-gold/10 mb-2" />

            <div className="flex items-center mb-4">
              <Skeleton className="h-6 w-32 bg-gold/10" />
            </div>

            <Skeleton className="h-24 w-full bg-gold/10 mb-6" />

            {/* Price and Buy */}
            <Skeleton className="h-32 w-full bg-gold/10 mb-6 rounded-lg" />

            {/* Character Attributes */}
            <Skeleton className="h-10 w-full bg-gold/10 mb-4 rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full bg-gold/10 rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Related Characters */}
        <div className="mt-16">
          <Skeleton className="h-10 w-64 bg-gold/10 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full bg-gold/10 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

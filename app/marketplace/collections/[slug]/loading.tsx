import { Skeleton } from "@/components/ui/skeleton"

export default function CollectionLoading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Banner skeleton */}
      <div className="relative h-[300px] w-full">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Collection info skeleton */}
        <div className="flex flex-col md:flex-row gap-6 -mt-20 relative z-10">
          <Skeleton className="h-32 w-32 rounded-xl" />
          <div className="flex-1">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-full max-w-md mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Skeleton className="h-[350px] rounded-lg" />
          <Skeleton className="h-[350px] rounded-lg" />
        </div>

        {/* Story and team skeletons */}
        <div className="mt-8 space-y-6">
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[150px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
        </div>

        {/* Tabs skeleton */}
        <div className="mt-8">
          <Skeleton className="h-10 w-full max-w-md mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-[300px] rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

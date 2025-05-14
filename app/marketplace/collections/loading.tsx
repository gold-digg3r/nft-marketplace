import { Skeleton } from "@/components/ui/skeleton"

export default function CollectionsLoading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="h-[300px] w-full relative">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-full max-w-3xl mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

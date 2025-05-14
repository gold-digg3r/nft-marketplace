import { Skeleton } from "@/components/ui/skeleton"

export default function LeaderboardLoading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="h-[200px] w-full relative">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-full max-w-3xl mb-8" />

        <div className="rounded-lg overflow-hidden border border-gold/20">
          <Skeleton className="h-12 w-full" />
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

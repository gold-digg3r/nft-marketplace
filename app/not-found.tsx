import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gold-300">404</h1>
          <p className="text-2xl font-medium mt-4">Page Not Found</p>
          <p className="text-muted-foreground mt-2">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/marketplace">Explore Marketplace</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

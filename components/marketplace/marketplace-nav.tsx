"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid3X3, Trophy, Tag } from "lucide-react"

export function MarketplaceNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Home", path: "/marketplace", icon: Home },
    { name: "Collections", path: "/marketplace/collections", icon: Grid3X3 },
    { name: "Leaderboard", path: "/marketplace/leaderboard", icon: Trophy },
    { name: "My NFTs", path: "/marketplace/my-nfts", icon: Tag },
  ]

  return (
    <nav className="bg-black/60 backdrop-blur-md border-b border-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/marketplace" className="text-xl font-bold text-gold">
              Gold Digger
            </Link>

            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    isActive(item.path) ? "bg-gold/10 text-gold" : "text-gray-300 hover:bg-black/40 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t border-gold/10">
        <div className="grid grid-cols-4 gap-1 p-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-md ${
                isActive(item.path) ? "bg-gold/10 text-gold" : "text-gray-400 hover:bg-black/40 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

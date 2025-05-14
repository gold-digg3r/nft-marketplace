"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WalletButton } from "@/components/ui/wallet-button"
import { cn } from "@/lib/utils"

const routes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Collections",
    href: "/marketplace/collections",
  },
  {
    label: "Leaderboard",
    href: "/marketplace/leaderboard",
  },
  {
    label: "My NFTs",
    href: "/marketplace/my-nfts",
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm dark:bg-gray-950/80" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href ? "text-primary dark:text-gold-300" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Wallet Button */}
            <WalletButton className="hidden sm:flex" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <MobileMenu routes={routes} pathname={pathname} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

interface MobileMenuProps {
  routes: typeof routes
  pathname: string | null
}

function MobileMenu({ routes, pathname }: MobileMenuProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <Logo size="sm" />
      </div>
      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="flex flex-col gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
                pathname === route.href ? "text-primary dark:text-gold-300" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t space-y-4">
        <WalletButton className="w-full" />
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

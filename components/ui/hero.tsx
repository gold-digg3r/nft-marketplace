import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeroProps {
  title: string
  subtitle?: string
  image?: string
  className?: string
  children?: React.ReactNode
  badge?: string
}

export function Hero({
  title,
  subtitle,
  image = "/images/hero-bg.jpg",
  className,
  children,
  badge = "Gold Digger NFT Marketplace",
}: HeroProps) {
  return (
    <section className={cn("relative w-full h-[90vh] min-h-[600px] flex items-center overflow-hidden", className)}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image || "/placeholder.svg"}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background dark:to-gray-950" />
      </div>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 z-[1] opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-300/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-white bg-gold-400/80 rounded-full backdrop-blur-sm">
            {badge}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{title}</h1>
          {subtitle && <p className="text-xl md:text-2xl text-white/80 mb-6">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

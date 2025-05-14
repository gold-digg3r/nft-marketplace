import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brand Guidelines | GoldDigger NFT Marketplace",
  description: "Official brand guidelines for the GoldDigger NFT Marketplace",
}

export default function BrandGuideLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Brand Guidelines</h1>
          <p className="text-muted-foreground mb-8">
            Official brand assets and usage guidelines for the GoldDigger NFT Marketplace
          </p>
          <div className="border-b mb-8"></div>
          {children}
        </div>
      </div>
    </div>
  )
}

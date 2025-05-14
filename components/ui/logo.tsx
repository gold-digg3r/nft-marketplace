"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  // Size mappings
  const sizes = {
    sm: {
      container: "h-8",
      logo: 32,
      textClass: "text-lg",
      subtitleClass: "text-[0.65rem]",
    },
    md: {
      container: "h-10",
      logo: 40,
      textClass: "text-xl",
      subtitleClass: "text-xs",
    },
    lg: {
      container: "h-12",
      logo: 48,
      textClass: "text-2xl",
      subtitleClass: "text-sm",
    },
  }

  const { container, logo, textClass, subtitleClass } = sizes[size]

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative aspect-square", container)}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-zc3uAzTAnmkW5aPaZNdx0Xpuzq4sYn.png"
          alt="Gold Digger Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className={cn("leading-none", textClass)}>
            Gold<span className="font-bold">Digger</span>
          </div>
          <div className={cn("text-muted-foreground leading-tight", subtitleClass)}>NFT Marketplace</div>
        </div>
      )}
    </Link>
  )
}

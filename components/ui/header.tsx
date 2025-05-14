"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  children?: React.ReactNode
  centered?: boolean
  backgroundImage?: string
  overlay?: boolean
}

export function Header({
  title,
  description,
  children,
  className,
  centered = false,
  backgroundImage,
  overlay = true,
  ...props
}: HeaderProps) {
  return (
    <div
      className={cn(
        "relative w-full py-12 md:py-16",
        backgroundImage ? "min-h-[240px] md:min-h-[320px]" : "",
        className,
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
      {...props}
    >
      {/* Overlay for background images */}
      {backgroundImage && overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background dark:to-gray-950" />
      )}

      <div className="container relative z-10">
        <div className={cn("max-w-3xl", centered ? "mx-auto text-center" : "")}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
          {description && <p className="text-lg text-muted-foreground mb-6">{description}</p>}
          {children}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ParallaxHeroProps {
  children: ReactNode
  className?: string
  image: string
  overlayOpacity?: number
}

export function ParallaxHero({ children, className, image, overlayOpacity = 0.6 }: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <div ref={ref} className={cn("relative w-full h-[90vh] min-h-[600px] overflow-hidden", className)}>
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity, scale }}>
        <Image
          src={image || "/placeholder.svg"}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background dark:to-gray-950"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      <div className="relative z-10 h-full flex items-center">{children}</div>
    </div>
  )
}

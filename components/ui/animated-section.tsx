"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView, type Variant } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimationVariant = "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "stagger"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  id?: string
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  fadeIn: { opacity: 1, y: 0 },
  slideUp: { opacity: 1, y: 0 },
  slideLeft: { opacity: 1, x: 0 },
  slideRight: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  stagger: { opacity: 1, y: 0 },
}

const getInitialVariant = (variant: AnimationVariant): Variant => {
  switch (variant) {
    case "fadeIn":
      return { opacity: 0, y: 20 }
    case "slideUp":
      return { opacity: 0, y: 50 }
    case "slideLeft":
      return { opacity: 0, x: 50 }
    case "slideRight":
      return { opacity: 0, x: -50 }
    case "scale":
      return { opacity: 0, scale: 0.9 }
    case "stagger":
      return { opacity: 0, y: 20 }
    default:
      return { opacity: 0, y: 20 }
  }
}

export function AnimatedSection({
  children,
  className,
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.2,
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={getInitialVariant(variant)}
      animate={isInView ? variants[variant] : "hidden"}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedItem({
  children,
  className,
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
  index = 0,
  staggerDelay = 0.1,
}: AnimatedSectionProps & { index?: number; staggerDelay?: number }) {
  const actualDelay = variant === "stagger" ? delay + index * staggerDelay : delay

  return (
    <motion.div
      initial={getInitialVariant(variant)}
      animate={variants[variant]}
      transition={{
        duration,
        delay: actualDelay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

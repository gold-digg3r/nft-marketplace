"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

export interface GoldButtonProps extends ButtonProps {}

const GoldButton = React.forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant = "gold", size, ...props }, ref) => {
    return <Button className={cn(className)} variant={variant} size={size} ref={ref} {...props} />
  },
)
GoldButton.displayName = "GoldButton"

export { GoldButton }

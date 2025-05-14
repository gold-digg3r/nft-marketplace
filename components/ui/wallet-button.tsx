"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Wallet, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { WalletConnectModal } from "@/components/wallet/wallet-connect-modal"

export interface WalletButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "ghost" | "gold"
  size?: "default" | "sm" | "lg"
  showBalance?: boolean
}

export function WalletButton({
  className,
  variant = "gold",
  size = "default",
  showBalance = false,
  ...props
}: WalletButtonProps) {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [walletBalance, setWalletBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Generate a random avatar seed based on the wallet address
  const avatarSeed = walletAddress ? walletAddress.substring(0, 10) : "default"

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleConnectWallet = async (adapter: string) => {
    try {
      setIsLoading(true)
      console.log(`Connecting to ${adapter} wallet...`)

      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful connection
      setConnected(true)
      setWalletAddress("8xDrJGHyTiDLxJAVz8g6pPSKTYZSPKHYrJqGJTVLTwzr")
      setWalletBalance(5.23)

      return Promise.resolve()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      setConnected(false)
      setWalletAddress(null)
      setWalletBalance(null)
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    }
  }

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
  }

  // If not on client yet, render a placeholder button
  if (!isClient) {
    return (
      <Button variant={variant} size={size} className={cn("flex items-center gap-2", className)} {...props}>
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </Button>
    )
  }

  if (!connected) {
    return (
      <>
        <Button
          variant={variant}
          size={size}
          onClick={() => setShowModal(true)}
          disabled={isLoading}
          className={cn("flex items-center gap-2", className)}
          {...props}
        >
          <Wallet className="h-4 w-4" />
          <span>{isLoading ? "Connecting..." : "Connect Wallet"}</span>
        </Button>

        <WalletConnectModal open={showModal} onOpenChange={setShowModal} onConnect={handleConnectWallet} />
      </>
    )
  }

  return (
    <div className={className} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full overflow-hidden relative bg-gold-300/20">
              <Image
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${avatarSeed}`}
                alt="Wallet Avatar"
                fill
                className="object-cover"
              />
            </div>
            <span>{formatAddress(walletAddress || "")}</span>
            {showBalance && walletBalance !== null && (
              <span className="ml-2 text-xs bg-gold-300/10 px-2 py-0.5 rounded-full">
                {walletBalance.toFixed(2)} SOL
              </span>
            )}
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between">
            <span>Balance</span>
            <span className="font-medium">{walletBalance?.toFixed(2) || "0.00"} SOL</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>Address</span>
            <span className="font-mono text-xs">{formatAddress(walletAddress || "")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href={`https://solscan.io/account/${walletAddress}`} target="_blank" rel="noopener noreferrer">
              View on Solscan
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/marketplace/my-nfts">My NFTs</a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="text-red-500 focus:text-red-500">
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

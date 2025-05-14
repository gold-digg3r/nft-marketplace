"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Check, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Define wallet types
interface WalletOption {
  name: string
  icon: string
  adapter: string
  popular?: boolean
  installed?: boolean
  url?: string
}

export interface WalletConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnect: (adapter: string) => Promise<void>
}

export function WalletConnectModal({ open, onOpenChange, onConnect }: WalletConnectModalProps) {
  const [mounted, setMounted] = useState(false)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [wallets, setWallets] = useState<WalletOption[]>([])

  // Set mounted to true on client-side
  useEffect(() => {
    setMounted(true)

    // Simulate checking for installed wallets
    const checkInstalledWallets = () => {
      // In a real app, you would check if the wallet adapters are available in window
      const phantomInstalled = typeof window !== "undefined" && (window as any).phantom !== undefined

      const solflareInstalled = typeof window !== "undefined" && (window as any).solflare !== undefined

      return {
        phantom: phantomInstalled,
        solflare: solflareInstalled,
      }
    }

    const installed = checkInstalledWallets()

    // Set available wallets
    setWallets([
      {
        name: "Phantom",
        icon: "/images/wallets/phantom.png",
        adapter: "phantom",
        popular: true,
        installed: installed.phantom,
        url: "https://phantom.app/",
      },
      {
        name: "Solflare",
        icon: "/images/wallets/solflare.png",
        adapter: "solflare",
        popular: true,
        installed: installed.solflare,
        url: "https://solflare.com/",
      },
      {
        name: "Backpack",
        icon: "/images/wallets/backpack.png",
        adapter: "backpack",
        url: "https://www.backpack.app/",
      },
      {
        name: "Glow",
        icon: "/images/wallets/glow.png",
        adapter: "glow",
        url: "https://glow.app/",
      },
      {
        name: "Ledger",
        icon: "/images/wallets/ledger.png",
        adapter: "ledger",
        url: "https://www.ledger.com/",
      },
      {
        name: "Trust Wallet",
        icon: "/images/wallets/trust-wallet.png",
        adapter: "trust",
        url: "https://trustwallet.com/",
      },
      {
        name: "Coinbase Wallet",
        icon: "/images/wallets/coinbase.png",
        adapter: "coinbase",
        url: "https://www.coinbase.com/wallet",
      },
      {
        name: "Brave Wallet",
        icon: "/images/wallets/brave.png",
        adapter: "brave",
        url: "https://brave.com/wallet/",
      },
    ])
  }, [])

  const handleConnect = async (wallet: WalletOption) => {
    try {
      setConnecting(wallet.adapter)
      await onConnect(wallet.adapter)
      onOpenChange(false)
    } catch (error) {
      console.error(`Error connecting to ${wallet.name}:`, error)
    } finally {
      setConnecting(null)
    }
  }

  // Render nothing on server
  if (!mounted) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Connect Wallet</DialogTitle>
          <DialogDescription>Connect your wallet to access the Gold Digger marketplace</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="popular" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="all">All Wallets</TabsTrigger>
            <TabsTrigger value="more">More Options</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="mt-4 space-y-4">
            {wallets
              .filter((wallet) => wallet.popular)
              .map((wallet) => (
                <WalletOption
                  key={wallet.adapter}
                  wallet={wallet}
                  connecting={connecting === wallet.adapter}
                  onConnect={() => handleConnect(wallet)}
                />
              ))}
          </TabsContent>

          <TabsContent value="all" className="mt-4 space-y-4">
            {wallets.map((wallet) => (
              <WalletOption
                key={wallet.adapter}
                wallet={wallet}
                connecting={connecting === wallet.adapter}
                onConnect={() => handleConnect(wallet)}
              />
            ))}
          </TabsContent>

          <TabsContent value="more" className="mt-4 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">WalletConnect</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to mobile wallets that support WalletConnect.
              </p>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Image
                  src="/images/wallets/walletconnect.png"
                  alt="WalletConnect"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span>Connect with WalletConnect</span>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Coming soon</p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Email Wallet</h3>
              <p className="text-sm text-muted-foreground mb-4">Create a wallet using just your email address.</p>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Image src="/images/wallets/email.png" alt="Email Wallet" width={24} height={24} className="mr-2" />
                <span>Connect with Email</span>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Coming soon</p>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <div className="text-xs text-muted-foreground text-center">
          By connecting your wallet, you agree to our{" "}
          <a href="/terms" className="underline hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </a>
          .
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Wallet option component
function WalletOption({
  wallet,
  connecting,
  onConnect,
}: {
  wallet: WalletOption
  connecting: boolean
  onConnect: () => void
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-md">
          <Image
            src={wallet.icon || "/placeholder.svg"}
            alt={wallet.name}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="font-medium">{wallet.name}</h3>
          <p className="text-xs text-muted-foreground">{wallet.installed ? "Detected" : "Not installed"}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!wallet.installed && wallet.url && (
          <a
            href={wallet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <Button
          variant={wallet.installed ? "default" : "outline"}
          size="sm"
          disabled={connecting}
          onClick={onConnect}
          className={cn("min-w-[80px]", wallet.installed && "bg-gold-500 hover:bg-gold-600 text-white")}
        >
          {connecting ? (
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Connecting</span>
            </span>
          ) : wallet.installed ? (
            <span className="flex items-center gap-1">
              <Check className="h-3 w-3" />
              <span>Connect</span>
            </span>
          ) : (
            "Install"
          )}
        </Button>
      </div>
    </div>
  )
}

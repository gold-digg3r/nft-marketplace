import type React from "react"
import { MarketplaceProvider } from "@/app/context/marketplace-context"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { SolanaWalletProvider } from "@/components/wallet/wallet-provider"

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <SolanaWalletProvider>
      <MarketplaceProvider>
        <MarketplaceNav />
        <main>{children}</main>
      </MarketplaceProvider>
    </SolanaWalletProvider>
  )
}

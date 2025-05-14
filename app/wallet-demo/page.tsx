"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WalletButton } from "@/components/ui/wallet-button"
import { WalletConnectModal } from "@/components/wallet/wallet-connect-modal"

export default function WalletDemoPage() {
  const [showModal, setShowModal] = useState(false)

  const handleConnect = async (adapter: string) => {
    console.log(`Connecting to ${adapter}...`)
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return Promise.resolve()
  }

  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Wallet Connection Demo</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          This page demonstrates the wallet connection functionality in the Gold Digger marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg border p-6 space-y-4">
          <h2 className="text-xl font-semibold">Wallet Button</h2>
          <p className="text-muted-foreground">
            The wallet button component provides a simple way for users to connect their wallet. When connected, it
            displays the wallet address and balance.
          </p>
          <div className="flex flex-wrap gap-4">
            <WalletButton />
            <WalletButton variant="default" />
            <WalletButton variant="outline" />
            <WalletButton showBalance />
          </div>
        </div>

        <div className="rounded-lg border p-6 space-y-4">
          <h2 className="text-xl font-semibold">Wallet Connection Modal</h2>
          <p className="text-muted-foreground">
            The wallet connection modal provides a more comprehensive interface for connecting multiple wallet types.
          </p>
          <Button onClick={() => setShowModal(true)}>Open Wallet Modal</Button>

          <WalletConnectModal open={showModal} onOpenChange={setShowModal} onConnect={handleConnect} />
        </div>
      </div>

      <div className="rounded-lg border p-6 space-y-4">
        <h2 className="text-xl font-semibold">Implementation Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Multiple wallet support (Phantom, Solflare, etc.)</li>
              <li>Wallet detection</li>
              <li>Responsive design</li>
              <li>Dark mode support</li>
              <li>Loading states</li>
              <li>Error handling</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Usage</h3>
            <div className="bg-muted p-4 rounded-md">
              <pre className="text-xs overflow-x-auto">
                {`<WalletButton />

<WalletConnectModal
  open={showModal}
  onOpenChange={setShowModal}
  onConnect={handleConnect}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

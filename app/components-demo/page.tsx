import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { GoldButton } from "@/components/ui/gold-button"
import { WalletButton } from "@/components/ui/wallet-button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ComponentsDemo() {
  return (
    <div className="min-h-screen">
      <Header
        title="Components Demo"
        description="Explore the updated UI components for the GoldDigger NFT Marketplace"
        backgroundImage="/abstract-gold-pattern.png"
        className="mb-12"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">Buttons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Standard Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <ThemeToggle />
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Gold Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <GoldButton>Gold Button</GoldButton>
                  <GoldButton variant="outline">Outline</GoldButton>
                  <GoldButton size="sm">Small</GoldButton>
                  <GoldButton size="lg">Large</GoldButton>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Wallet Button</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Default</h3>
                <WalletButton />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">With Balance</h3>
                <WalletButton showBalance />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Theme Toggle</h2>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="text-muted-foreground">Switch between light and dark mode</span>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Headers</h2>
            <div className="space-y-8">
              <div className="border rounded-lg overflow-hidden">
                <Header
                  title="Simple Header"
                  description="A clean header with title and description"
                  className="bg-muted/50"
                />
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Header
                  title="Centered Header"
                  description="A centered header with title and description"
                  centered
                  className="bg-muted/50"
                />
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Header
                  title="Header with Background"
                  description="A header with a background image and overlay"
                  backgroundImage="/abstract-gold-pattern.png"
                  className="h-[240px]"
                >
                  <div className="flex gap-4">
                    <GoldButton>Primary Action</GoldButton>
                    <Button variant="outline">Secondary Action</Button>
                  </div>
                </Header>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

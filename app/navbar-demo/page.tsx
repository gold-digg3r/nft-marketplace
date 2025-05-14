import { Navbar } from "@/components/navbar"

export default function NavbarDemo() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Navbar Demo</h1>
          <p className="mb-4">This page demonstrates the responsive navbar component with the new GoldDigger logo.</p>
          <div className="space-y-4">
            <section className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Responsive design for mobile and desktop</li>
                <li>Transparent navbar that changes on scroll</li>
                <li>Mobile menu with slide-out panel</li>
                <li>Active link highlighting</li>
                <li>Theme toggle integration</li>
                <li>Wallet connection button</li>
              </ul>
            </section>

            <section className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Usage</h2>
              <p>Simply import the Navbar component and add it to your layout:</p>
              <pre className="bg-muted p-4 rounded-md mt-2 overflow-x-auto">
                <code>{`import { Navbar } from "@/components/navbar"

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}`}</code>
              </pre>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

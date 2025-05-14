import { Logo } from "@/components/ui/logo"

export function LogoShowcase() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Large Logo</h2>
        <div className="p-4 border rounded-lg">
          <Logo size="lg" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Medium Logo (Default)</h2>
        <div className="p-4 border rounded-lg">
          <Logo />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Small Logo</h2>
        <div className="p-4 border rounded-lg">
          <Logo size="sm" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Icon Only</h2>
        <div className="p-4 border rounded-lg">
          <Logo showText={false} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Dark Mode</h2>
        <div className="p-4 border rounded-lg bg-gray-950 text-white">
          <Logo />
        </div>
      </div>
    </div>
  )
}

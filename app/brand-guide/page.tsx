import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "@/components/ui/logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BrandGuidePage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-6">Logo</h2>
        <Tabs defaultValue="primary">
          <TabsList>
            <TabsTrigger value="primary">Primary</TabsTrigger>
            <TabsTrigger value="variations">Variations</TabsTrigger>
            <TabsTrigger value="usage">Usage Guidelines</TabsTrigger>
          </TabsList>
          <TabsContent value="primary" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="p-8 border rounded-lg flex items-center justify-center bg-white mb-4">
                  <Logo size="lg" />
                </div>
                <p className="text-sm text-muted-foreground">Primary logo with text - for use on light backgrounds</p>
              </div>
              <div>
                <div className="p-8 border rounded-lg flex items-center justify-center bg-gray-950 mb-4">
                  <Logo size="lg" />
                </div>
                <p className="text-sm text-muted-foreground">Primary logo with text - for use on dark backgrounds</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="variations" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="p-6 border rounded-lg flex items-center justify-center bg-white mb-4">
                  <Logo size="sm" />
                </div>
                <p className="text-sm text-muted-foreground">Small</p>
              </div>
              <div>
                <div className="p-6 border rounded-lg flex items-center justify-center bg-white mb-4">
                  <Logo size="md" />
                </div>
                <p className="text-sm text-muted-foreground">Medium</p>
              </div>
              <div>
                <div className="p-6 border rounded-lg flex items-center justify-center bg-white mb-4">
                  <Logo showText={false} />
                </div>
                <p className="text-sm text-muted-foreground">Icon only</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="usage" className="pt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Do</CardTitle>
                    <CardDescription>Recommended usage</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>✓ Maintain clear space around the logo</p>
                    <p>✓ Use the logo on appropriate backgrounds</p>
                    <p>✓ Keep the logo proportions intact</p>
                    <p>✓ Use the provided color variations</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Don't</CardTitle>
                    <CardDescription>Avoid these practices</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>✗ Stretch or distort the logo</p>
                    <p>✗ Change the logo colors</p>
                    <p>✗ Add effects like shadows or glows</p>
                    <p>✗ Place the logo on busy backgrounds</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Logo Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg flex items-center justify-center">
            <Logo size="lg" />
          </div>
          <div className="p-6 border rounded-lg flex items-center justify-center bg-gray-950">
            <Logo size="lg" />
          </div>
          <div className="p-6 border rounded-lg flex items-center justify-center">
            <Logo size="md" />
          </div>
          <div className="p-6 border rounded-lg flex items-center justify-center">
            <Logo size="sm" />
          </div>
          <div className="p-6 border rounded-lg flex items-center justify-center">
            <Logo showText={false} size="lg" />
          </div>
          <div className="p-6 border rounded-lg flex items-center justify-center bg-gold-300">
            <Logo size="md" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="h-24 rounded-lg bg-gold-50 mb-2"></div>
            <p className="font-medium">Gold 50</p>
            <p className="text-sm text-muted-foreground">#f9f7f1</p>
          </div>
          <div>
            <div className="h-24 rounded-lg bg-gold-100 mb-2"></div>
            <p className="font-medium">Gold 100</p>
            <p className="text-sm text-muted-foreground">#eee9d7</p>
          </div>
          <div>
            <div className="h-24 rounded-lg bg-gold-200 mb-2"></div>
            <p className="font-medium">Gold 200</p>
            <p className="text-sm text-muted-foreground">#d4c89d</p>
          </div>
          <div>
            <div className="h-24 rounded-lg bg-gold-300 mb-2"></div>
            <p className="font-medium">Gold 300</p>
            <p className="text-sm text-muted-foreground">#c8b681</p>
          </div>
          <div>
            <div className="h-24 rounded-lg bg-gray-800 mb-2"></div>
            <p className="font-medium">Gray 800</p>
            <p className="text-sm text-muted-foreground">#383838</p>
          </div>
          <div>
            <div className="h-24 rounded-lg bg-gray-900 mb-2"></div>
            <p className="font-medium">Gray 900</p>
            <p className="text-sm text-muted-foreground">#212121</p>
          </div>
          <div>
            <div className="h-24 rounded-lg bg-gray-950 mb-2"></div>
            <p className="font-medium">Gray 950</p>
            <p className="text-sm text-muted-foreground">#121212</p>
          </div>
          <div>
            <div className="h-24 rounded-lg bg-white border mb-2"></div>
            <p className="font-medium">White</p>
            <p className="text-sm text-muted-foreground">#ffffff</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Typography</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-4">Geist Sans</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="text-4xl font-light mb-2">Light 300</p>
                <p className="text-muted-foreground">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ <br />
                  abcdefghijklmnopqrstuvwxyz <br />
                  0123456789
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-4xl font-normal mb-2">Regular 400</p>
                <p className="text-muted-foreground">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ <br />
                  abcdefghijklmnopqrstuvwxyz <br />
                  0123456789
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-4xl font-medium mb-2">Medium 500</p>
                <p className="text-muted-foreground">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ <br />
                  abcdefghijklmnopqrstuvwxyz <br />
                  0123456789
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-4xl font-bold mb-2">Bold 700</p>
                <p className="text-muted-foreground">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ <br />
                  abcdefghijklmnopqrstuvwxyz <br />
                  0123456789
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square relative border rounded-lg overflow-hidden mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-zc3uAzTAnmkW5aPaZNdx0Xpuzq4sYn.png"
                alt="GoldDigger Logo"
                fill
                className="object-contain p-8"
              />
            </div>
            <p className="font-medium">Primary Logo</p>
            <p className="text-sm text-muted-foreground">PNG with transparency</p>
          </div>
          <div>
            <div className="aspect-square relative border rounded-lg overflow-hidden mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-353ENiuXrqGZKzkQVp32uUiWhOfLTj.png"
                alt="GoldDigger Favicon"
                fill
                className="object-contain p-8"
              />
            </div>
            <p className="font-medium">Favicon</p>
            <p className="text-sm text-muted-foreground">PNG with transparency</p>
          </div>
        </div>
      </section>
    </div>
  )
}

import { EclipseBackground } from "@/components/eclipse-background"
import { IslandNav } from "@/components/layout/IslandNav"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen bg-transparent font-sans text-foreground antialiased selection:bg-foreground selection:text-background">
      <EclipseBackground />
      <main className="relative z-10 container mx-auto max-w-5xl px-4 py-8 md:py-16">
        {children}
      </main>
      <IslandNav />
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"

export function Hero() {
  const photoSrc = `${import.meta.env.BASE_URL}pfp.webp`

  return (
    <section id="hero" className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-12 py-20 md:flex-row md:justify-between">
      <div className="flex max-w-xl flex-col items-start gap-6 text-left">
        <div className="space-y-2">
          <p className="text-xl font-medium text-muted-foreground">Hey 👋, I'm </p>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Tamil Bharathi
          </h1>
          <p className="text-xl text-muted-foreground">
            Staff Software Engineer 3. I build production backend in Python and Go: MCP tool APIs, REST layers, and workflow engines.
          </p>
        </div>

        <div className="flex gap-4">
          <Button size="lg" className="min-h-12 gap-2" asChild>
            <a href="#projects">
              View Projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="min-h-12 gap-2" asChild>
            <a href={`${import.meta.env.BASE_URL}resume/monochrome_template/`} target="_blank" rel="noopener noreferrer">
              Resume <Download className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-2xl bg-muted">
        <img
          src={photoSrc}
          alt="Tamil Bharathi"
          width={800}
          height={534}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>
    </section>
  )
}

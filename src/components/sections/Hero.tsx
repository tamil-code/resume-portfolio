import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"

export function Hero() {
  return (
    <section id="hero" className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-12 py-20 md:flex-row md:justify-between">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-xl flex-col items-start gap-6 text-left"
      >
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-medium text-muted-foreground">Hey 👋, I'm </h2>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold tracking-tight sm:text-7xl"
          >
            Tamil Bharathi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground"
          >
            A passionate Developer crafting beautiful and functional digital experiences.
          </motion.p>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="flex gap-4"
        >
          <Button size="lg" className="gap-2" asChild>
            <a href="#projects">
              View Projects <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href={`${import.meta.env.BASE_URL}Single_Column_Deedy_CV_Résumé_Template.pdf`} target="_blank" rel="noopener noreferrer">
              Download Resume <Download className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-2xl bg-muted"
      >
        <img 
          src={`${import.meta.env.BASE_URL}pfp_edited.png`}
          alt="Tamil Bharathi"
          className="h-full w-full object-cover opacity-0 transition-opacity duration-500"
          onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
        />
      </motion.div>
    </section>
  )
}

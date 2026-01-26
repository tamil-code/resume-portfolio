import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

const socialLinks = [
  {
    name: "Email",
    href: "mailto:tamilbharathireachmeout@gmail.com",
    icon: Mail,
    color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    description: "Drop me a line"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/tamil-code",
    icon: Linkedin,
    color: "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20",
    description: "Professional network"
  },
  {
    name: "GitHub",
    href: "https://github.com/tamil-code",
    icon: Github,
    color: "bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/20",
    description: "Check my code"
  },
]

export function Connect() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-12"
      >
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Let's Connect</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm currently available for freelance work or full-time opportunities.
            If you have a project that needs some creative touch, let's chat.
          </p>
        </div>
        
        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
           {socialLinks.map((social, index) => {
             const Icon = social.icon
             return (
               <motion.a
                 key={social.name}
                 href={social.href}
                 target="_blank"
                 rel="noopener noreferrer"
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1 }}
                 className={cn(
                   "group relative flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl border bg-card p-6 text-center transition-all hover:border-foreground/20 hover:shadow-2xl hover:-translate-y-1",
                 )}
               >
                 <div className={cn("rounded-full p-4 transition-colors", social.color)}>
                   <Icon className="h-8 w-8" />
                 </div>
                 <div className="space-y-1">
                   <h3 className="font-semibold text-lg">{social.name}</h3>
                   <p className="text-sm text-muted-foreground">{social.description}</p>
                 </div>
                 
                 <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                 </div>
               </motion.a>
             )
           })}
        </div>
      </motion.div>
    </section>
  )
}

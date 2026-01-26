import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import projectsData from "@/data/projects.json"
import { motion } from "framer-motion"
import { Github, Globe } from "lucide-react"

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <p className="text-muted-foreground">What I've been working on.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex h-full flex-col overflow-hidden border-border/50 bg-muted/20 transition-all hover:bg-muted/40 hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                    {/* Placeholder for project image if the path is generic, else render image */}
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        {project.pic.includes("placeholder") || project.pic.startsWith("/") ? (
                           <span className="text-sm">Project Image</span>
                        ) : (
                             <img src={project.pic} alt={project.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                        )}
                    </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                     <CardTitle className="text-xl">{project.name}</CardTitle>
                     {project.git === false && <Badge variant="secondary">Private</Badge>}
                  </div>
                  <CardDescription className="line-clamp-2">{project.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                   {/* Add tech stack tags here if they existed in JSON, for now using placeholder or generic */}
                </CardContent>
                <CardFooter className="flex gap-2">
                    {project.githuburl && (
                        <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                            <a href={project.githuburl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" /> Code
                            </a>
                        </Button>
                    )}
                    {project.liveurl && (
                        <Button variant="default" size="sm" className="flex-1 gap-2" asChild>
                            <a href={project.liveurl} target="_blank" rel="noopener noreferrer">
                                <Globe className="h-4 w-4" /> Live
                            </a>
                        </Button>
                    )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const experiences = [
  {
    role: "Software Developer",
    company: "ComplianceCow",
    companyUrl: "https://www.compliancecow.com/",
    location: "Chennai, India",
    date: "Jan 2024 – Present",
    description: "Built and optimized backend APIs in Go, integrating with PostgreSQL for reliable data storage and retrieval. Containerized services using Docker and gained exposure to Kubernetes for managing microservices deployments. Developed Python-based business rule scripts to automate evidence collection for GRC compliance workflows. Contributed to frontend development including UI revamps and no-code rule configuration interfaces using React and ServiceNow UI Builder.",
    skills: ["Go", "PostgreSQL", "Docker", "Kubernetes", "Python", "React", "ServiceNow"],
  },
  {
    role: "Software Developer Intern",
    company: "ComplianceCow",
    companyUrl: "https://www.compliancecow.com/",
    location: "Chennai, India",
    date: "Aug 2023 – Dec 2023",
    description: "Worked on client-facing features such as control dashboards, assistant chatbot UI, and documentation components. Implemented domain-level user settings within the user management module. Migrated frontend pages from Go templates to React, improving maintainability and scalability.",
    skills: ["React", "Go"],
  },
  {
    role: "Software Developer Intern",
    company: "Byzero Technologies",
    companyUrl: "https://www.byzerotechnologies.com/",
    location: "Erode, India",
    date: "Mar 2023 – Oct 2023",
    description: "Developed frontend components for Dashboard, Navbar, E-Learning Portal, and E-Commerce modules. Collaborated on UI design, API integration, and frontend optimization. Improved performance using React Hooks such as useMemo and useCallback. Built reusable components using Styled Components and ReactJS.",
    skills: ["React", "React Hooks", "Styled Components", "JavaScript"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
          <p className="text-muted-foreground">My professional journey.</p>
        </div>

        <div className="relative space-y-8 border-l-2 border-muted pl-8 md:pl-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[41px] top-6 h-4 w-4 rounded-full border-2 border-background bg-foreground md:-left-[57px]" />
              <Card className="border-none bg-muted/30 transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                    <span className="text-sm text-muted-foreground tabular-nums">{exp.date}</span>
                  </div>
                  <CardDescription className="text-base font-medium text-foreground">
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                    >
                      {exp.company}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {" • "}
                    {exp.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

import { Fragment } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

type Experience = {
  role: string
  company: string
  companyUrl: string
  location: string
  date: string
  highlights: string[]
  skills: string[]
}

const experiences: Experience[] = [
  {
    role: "Software Developer",
    company: "ComplianceCow",
    companyUrl: "https://www.compliancecow.com/",
    location: "Chennai, India",
    date: "Jan 2024 – Present",
    highlights: [
      "Built **MCP tools** across the product suite (forms, assessments, rules, workflows) using the **MCP Python SDK** and **Goose** orchestrator, **moving manual UI clickops to chatops** and **improving client productivity by 75%** (per client testimonial).",
      "Shipped a **no-code task orchestrator** in **Go** that eliminated repeated scripting for control and workflow automation, **cutting authoring effort by 50%**, and authored reusable **Python** utilities for HTTP calls, schema validation, **SQL** querying, and data transforms.",
      "Built the orchestrator's **no-code authoring UI** in **React** with a third-party component library, including config preview, input uploads, and credentialed test execution — **halving rule-building ETA** and shifting the team from hand-written configs to **UI-generated, testable** ones.",
      "Configured customized workflows and control automations for enterprise clients, **reducing audit-preparation time by 80%**.",
    ],
    skills: ["MCP", "Python", "Goose", "Go", "SQL", "React"],
  },
  {
    role: "Software Developer Intern",
    company: "ComplianceCow",
    companyUrl: "https://www.compliancecow.com/",
    location: "Chennai, India",
    date: "Aug 2023 – Dec 2023",
    highlights: [
      "Migrated the entire product from **Go templates** to a **React + Turborepo monorepo**, improving **maintainability, scalability, and navigation performance**, and lifting overall developer and user experience.",
      "Built client-facing features including **control dashboards**, an **assistant chatbot UI**, and **in-app documentation** components.",
    ],
    skills: ["Go", "React", "Turborepo"],
  },
  {
    role: "React Native Developer",
    company: "Byzero Technologies",
    companyUrl: "https://www.byzerotechnologies.com/",
    location: "Erode, India",
    date: "Mar 2023 – Oct 2023",
    highlights: [
      "Designed UI mocks and built the **storefront frontend** for an e-commerce platform in **React** with **React Query** caching and API integration for **fast, low-latency page loads**.",
      "Shipped an internal daily **work-log mobile app** in **React Native** using **Expo**, **Redux Toolkit**, **React Context**, and **React Query** — cutting standup overhead and **improving team productivity by 50%**, with logs feeding into performance-review metrics.",
      "Delivered client-facing static **WordPress** sites on schedule with **custom PHP plugin** development, ensuring **on-time release and client satisfaction**.",
    ],
    skills: ["React", "React Native", "Expo", "Redux Toolkit", "React Query", "React Context", "WordPress", "PHP"],
  },
]

function renderHighlight(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

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
                  <ul className="space-y-2 text-muted-foreground">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="relative pl-5 leading-relaxed">
                        <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                        {renderHighlight(highlight)}
                      </li>
                    ))}
                  </ul>
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

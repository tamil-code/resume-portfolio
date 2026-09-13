import { Fragment } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    role: "Staff Software Engineer 3",
    company: "ComplianceCow",
    companyUrl: "https://www.compliancecow.com/",
    location: "Chennai, India",
    date: "Jul 2024 – Present",
    highlights: [
      "Built production **MCP** tools (MCP Python SDK) over product **REST APIs** with tool schemas, token auth pass-through, and error contracts, so LLM clients run Forms, Assessments, Rules, and Workflows instead of a click path.",
      "Shipped a **Go** workflow engine with concurrent workers, retries, timeouts, and failure handling for control and workflow automation, replacing per-customer scripts and cutting authoring effort about **50%**.",
      "Wrote reusable **Python** integration code: HTTP clients (pagination, rate limits), JSON Schema validation, **SQL** querying, and data transforms used by multi-step jobs.",
      "Debugged production run failures at the job boundary (timeouts, retries, bad payloads) and tightened validation so bad input fails before a run starts.",
      "Contributed to **20+ Go microservices** that power the CCM product APIs, from authentication through control automation and monitoring.",
      "Implemented common control mappings in a GRC / CCM product used against enterprise frameworks including **SOC 2** and **ISO 27001**, so one control set could cover multiple client scopes.",
    ],
    skills: ["MCP", "Python", "Go", "REST APIs", "SQL", "Docker", "Kubernetes"],
  },
  {
    role: "Software Developer Intern",
    company: "ComplianceCow",
    companyUrl: "https://www.compliancecow.com/",
    location: "Chennai, India",
    date: "Jan 2024 – Jun 2024",
    highlights: [
      "Built **React** control dashboards and a chatbot UI that consume backend APIs; migrated the product frontend from **Go templates** to a **React + Turborepo** monorepo.",
      "Wrote control-automation integrations against enterprise systems (**Azure**, **AWS**, **GCP**, **Okta**, **GitHub**, **GitLab**, **AuditBoard**, **Salesforce**, **ServiceNow**).",
    ],
    skills: ["React", "Turborepo", "Azure", "AWS", "GCP", "Okta", "GitHub", "GitLab", "ServiceNow"],
  },
  {
    role: "React Native Developer",
    company: "Byzero Technologies",
    companyUrl: "https://www.byzerotechnologies.com/",
    location: "Erode, India",
    date: "Mar 2023 – Oct 2023",
    highlights: [
      "Integrated **REST APIs** into a React storefront (caching, retries on failed loads) and shipped an internal **React Native** work-log app.",
    ],
    skills: ["React", "React Native", "REST APIs"],
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
      <div className="space-y-12">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
          <p className="text-muted-foreground">My professional journey.</p>
        </div>

        <div className="relative space-y-8 border-l-2 border-muted pl-8 md:pl-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative"
            >
              <span className="absolute -left-[41px] top-6 h-4 w-4 rounded-full border-2 border-background bg-foreground md:-left-[57px]" />
              <Card className="border-none bg-background/70 backdrop-blur-md transition-colors hover:bg-background/80">
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
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

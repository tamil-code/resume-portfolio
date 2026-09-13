import { BookOpen, Briefcase, Home, Mail, User, type LucideIcon } from "lucide-react"
import { useState } from "react"

const navItems = [
  { name: "Home", icon: Home, href: "#hero" },
  { name: "Experience", icon: Briefcase, href: "#experience" },
  { name: "Projects", icon: User, href: "#projects" },
  { name: "Books", icon: BookOpen, href: "#books" },
  { name: "Link", icon: Mail, href: "#contact" },
]

export function IslandNav() {
  return (
    <nav aria-label="Page sections" className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <div className="flex h-20 items-end gap-4 rounded-2xl border border-black/10 bg-white/50 px-4 pb-3 backdrop-blur-2xl dark:border-white/10 dark:bg-black/50">
        {navItems.map((item) => (
          <DockIcon key={item.name} href={item.href} icon={item.icon} name={item.name} />
        ))}
      </div>
    </nav>
  )
}

function DockIcon({
  icon: Icon,
  href,
  name,
}: {
  icon: LucideIcon
  href: string
  name: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative flex flex-col items-center">
      {isHovered && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-md border border-white/10 bg-black/90 px-2 py-1 text-[10px] text-white backdrop-blur-md whitespace-nowrap">
          {name}
        </div>
      )}
      <a
        href={href}
        aria-label={name}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 shadow-lg ring-1 ring-white/10 transition-transform hover:scale-110 hover:bg-background"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
      </a>
    </div>
  )
}

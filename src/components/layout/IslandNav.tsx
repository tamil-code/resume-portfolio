import { AnimatePresence, motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion"
import { BookOpen, Briefcase, Home, Mail, User } from "lucide-react"
import { useRef, useState } from "react"

const navItems = [
  { name: "Home", icon: Home, href: "#hero" },
  { name: "Experience", icon: Briefcase, href: "#experience" },
  { name: "Projects", icon: User, href: "#projects" },
  { name: "Books", icon: BookOpen, href: "#books" },
  { name: "Link", icon: Mail, href: "#contact" },
]

export function IslandNav() {
  const mouseX = useMotionValue(Infinity)

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-end gap-4 rounded-2xl border border-black/10 bg-white/50 px-4 pb-3 backdrop-blur-2xl dark:border-white/10 dark:bg-black/50"
      >
        {navItems.map((item) => (
          <DockIcon key={item.name} mouseX={mouseX} href={item.href} icon={item.icon} name={item.name} />
        ))}
      </motion.div>
    </div>
  )
}

function DockIcon({
  mouseX,
  icon: Icon,
  href,
  name,
}: {
  mouseX: MotionValue
  icon: React.ElementType
  href: string
  name: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-10 left-1/2 rounded-md border border-white/10 bg-black/90 px-2 py-1 text-[10px] text-white backdrop-blur-md whitespace-nowrap"
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
        ref={ref}
        href={href}
        style={{ width }}
        className="aspect-square w-10 flex items-center justify-center rounded-full bg-background/80 shadow-lg ring-1 ring-white/10 hover:bg-background"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Icon className="h-5 w-5 text-foreground" />
      </motion.a>
    </div>
  )
}

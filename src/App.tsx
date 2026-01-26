import { MainLayout } from "@/components/layout/MainLayout"
import { ModeToggle } from "@/components/mode-toggle"
import { Books } from "@/components/sections/Books"
import { Connect } from "@/components/sections/Connect"
import { Experience } from "@/components/sections/Experience"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainLayout>
        <ModeToggle />
        <Hero />
        <Experience />
        <Projects />
        <Books />
        <Connect />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App

import { useTheme } from "@/components/theme-provider"
import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  r: number
  a: number
  layer: 0 | 1 | 2
}

type Dust = {
  x: number
  y: number
  r: number
  a: number
}

function hash(n: number) {
  const s = Math.sin(n * 12.9898) * 43758.5453
  return s - Math.floor(s)
}

function buildField(width: number, height: number) {
  const stars: Star[] = []
  const counts: Array<[number, 0 | 1 | 2]> = [
    [70, 0],
    [36, 1],
    [16, 2],
  ]
  let id = 1
  for (const [count, layer] of counts) {
    for (let i = 0; i < count; i++) {
      stars.push({
        x: hash(id++) * width,
        y: hash(id++) * height,
        r: layer === 0 ? 0.55 : layer === 1 ? 0.95 : 1.45,
        a: 0.22 + hash(id++) * 0.45,
        layer,
      })
    }
  }

  const dust: Dust[] = []
  const bandY = height * 0.42
  for (let i = 0; i < 160; i++) {
    const t = i / 160
    dust.push({
      x: t * width + (hash(id++) - 0.5) * 48,
      y: bandY + Math.sin(t * Math.PI * 1.4) * height * 0.08 + (hash(id++) - 0.5) * 28,
      r: 0.4 + hash(id++) * 1.2,
      a: 0.03 + hash(id++) * 0.05,
    })
  }

  return { stars, dust }
}

export function EclipseBackground() {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(resolvedTheme)
  const mixRef = useRef(resolvedTheme === "dark" ? 1 : 0)

  useEffect(() => {
    themeRef.current = resolvedTheme
  }, [resolvedTheme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let field = { stars: [] as Star[], dust: [] as Dust[] }
    let raf = 0
    let dpr = 1

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const scroll = { y: 0 }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      field = buildField(width, height)
    }

    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / width) * 2 - 1
      mouse.ty = (e.clientY / height) * 2 - 1
    }

    const onScroll = () => {
      scroll.y = window.scrollY
    }

    resize()
    onScroll()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })

    const shift = (layer: number) => {
      const depth = layer === 0 ? 6 : layer === 1 ? 11 : 16
      const scrollK = layer === 0 ? 0.08 : layer === 1 ? 0.22 : 0.42
      return {
        x: mouse.x * depth,
        y: mouse.y * depth * 0.7 + scroll.y * scrollK,
      }
    }

    const paint = (now: number) => {
      const target = themeRef.current === "dark" ? 1 : 0
      mixRef.current += (target - mixRef.current) * (reduced ? 1 : 0.045)
      const night = mixRef.current
      const day = 1 - night

      if (!reduced) {
        mouse.x += (mouse.tx - mouse.x) * 0.06
        mouse.y += (mouse.ty - mouse.y) * 0.06
      }

      const bgR = 255 * day + 18 * night
      const bgG = 255 * day + 20 * night
      const bgB = 255 * day + 28 * night
      ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`
      ctx.fillRect(0, 0, width, height)

      if (night > 0.02) {
        const s0 = shift(0)
        const s1 = shift(1)
        const s2 = shift(2)
        const layers = [s0, s1, s2]

        ctx.save()
        ctx.globalCompositeOperation = "lighter"
        for (const spec of field.dust) {
          const p = s1
          ctx.fillStyle = `rgba(190, 205, 230, ${spec.a * night})`
          ctx.beginPath()
          ctx.arc(spec.x + p.x * 0.4, spec.y + p.y * 0.4, spec.r, 0, Math.PI * 2)
          ctx.fill()
        }

        for (let i = 0; i < field.stars.length; i++) {
          const star = field.stars[i]
          const p = layers[star.layer]
          const twinkle = reduced ? 1 : 0.82 + Math.sin(now * 0.0011 + i) * 0.18
          ctx.fillStyle = `rgba(236, 240, 248, ${star.a * night * twinkle})`
          ctx.beginPath()
          ctx.arc(star.x + p.x, star.y + p.y, star.r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.35,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72,
      )
      vignette.addColorStop(0, "rgba(0,0,0,0)")
      vignette.addColorStop(1, `rgba(0,0,0,${0.28 * night})`)
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      raf = requestAnimationFrame(paint)
    }

    raf = requestAnimationFrame(paint)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}

import { useScroll } from "@react-three/drei"
import { useEffect, useRef } from "react"

export function StickyTitle() {
  const ref = useRef<HTMLHeadingElement>(null)
  const scroll = useScroll()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const unsubscribe = scroll.el?.addEventListener("scroll", () => {
      const o = scroll.offset

      // page 1 → page 2 (100vh)
      const isSticky = o > 0.2 && o < 0.4

      el.style.position = isSticky ? "fixed" : "absolute"
      el.style.top = isSticky ? "50%" : "100vh"
      el.style.transform = isSticky
        ? "translateY(-50%)"
        : "translateY(0)"
    })

    return () => {
      scroll.el?.removeEventListener("scroll", unsubscribe as any)
    }
  }, [scroll])

  return (
    <h1
      ref={ref}
      style={{
        position: "absolute",
        top: "100vh",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "20vw",
        pointerEvents: "none",
      }}
    >
      all
    </h1>
  )
}

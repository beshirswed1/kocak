"use client"

import { useEffect, useRef, useState } from "react"

export function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let cancelled = false

    // Use rAF so the browser has computed layout before we check position
    const raf = requestAnimationFrame(() => {
      if (cancelled) return

      // If already in / near viewport, reveal immediately
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight + 100 && rect.bottom > 0) {
        setVisible(true)
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(el)
          }
        },
        { threshold, rootMargin: "0px 0px -50px 0px" }
      )

      observer.observe(el)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [threshold])

  return { ref, visible }
}

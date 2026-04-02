"use client"

import { Phone, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const info = useSelector((state: RootState) => state.restaurant.info);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Mobile Bottom Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md p-3 md:hidden transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="flex gap-2">
          <a
            href={`tel:${info.phone}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform active:scale-95"
          >
            <Phone className="h-4 w-4" />
            Hemen Ara
          </a>
          <a
            href={`https://wa.me/${info.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Desktop Floating Buttons */}
      <div
        className={`fixed bottom-6 right-6 z-50 hidden md:flex flex-col gap-3 transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${info.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40"
          title="WhatsApp ile yazın"
        >
          <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
        </a>
        {/* Phone */}
        <a
          href={`tel:${info.phone}`}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/40 animate-pulse-glow"
          title="Hemen arayın"
        >
          <Phone className="h-6 w-6 transition-transform group-hover:rotate-12" />
        </a>
      </div>
    </>
  )
}

"use client"

import { Star } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useAppSelector } from "@/store/hooks"

export function CTABanner() {
  const info = useAppSelector((s) => s.restaurant.info)
  const cta = useAppSelector((s) => s.restaurant.cta)
  const { ref, visible } = useReveal()

  return (
    <section className="relative bg-primary py-16 overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-float delay-300" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center lg:px-8">
        <div className={`flex items-center justify-center gap-1 mb-4 ${visible ? "animate-scale-in" : "opacity-0"}`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-accent text-accent" style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
        <h2 className={`font-serif text-3xl font-bold text-primary-foreground md:text-4xl text-balance ${
          visible ? "animate-fade-in-up delay-200" : "opacity-0"
        }`}>
          {cta.ctaBannerTitle}
        </h2>
        <p className={`mx-auto mt-3 max-w-lg text-primary-foreground/80 text-pretty ${
          visible ? "animate-fade-in-up delay-300" : "opacity-0"
        }`}>
          {info.reviewCount.toLocaleString("tr-TR")} {cta.ctaBannerSubtitle}
        </p>
        <div className={`mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center ${
          visible ? "animate-fade-in-up delay-400" : "opacity-0"
        }`}>
          <a
            href="/menu"
            className="group flex items-center gap-2 rounded-xl bg-primary-foreground px-8 py-4 text-base font-bold text-primary shadow-lg transition-all duration-300 hover:bg-primary-foreground/90 hover:scale-105 hover:shadow-xl"
          >
            Menüyü İncele
          </a>
        </div>
      </div>
    </section>
  )
}

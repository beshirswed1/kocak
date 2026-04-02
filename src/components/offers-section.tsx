"use client"

import { Tag, Percent, Gift } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { useReveal } from "@/hooks/use-reveal"

const offerIcons = [Gift, Percent, Tag]

export function OffersSection() {
  const offers = useAppSelector((s) => s.restaurant.offers)
  const { ref, visible } = useReveal()

  if (offers.length === 0) return null

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 py-20 overflow-hidden" ref={ref}>
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className={`mb-10 text-center ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 mb-4 backdrop-blur-sm">
            <Tag className="h-4 w-4 text-accent animate-bounce-gentle" />
            <span className="text-sm font-semibold text-accent">Kampanyalar</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl text-balance">
            Özel Teklifler
          </h2>
          <p className="mt-3 text-white/70 text-pretty">
            Kaçırmayın! Sınırlı süreli fırsatlar
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer, i) => {
            const Icon = offerIcons[i % offerIcons.length]
            return (
              <div
                key={offer.id}
                className={`group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 transition-all duration-500 hover:bg-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 ${
                  visible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-7 w-7 text-accent" />
                </div>

                {/* Discount badge */}
                <div className="inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground mb-3 animate-pulse-glow">
                  {offer.discount}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {offer.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-500 group-hover:w-full" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

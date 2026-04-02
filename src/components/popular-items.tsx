"use client"

import { Flame } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useAppSelector } from "@/store/hooks"
import Image from "next/image"

export function PopularItems() {
  const menu = useAppSelector((s) => s.restaurant.menu)
  const { ref, visible } = useReveal()

  const popularItems = menu
    .flatMap((cat) => cat.items)
    .filter((item) => item.isPopular)
    .slice(0, 6)

  if (popularItems.length === 0) return null

  return (
    <section id="populer" className="bg-secondary py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className={`mb-10 text-center ${visible ? "animate-fade-in-up" : ""}`}>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-4 py-1.5 mb-4">
            <Flame className="h-4 w-4 text-red-500 animate-wiggle" />
            <span className="text-sm font-semibold text-red-600">En Popüler</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            En Çok Sipariş Edilen
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Müşterilerimizin en sevdiği lezzetler
          </p>
        </div>

        {/* Popular Items Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularItems.map((item, i) => (
            <div
              key={item.id}
              className={`group flex flex-col relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30 ${
                visible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Image Area */}
              <div className="relative h-48 w-full bg-muted overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-secondary">
                    🍽️
                  </div>
                )}
                {/* Fire badge */}
                <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-lg animate-bounce-gentle shadow-sm">
                  🔥
                </div>
                {/* Rank */}
                <div className="absolute top-4 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/90 text-sm font-bold text-primary-foreground shadow-sm backdrop-blur-sm">
                  #{i + 1}
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-xl font-bold gradient-text">
                    {item.price} ₺
                  </span>
                  <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full font-medium">
                    ⭐ Müşteri Favorisi
                  </span>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

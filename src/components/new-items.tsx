"use client"

import { Sparkles } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useAppSelector } from "@/store/hooks"
import Image from "next/image"

export function NewItems() {
  const menu = useAppSelector((s) => s.restaurant.menu)
  const { ref, visible } = useReveal()

  const newItems = menu
    .flatMap((cat) => cat.items)
    .filter((item) => item.isNew)

  if (newItems.length === 0) return null

  return (
    <section className="bg-background py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className={`mb-10 text-center ${visible ? "animate-fade-in-up" : ""}`}>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 mb-4">
            <Sparkles className="h-4 w-4 text-emerald-500 animate-wiggle" />
            <span className="text-sm font-semibold text-emerald-600">Yeni Eklenen</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Yeni Ürünler
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Menümüze yeni eklenen özel lezzetler
          </p>
        </div>

        {/* New Items Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newItems.map((item, i) => (
            <div
              key={item.id}
              className={`group flex flex-col relative overflow-hidden rounded-2xl bg-card border-2 border-emerald-100 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 hover:border-emerald-300 ${
                visible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Image Area */}
              <div className="relative h-48 w-full bg-emerald-50/50 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    ✨
                  </div>
                )}
                
                {/* YENİ badge */}
                <div className="absolute top-0 right-0 z-10">
                  <div className="bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">
                    ✨ YENİ
                  </div>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-600 transition-colors line-clamp-1 mt-1">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-emerald-50">
                  <span className="text-xl font-bold text-emerald-600">
                    {item.price} ₺
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-medium">
                    Deneyin!
                  </span>
                </div>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

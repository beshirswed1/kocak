"use client"

import { Phone } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { setActiveCategory } from "@/store/slices/uiSlice"
import { useReveal } from "@/hooks/use-reveal"

export function MenuSection() {
  const dispatch = useAppDispatch()
  const menu = useAppSelector((s) => s.restaurant.menu)
  const activeCategory = useAppSelector((s) => s.ui.activeCategory)
  const info = useAppSelector((s) => s.restaurant.info)
  const cta = useAppSelector((s) => s.restaurant.cta)
  const { ref, visible } = useReveal()

  const currentCategory = menu.find((c) => c.id === activeCategory) || menu[0]

  return (
    <section id="menu" className="bg-background py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className={`mb-10 text-center ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Menümüz
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            {cta.menuSectionTitle}
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            {cta.menuSectionSubtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`mb-8 flex overflow-x-auto scrollbar-hide ${visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
          <div className="mx-auto flex gap-2">
            {menu.map((category) => (
              <button
                key={category.id}
                onClick={() => dispatch(setActiveCategory(category.id))}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {currentCategory?.items.map((item, i) => (
            <div
              key={item.id}
              className="group flex items-start justify-between rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  {item.isPopular && (
                    <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full font-medium animate-bounce-gentle">
                      🔥 Popüler
                    </span>
                  )}
                  {item.isNew && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      ✨ Yeni
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
              <span className="ml-4 shrink-0 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                {item.price} ₺
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-10 flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-r from-secondary to-secondary/50 p-8 text-center border border-border ${
          visible ? "animate-fade-in-up delay-400" : "opacity-0"
        }`}>
          <p className="text-lg font-semibold text-foreground">
            Sipariş vermek için hemen arayın
          </p>
          <a
            href={`tel:${info.phone}`}
            className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            <Phone className="h-5 w-5" />
            {info.phone}
          </a>
        </div>
      </div>
    </section>
  )
}

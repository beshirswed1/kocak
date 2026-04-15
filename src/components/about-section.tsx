"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useAppSelector } from "@/store/hooks"
import yemek from "../../public/yemek.jpeg"

export function AboutSection() {
  const { ref, visible } = useReveal()
  const info = useAppSelector((s) => s.restaurant.info)
  const about = useAppSelector((s) => s.restaurant.about)

  return (
    <section id="hakkimizda" className="bg-secondary py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl group ${visible ? "animate-slide-in-left" : "opacity-0"
            }`}>
            <Image
              src={yemek}
              alt={`${info.name} iç mekan`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-2">
              <span className="text-sm font-bold text-white">{about.badge}</span>
            </div>
          </div>

          {/* Content */}
          <div className={visible ? "animate-slide-in-right" : "opacity-0"}>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {about.sectionTitle}
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              {about.title}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
              {about.description}
            </p>

            {/* Features */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {about.features.map((feature, i) => (
                <div
                  key={feature}
                  className={`flex items-center gap-2 ${visible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                  style={{ animationDelay: `${400 + i * 100}ms` }}
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

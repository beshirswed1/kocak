"use client"

import { Phone, Star, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useAppSelector } from "@/store/hooks"

export function HeroSection() {
  const info = useAppSelector((s) => s.restaurant.info)
  const hero = useAppSelector((s) => s.restaurant.hero)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-restaurant.jpeg"
          alt={`${info.name} - ${info.slogan}`}
          fill
          className="object-cover scale-105 animate-[scaleIn_1.5s_ease-out_forwards]"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        {/* Animated decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float delay-500" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start px-4 py-20 lg:px-8 w-full">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full glass px-5 py-2 animate-fade-in-down">
          <Star className="h-4 w-4 fill-accent text-accent animate-wiggle" />
          <span className="text-sm font-medium text-accent">
            {hero.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-7xl animate-fade-in-up">
          {hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 animate-fade-in-up delay-200">
          {hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-400">
          <a
            href={`tel:${info.phone}`}
            className="group flex items-center justify-center gap-2 rounded-xl bg-primary px-10 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-primary/30 active:scale-95"
          >
            <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
            Hemen Ara
          </a>
          <a
            href={`https://wa.me/${info.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-10 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:bg-[#20BD5A] hover:scale-105 hover:shadow-[#25D366]/30 active:scale-95"
          >
            <svg className="h-5 w-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <a
            href="/menu"
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-10 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50"
          >
            Menüyü Gör
          </a>
        </div>
      </div>
    </section>
  )
}

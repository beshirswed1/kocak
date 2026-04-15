"use client"

import { Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useAppSelector } from "@/store/hooks"

export function HeroSection() {
  const info = useAppSelector((s) => s.restaurant.info)
  const hero = useAppSelector((s) => s.restaurant.hero)

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Cinematic Pan */}
      <div className="absolute inset-0">
        <Image
          src="/hero-restaurant.jpeg"
          alt={`${info.name} - ${info.slogan}`}
          fill
          className="object-cover scale-110 animate-[kenburns_20s_ease-in-out_infinite_alternate]"
          priority
        />
        {/* Advanced Gradient Overlay - dark at top for navbar, clear in middle, dark at bottom for trust signals */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
      </div>

      {/* Content - Mobile First, Centered */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center px-4 pt-20 pb-32 text-center lg:px-8">
        
        {/* Luxury Badge */}
        <div className="mb-8 flex items-center gap-2.5 rounded-full border border-white/20 bg-black/30 px-6 py-2.5 backdrop-blur-md shadow-2xl animate-fade-in-down">
          <Star className="h-4 w-4 fill-primary text-primary animate-pulse" />
          <span className="text-sm font-semibold tracking-wider text-white uppercase">
            {hero.badge}
          </span>
          <Star className="h-4 w-4 fill-primary text-primary animate-pulse" />
        </div>

        {/* Cinematic Headline */}
        <h1 className="max-w-4xl font-serif text-5xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl animate-fade-in-up">
          {hero.headline}
        </h1>

        {/* Elegant Subheadline */}
        <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90 drop-shadow-lg sm:text-xl lg:text-2xl animate-fade-in-up delay-200">
          {hero.subheadline}
        </p>

        {/* Mobile Full-Width CTA */}
        <div className="mt-12 flex w-full max-w-sm flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center animate-fade-in-up delay-400">
          <a
            href="/menu"
            className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-primary px-8 py-5 text-lg font-bold text-primary-foreground overflow-hidden transition-transform duration-300 active:scale-95 shadow-[0_0_40px_rgba(var(--primary),0.4)]"
          >
            {/* Hover shine effect */}
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="relative z-10">Menüyü Keşfet</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}

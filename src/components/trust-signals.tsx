"use client"

import { Star, Users, Award, Utensils, Car, MapPin } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useEffect, useState } from "react"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, visible } = useReveal()

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [visible, target])

  return (
    <span ref={ref} className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5 tracking-tight tabular-nums drop-shadow-md">
      {visible ? count.toLocaleString("tr-TR") : "0"}{suffix}
    </span>
  )
}

const signals = [
  {
    icon: Star,
    value: 3.9,
    suffix: "/5",
    label: "Google Puanı",
    description: "1.600+ değerlendirme",
    isDecimal: true,
  },
  {
    icon: Users,
    value: 1600,
    suffix: "+",
    label: "Mutlu Müşteri",
    description: "Her gün artan güven",
    isDecimal: false,
  },
  {
    icon: MapPin,
    value: 0,
    suffix: "",
    label: "Merkezi Konum",
    description: "Kolay ulaşılabilir",
    isDecimal: false,
    isText: true,
    textValue: "Gaziantep",
  },
  {
    icon: Car,
    value: 0,
    suffix: "",
    label: "Paket Servis",
    description: "Hızlı & sıcak teslimat",
    isDecimal: false,
    isText: true,
    textValue: "Hızlı",
  },
]

export function TrustSignals() {
  const { ref, visible } = useReveal()

  return (
    <section className="relative z-20 -mt-24 pb-12 sm:-mt-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {signals.map((signal, i) => (
            <div
              key={signal.label}
              className={`group flex flex-col items-center rounded-[2rem] border border-white/10 bg-black/40 p-5 sm:p-6 text-center shadow-2xl backdrop-blur-xl transition-all duration-500 hover:bg-black/60 hover:-translate-y-1 hover:border-white/20 ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="mb-3 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 transition-colors duration-500 group-hover:bg-primary">
                <signal.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              {signal.isText ? (
                <span className="text-xl sm:text-2xl font-extrabold text-white mb-0.5 tracking-tight drop-shadow-md">
                  {signal.textValue}
                </span>
              ) : signal.isDecimal ? (
                <span className="text-xl sm:text-2xl font-extrabold text-white mb-0.5 tracking-tight animate-count-up drop-shadow-md">
                  {signal.value}
                  {signal.suffix}
                </span>
              ) : (
                <AnimatedCounter target={signal.value} suffix={signal.suffix} />
              )}
              <span className="text-xs sm:text-sm font-bold text-white/90 mb-1">{signal.label}</span>
              <span className="text-[10px] sm:text-xs text-white/60 font-medium leading-relaxed hidden sm:block">
                {signal.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

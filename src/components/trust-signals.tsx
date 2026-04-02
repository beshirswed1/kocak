"use client"

import { Star, Users, Award, Utensils, Car, ShoppingBag } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useAppSelector } from "@/store/hooks"
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
    <span ref={ref} className="text-3xl font-bold text-foreground mb-1 tracking-tight tabular-nums">
      {visible ? count.toLocaleString("tr-TR") : "0"}{suffix}
    </span>
  )
}

const signals = [
  {
    icon: Star,
    value: 4.4,
    suffix: "/5",
    label: "Google Puanı",
    description: "1.600+ gerçek değerlendirme",
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
    icon: Utensils,
    value: 0,
    suffix: "",
    label: "Restoranda Yemek",
    description: "Sıcak ve aile ortamı",
    isDecimal: false,
    isText: true,
    textValue: "rahat-yerlerimiz",
  },
  {
    icon: Car,
    value: 0,
    suffix: "",
    label: "paket-servis",
    description: "Hızlı al-götür servisi",
    isDecimal: false,
    isText: true,
    textValue: "sipariş-ver",
  },
]

export function TrustSignals() {
  const { ref, visible } = useReveal()

  return (
    <section className="relative z-20 -mt-16 lg:-mt-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {signals.map((signal, i) => (
            <div
              key={signal.label}
              className={`group flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-xl shadow-black/5 border border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-primary/10 hover:border-primary/30 ${visible ? "animate-fade-in-up" : "opacity-0"
                }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 group-hover:scale-110">
                <signal.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              {signal.isText ? (
                <span className="text-3xl font-bold text-foreground mb-1 tracking-tight">{signal.textValue}</span>
              ) : signal.isDecimal ? (
                <span className="text-3xl font-bold text-foreground mb-1 tracking-tight animate-count-up">
                  {signal.value}{signal.suffix}
                </span>
              ) : (
                <AnimatedCounter target={signal.value} suffix={signal.suffix} />
              )}
              <span className="text-sm font-bold text-foreground mb-1">{signal.label}</span>
              <span className="text-xs text-muted-foreground font-medium leading-relaxed">{signal.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

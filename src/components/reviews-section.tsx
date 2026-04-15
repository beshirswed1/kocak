"use client"

import { Star, ExternalLink } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { useReveal } from "@/hooks/use-reveal"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 transition-all duration-300 ${i < rating ? "fill-accent text-accent" : "text-border"
            }`}
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const reviews = useAppSelector((s) => s.restaurant.reviews)
  const info = useAppSelector((s) => s.restaurant.info)
  const { ref, visible } = useReveal()

  return (
    <section id="yorumlar" className="bg-background py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className={`mb-12 text-center ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Müşterilerimiz Ne Diyor
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            {info.reviewCount.toLocaleString("tr-TR")}+ Gerçek Değerlendirme
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Google Maps üzerinden doğrulanmış müşterilerimizin yorumları
          </p>

          {/* Overall Rating */}
          <div className={`mt-6 inline-flex items-center gap-4 rounded-2xl bg-card border border-border px-6 py-4 shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 ${visible ? "animate-scale-in delay-200" : "opacity-0"
            }`}>
            <span className="text-5xl font-bold gradient-text">{info.rating}</span>
            <div className="flex flex-col items-start gap-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {info.reviewCount.toLocaleString("tr-TR")}+ değerlendirmeye dayalı
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className={`group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 ${visible ? "animate-fade-in-up" : "opacity-0"
                }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-transform duration-300 group-hover:scale-110">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.reviewCount}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>

              {/* Stars */}
              <div className="mt-3">
                <StarRating rating={review.rating} />
              </div>

              {/* Text */}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Google badge */}
              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Google ile doğrulandı</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        {info.googleMapsUrl && (
          <div className={`mt-8 text-center ${visible ? "animate-fade-in-up delay-600" : "opacity-0"}`}>
            <a
              href={"https://maps.app.goo.gl/Jg22HA4KQAFMYeTBA"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-secondary hover:scale-105 hover:shadow-md"
            >
              <ExternalLink className="h-4 w-4" />
              bizi değerlendirin
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

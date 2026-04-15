"use client"

import { MapPin, Navigation, ExternalLink } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useAppSelector } from "@/store/hooks"
import { defaultMap } from "@/constants/restaurant-data"

export function MapSection() {
  const { ref, visible } = useReveal()
  const info = useAppSelector((s) => s.restaurant.info)
  const map = useAppSelector((s) => s.restaurant.map)

  // Harita iframe kodu yapıştırılırsa sadece src kısmını al
  const getEmbedSrc = (input: string) => {
    if (!input) return "";
    const match = input.match(/src="([^"]+)"/);
    return match ? match[1] : input;
  };

  const embedSrc = getEmbedSrc(map.googleMapsEmbed || defaultMap.googleMapsEmbed);

  return (
    <section id="konum" className="bg-secondary py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info Side */}
          <div className={`lg:col-span-2 flex flex-col justify-center ${visible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-4 w-fit">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Konumumuz</span>
            </div>

            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Bizi Ziyaret Edin
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {map.address || info.address}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {map.googleMapsUrl && (
                <>
                  <a
                    href={"https://maps.app.goo.gl/Jg22HA4KQAFMYeTBA"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 w-fit"
                  >
                    <Navigation className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    Yol Tarifi Al
                  </a>
                  <a
                    href={"https://maps.app.goo.gl/Jg22HA4KQAFMYeTBA"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Google Maps{"'"}te Aç
                  </a>
                </>
              )}
            </div>

            {/* Services */}
            <div className="mt-8 flex flex-wrap gap-2">
              {map.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-card border border-border px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className={`lg:col-span-3 ${visible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl group">
              {embedSrc ? (
                <iframe
                  src={embedSrc}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${info.name} Konum`}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-[450px] bg-muted text-muted-foreground">
                  <p>Harita bilgisi henüz yapılandırılmadı</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

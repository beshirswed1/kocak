"use client"

import { Play, Film } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useAppSelector } from "@/store/hooks"
import { useState } from "react"

export function VideoSection() {
  const { ref, visible } = useReveal()
  const [isPlaying, setIsPlaying] = useState(false)
  const info = useAppSelector((s) => s.restaurant.info)
  const video = useAppSelector((s) => s.restaurant.video)

  return (
    <section className="bg-background py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className={`mb-10 text-center ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-4">
            <Film className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Tanıtım</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            {video.title}
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Mutfağımızdan masanıza uzanan lezzet yolculuğunu izleyin
          </p>
        </div>

        {/* Video Container */}
        <div className={`relative mx-auto max-w-4xl ${visible ? "animate-scale-in delay-200" : "opacity-0"}`}>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border shadow-2xl group">
            {isPlaying ? (
              <video
                src={video.videoSrc}
                width="100%"
                height="100%"
                autoPlay
                controls
                muted
                loop
                className="absolute inset-0"
                title={`${info.name} Tanıtım Videosu`}
              />
            ) : (
              <>
                {/* Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/50 flex flex-col items-center justify-center">
                  {/* Decorative circles */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
                    <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/10 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full" />
                  </div>

                  {/* Play button */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group/play relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-500 hover:scale-110 hover:bg-white/30 animate-pulse-glow"
                    aria-label="Videoyu oynat"
                  >
                    <Play className="h-8 w-8 text-white ml-1 transition-transform group-hover/play:scale-110" />
                  </button>

                  <p className="relative z-10 mt-6 text-lg font-bold text-white">
                    {info.name}
                  </p>
                  <p className="relative z-10 mt-1 text-sm text-white/70">
                    {video.subtitle}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

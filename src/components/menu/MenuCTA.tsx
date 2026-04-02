"use client"

import Link from "next/link";
import { ArrowRight, Utensils } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export function MenuCTA() {
  const cta = useAppSelector((s) => s.restaurant.cta);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Utensils className="w-12 h-12 text-primary mx-auto mb-6 animate-bounce-gentle" />
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
          {cta.menuCtaTitle}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          {cta.menuCtaSubtitle}
        </p>
        
        <Link 
          href="/menu"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-xl group"
        >
          Tam Menüyü Görüntüle
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

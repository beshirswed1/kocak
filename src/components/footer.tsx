"use client"

import { MapPin, Clock, LucideCheckCircle2, LucideMoveRight } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faFacebook,
  faTiktok,
  faYoutube,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector } from "@/store/hooks"

export function Footer() {
  const info = useAppSelector((s) => s.restaurant.info);

  return (
    <footer className="bg-foreground py-16 text-primary-foreground relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand & About */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/50 shadow-lg">
                <Image
                  src="/logo.jpeg"
                  alt={`${info.name} Logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold leading-tight tracking-wide">
                  {info.name}
                </span>
                <span className="text-xs text-primary/90 font-medium tracking-widest uppercase mt-1">
                  {info.slogan}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              {info.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-6">
              menümüze göz atın
            </h3>
            <Link href="/menu">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300">
                menümüze göz atın
              </button>
            </Link>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-6">
              İletişim Bilgileri
            </h3>
            <div className="flex flex-col gap-5">
              <a
                href={"https://maps.app.goo.gl/U76X5AWorEcchBkCA"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 text-sm text-primary-foreground/70 hover:text-primary transition-colors duration-300"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary-foreground/90 group-hover:text-primary transition-colors">Adres</span>
                </div>
                <span className="pl-6 leading-relaxed">{info.address}</span>
              </a>
              <div className="flex flex-col gap-1 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary-foreground/90">Çalışma Saatleri</span>
                </div>
                <span className="pl-6">{info.hours}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-6">
              Bizi Takip Edin
            </h3>
            <div className="flex flex-wrap gap-4">
              {info.socialMedia?.instagram && (
                <a href={info.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary hover:border-primary text-primary-foreground hover:text-foreground transition-all duration-300 hover:-translate-y-1" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
                </a>
              )}
              {info.socialMedia?.facebook && (
                <a href={info.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary hover:border-primary text-primary-foreground hover:text-foreground transition-all duration-300 hover:-translate-y-1" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
                </a>
              )}
              {info.socialMedia?.tiktok && (
                <a href={info.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary hover:border-primary text-primary-foreground hover:text-foreground transition-all duration-300 hover:-translate-y-1" aria-label="TikTok">
                  <FontAwesomeIcon icon={faTiktok} className="w-4 h-4" />
                </a>
              )}
              {info.socialMedia?.youtube && (
                <a href={info.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary hover:border-primary text-primary-foreground hover:text-foreground transition-all duration-300 hover:-translate-y-1" aria-label="YouTube">
                  <FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />
                </a>
              )}
              {info.socialMedia?.email && (
                <a href={`mailto:${info.socialMedia.email}`} className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary hover:border-primary text-primary-foreground hover:text-foreground transition-all duration-300 hover:-translate-y-1" aria-label="Email">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-primary-foreground/10 pt-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50 text-center sm:text-left">
              © {new Date().getFullYear()} {info.name}. Tüm hakları saklıdır.
            </p>
            <p className="text-sm text-primary-foreground/40 relative text-center flex items-center justify-center gap-1 group">
              <span>QR Menü Sistemi ile güçlendirilmiştir</span>
              {/* Hidden Admin Login Link */}
              <Link href="/admin/login" className="absolute inset-0 opacity-0 cursor-default" aria-label="Admin Login" />
            </p>
          </div>

          {/* Developer Credit */}
          <div className="flex items-center justify-center pt-5 sm:pt-6 mt-16 border-t border-primary/10 px-4">
            <p className="text-sm text-primary-foreground/70 text-center leading-relaxed flex items-center gap-2.5 flex-wrap justify-center">
              <span className="opacity-80">Bu proje tamamen profesyonel geliştirici</span>
              <a
                href="https://beshir.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-primary/15 text-primary font-bold px-4 py-1.5 rounded-full hover:bg-primary/25 transition-all duration-300 tracking-wide border border-primary/20 group hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
              >
                Beshir
                <LucideCheckCircle2 className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
                <LucideMoveRight className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <span className="opacity-80">tarafından  yapılmıştır.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
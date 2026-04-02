"use client"

import { useState, useEffect } from "react"
import { Phone, Menu, X, MapPin } from "lucide-react"
import Image from "next/image"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { toggleMobileMenu, closeMobileMenu } from "@/store/slices/uiSlice"
import { toggleCart } from "@/store/slices/cartSlice"
import { navLinks } from "@/constants/restaurant-data"

export function Navbar() {
  const dispatch = useAppDispatch()
  const info = useAppSelector((s) => s.restaurant.info)
  const map = useAppSelector((s) => s.restaurant.map)
  const mobileOpen = useAppSelector((s) => s.ui.mobileMenuOpen)
  const cartItems = useAppSelector((state) => state.cart.items)
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/5"
          : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-primary/30 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo.jpeg"
              alt={`${info.name} Logo`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold leading-tight transition-colors duration-300"
              style={{ color: scrolled ? "var(--foreground)" : "white" }}
            >
              {info.name}
            </span>
            <span className="text-xs leading-tight transition-colors duration-300"
              style={{ color: scrolled ? "var(--muted-foreground)" : "rgba(255,255,255,0.7)" }}
            >
              {info.slogan}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium transition-colors duration-300 hover:text-primary group"
              style={{ color: scrolled ? "var(--muted-foreground)" : "rgba(255,255,255,0.85)" }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA & Cart */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => dispatch(toggleCart())}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 ${scrolled ? "bg-secondary text-primary hover:bg-primary/20" : "bg-white/20 text-white hover:bg-white/30"
              }`}
            aria-label="Sepeti aç"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white shadow ring-2 ring-background">
                {totalCartItems}
              </span>
            )}
          </button>

          {map.googleMapsUrl && (
            <a
              href={map.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${scrolled
                  ? "border-border text-foreground hover:bg-secondary"
                  : "border-white/30 text-white hover:bg-white/10"
                }`}
            >
              <MapPin className="h-4 w-4" />
              Konum
            </a>
          )}
          <a
            href={`tel:${info.phone}`}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 animate-pulse-glow"
          >
            <Phone className="h-4 w-4" />
            Hemen Ara
          </a>
        </div>

        {/* Mobile Menu & Cart Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => dispatch(toggleCart())}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-200 active:scale-90"
            aria-label="Sepeti aç"
          >
            <div
              className="transition-colors duration-300"
              style={{ color: scrolled ? "var(--foreground)" : "white" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            </div>
            {totalCartItems > 0 && (
              <span className="absolute 1 top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white shadow ring-2 ring-background">
                {totalCartItems}
              </span>
            )}
          </button>

          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-200 active:scale-90"
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            <div
              className="transition-colors duration-300"
              style={{ color: scrolled ? "var(--foreground)" : "white" }}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`border-t border-border bg-background px-4 pb-4 md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-none"
          }`}
      >
        <div className="flex flex-col gap-1 pt-2">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => dispatch(closeMobileMenu())}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <a
            href={`tel:${info.phone}`}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground animate-fade-in-up delay-300"
          >
            <Phone className="h-4 w-4" />
            Hemen Ara - {info.phone}
          </a>
        </div>
      </div>
    </header>
  )
}

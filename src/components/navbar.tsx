"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, Home, BookOpen, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { toggleMobileMenu, closeMobileMenu } from "@/store/slices/uiSlice"
import { toggleCart } from "@/store/slices/cartSlice"
import { navLinks } from "@/constants/restaurant-data"

export function Navbar() {
  const dispatch = useAppDispatch()
  const info = useAppSelector((s) => s.restaurant.info)
  const mobileOpen = useAppSelector((s) => s.ui.mobileMenuOpen)
  const cartItems = useAppSelector((state) => state.cart.items)
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b border-transparent ${scrolled
            ? "bg-background/95 backdrop-blur-xl border-border shadow-md py-2"
            : "bg-transparent py-4"
          }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8 relative z-50">
          {/* Logo Area */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            onClick={() => dispatch(closeMobileMenu())}
          >
            <div className={`relative overflow-hidden rounded-full border-2 border-primary/40 shadow-lg transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(var(--primary),0.5)] ${scrolled ? "h-12 w-12" : "h-14 w-14"}`}>
              <Image
                src="/logo.jpeg"
                alt={`${info.name} Logo`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className="font-serif text-xl font-bold leading-tight tracking-wide transition-colors duration-300"
                style={{ color: scrolled ? "var(--foreground)" : "white" }}
              >
                {info.name}
              </span>
              <span
                className="text-[11px] font-medium leading-tight opacity-90 transition-colors duration-300 tracking-wider uppercase mt-0.5"
                style={{ color: scrolled ? "var(--muted-foreground)" : "rgba(255,255,255,0.8)" }}
              >
                {info.slogan}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-2 md:flex bg-background/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-inner">
            {navLinks.map((link) => {
              const isMenu = link.label.toLowerCase() === "menü";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-5 py-2 text-sm font-bold tracking-wide rounded-full transition-all duration-300 hover:bg-primary/20 group"
                  style={{ color: scrolled ? "var(--foreground)" : "white" }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isMenu ? <BookOpen className="h-4 w-4" /> : <Home className="h-4 w-4" />}
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side CTA */}
          <div className="hidden items-center gap-4 md:flex">
            {info.isOrderingEnabled !== false && (
              <button
                onClick={() => dispatch(toggleCart())}
                className={`group relative flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${scrolled
                    ? "bg-primary text-primary-foreground hover:bg-primary/95 hover:shadow-primary/30"
                    : "bg-white text-black hover:bg-white/95 hover:shadow-white/20"
                  }`}
                aria-label="Sepeti aç"
              >
                <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                <span>Sepetim</span>
                {totalCartItems > 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-black shadow-md ring-2 transition-transform duration-300 group-hover:scale-110 ${scrolled ? "bg-destructive text-destructive-foreground ring-background" : "bg-destructive text-white ring-white"}`}>
                    {totalCartItems}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Mobile Right Side (Cart & Menu toggle) */}
          <div className="flex items-center gap-3 md:hidden">
            {info.isOrderingEnabled !== false && (
              <button
                onClick={() => dispatch(toggleCart())}
                className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 active:scale-95 ${scrolled ? "bg-primary/10 hover:bg-primary/20" : "bg-white/20 backdrop-blur-md"}`}
                aria-label="Sepeti aç"
              >
                <ShoppingCart className={`h-6 w-6 transition-colors duration-300 ${scrolled ? "text-primary" : "text-white"}`} />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-[11px] font-black text-white shadow-md ring-2 ring-background animate-pulse-glow">
                    {totalCartItems}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 active:scale-95 ${mobileOpen ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : scrolled ? "bg-secondary hover:bg-secondary/80 text-foreground" : "bg-white/20 backdrop-blur-md text-white"}`}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              <div className={`transition-transform duration-300 ${mobileOpen ? "rotate-90 scale-110" : ""}`}>
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay Dropdown */}
        <div
          className={`absolute top-full left-0 right-0 border-b border-border bg-background shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden rounded-b-3xl ${mobileOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 border-transparent"
            }`}
        >
          <div className="flex flex-col gap-3 p-5 max-w-md mx-auto">
            {navLinks.map((link, i) => {
              const isMenu = link.label.toLowerCase() === "menü";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => dispatch(closeMobileMenu())}
                  className="group flex items-center justify-between rounded-2xl bg-secondary/40 p-5 text-lg font-bold text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md animate-fade-in-up active:scale-[0.98]"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/60 shadow-sm group-hover:bg-black/10 transition-colors">
                      {isMenu ? <BookOpen className="h-6 w-6" /> : <Home className="h-6 w-6" />}
                    </span>
                    {link.label}
                  </span>
                  <ChevronRight className="h-6 w-6 opacity-40 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              );
            })}

            {info.isOrderingEnabled !== false && (
              <button
                onClick={() => {
                  dispatch(closeMobileMenu());
                  setTimeout(() => dispatch(toggleCart()), 300);
                }}
                className="mt-2 group flex w-full items-center justify-between rounded-2xl bg-primary p-5 text-lg font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 animate-fade-in-up active:scale-[0.98]"
                style={{ animationDelay: `${navLinks.length * 100}ms` }}
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/15 shadow-inner">
                    <ShoppingCart className="h-6 w-6" />
                  </span>
                  Sepetim {totalCartItems > 0 && <span className="ml-1 bg-white text-primary px-2 py-0.5 rounded-full text-sm">{totalCartItems}</span>}
                </span>
                <ChevronRight className="h-6 w-6 opacity-70 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Backdrop for Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 md:hidden animate-fade-in"
          onClick={() => dispatch(closeMobileMenu())}
        />
      )}
    </>
  )
}

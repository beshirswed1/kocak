// ==========================================
// QR MENU TEMPLATE SYSTEM - Type Definitions
// ==========================================

export type OrderStatus = "pending" | "completed" | "cancelled";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  tableNumber: string;
  note: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: number; // timestamp
}

export interface MenuItem {
  id: string
  name: string
  price: number
  halfPortionPrice?: number
  description: string
  category: string
  image?: string
  isPopular?: boolean
  isNew?: boolean
  isAvailable?: boolean
}

export interface MenuCategory {
  id: string
  label: string
  icon?: string
  items: MenuItem[]
}

export interface Review {
  id: string
  name: string
  rating: number
  text: string
  date: string
  reviewCount: string
  avatar?: string
}

export interface Offer {
  id: string
  title: string
  description: string
  discount: string
  validUntil?: string
  image?: string
}

export interface RestaurantInfo {
  name: string
  slogan: string
  description: string
  phone: string
  whatsapp: string
  address: string
  city: string
  rating: number
  reviewCount: number
  avgPrice: string
  hours: string
  googleMapsUrl: string
  googleMapsEmbed: string
  services: string[]
  socialMedia: {
    instagram?: string
    facebook?: string
    twitter?: string
    tiktok?: string
    youtube?: string
    email?: string
  }
  isOrderingEnabled?: boolean
}

// ─── Template-specific config types ──────────────

export interface HeroContent {
  badge: string
  headline: string
  subheadline: string
}

export interface AboutContent {
  sectionTitle: string
  title: string
  description: string
  badge: string
  features: string[]
}

export interface VideoConfig {
  videoSrc: string
  title: string
  subtitle: string
}

export interface CtaContent {
  menuSectionTitle: string
  menuSectionSubtitle: string
  ctaBannerTitle: string
  ctaBannerSubtitle: string
  menuCtaTitle: string
  menuCtaSubtitle: string
}

export interface SeoConfig {
  websiteUrl: string
  titleDefault: string
  titleTemplate: string
  description: string
  keywords: string[]
  ogImage: string
  locale: string
  jsonLd: Record<string, any>
}

export interface MapConfig {
  address: string
  googleMapsUrl: string
  googleMapsEmbed: string
  services: string[]
}

export interface SiteConfig {
  info: RestaurantInfo
  hero: HeroContent
  about: AboutContent
  video: VideoConfig
  cta: CtaContent
  seo: SeoConfig
  map: MapConfig
}

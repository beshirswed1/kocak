import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TrustSignals } from "@/components/trust-signals"
import { PopularItems } from "@/components/popular-items"
import { MenuCTA } from "@/components/menu/MenuCTA"
import { NewItems } from "@/components/new-items"
import { OffersSection } from "@/components/offers-section"
import { AboutSection } from "@/components/about-section"
import { ReviewsSection } from "@/components/reviews-section"
import { VideoSection } from "@/components/video-section"
import { CTABanner } from "@/components/cta-banner"
import { MapSection } from "@/components/map-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustSignals />
        <PopularItems />
        <MenuCTA />
        <NewItems />
        {/* <OffersSection /> */}
        <AboutSection />
        <ReviewsSection />
        <VideoSection />
        <CTABanner />
        <MapSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}

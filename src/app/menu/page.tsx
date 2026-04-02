import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
import { MenuSection } from "@/components/menu/MenuSection";
import type { Metadata } from 'next';
import { defaultInfo, defaultSeo } from "@/constants/restaurant-data";

export const metadata: Metadata = {
  title: `Tüm Menü | ${defaultInfo.name}`,
  description: `${defaultInfo.name} tam menüsü. ${defaultSeo.description}`,
};

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <MenuSection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

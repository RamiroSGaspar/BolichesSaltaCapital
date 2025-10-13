import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductCards } from "@/components/product-cards"
import { EventosSection } from "@/components/eventos-section"
import { ComparadorPrecios } from "@/components/comparador-precios"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        <AdBanner size="leaderboard" />
      </div>

      <ProductCards />

      <div className="container mx-auto px-4 py-8">
        <AdBanner size="medium" />
      </div>

      <EventosSection />

      <div className="container mx-auto px-4 py-8">
        <AdBanner size="medium" />
      </div>

      <ComparadorPrecios />

      <div className="container mx-auto px-4 py-8">
        <AdBanner size="large" />
      </div>

      <Footer />
    </main>
  )
}

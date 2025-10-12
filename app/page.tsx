import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductCards } from "@/components/product-cards"
import { EventosSection } from "@/components/eventos-section"
import { ComparadorPrecios } from "@/components/comparador-precios"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProductCards />
      <EventosSection />
      <ComparadorPrecios />
      <Footer />
    </main>
  )
}

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductCards } from "@/components/product-cards"
import { EventosSection } from "@/components/eventos-section"
import { ComparadorPrecios } from "@/components/comparador-precios"
import { MapaBoliches } from "@/components/mapa-boliches"
import { Footer } from "@/components/footer"
// import { AdBanner } from "@/components/ad-banner"

export const metadata = {
  title: "Tragos Salta | Precios de Boliches y Fernet en Salta Capital",
  description: "¿Dónde tomar barato en Salta? Compará precios de fernet, cerveza y tragos en los boliches de Balcarce. Info actualizada de jodas, eventos y ofertas en Salta Capital.",
  keywords: "boliches salta, precios fernet salta, donde tomar barato salta, joda salta, noche salteña, balcarce salta, boliches baratos salta capital, cerveza barata salta, tragos salta, salir de joda salta, previa salta",
  openGraph: {
    title: "Tragos Salta - Precios de Boliches y Jodas en Salta Capital",
    description: "Compará precios de fernet, cerveza y tragos en los boliches de Salta",
    type: "website",
  }
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />

      {/* <div className="container mx-auto px-4 py-8">
        <AdBanner size="leaderboard" />
      </div> */}

      <ProductCards />

      {/* <div className="container mx-auto px-4 py-8">
        <AdBanner size="medium" />
      </div> */}

      <EventosSection />

      {/* <div className="container mx-auto px-4 py-8">
        <AdBanner size="medium" />
      </div> */}

      <ComparadorPrecios />

      <MapaBoliches />

      {/* <div className="container mx-auto px-4 py-8">
        <AdBanner size="large" />
      </div> */}

      <Footer />
    </main>
  )
}
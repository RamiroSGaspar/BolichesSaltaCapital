import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BolichePage } from "@/components/boliche-page"
import { getBolicheById } from "@/lib/api/boliches"
import { getPreciosByBoliche } from "@/lib/api/precios"
import { getAllBoliches } from "@/lib/api/boliches"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const boliche = await getBolicheById(resolvedParams.id)

  if (!boliche) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Boliche no encontrado</p>
      </div>
    )
  }

  const precios = await getPreciosByBoliche(boliche.id)
  const tragosConPrecio = precios.map(p => ({
    ...p.tragos,
    price: p.precio
  }))
  
  const otherBoliches = (await getAllBoliches()).filter((b) => b.id !== boliche.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <BolichePage boliche={boliche} tragos={tragosConPrecio} otherBoliches={otherBoliches} />
      <Footer />
    </main>
  )
}
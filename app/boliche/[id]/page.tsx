import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { boliches, tragos } from "@/lib/data"
import { BolichePage } from "@/components/boliche-page"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const boliche = boliches.find((b) => b.id === resolvedParams.id)

  if (!boliche) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Boliche no encontrado</p>
      </div>
    )
  }

  const otherBoliches = boliches.filter((b) => b.id !== boliche.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <BolichePage boliche={boliche} tragos={tragos} otherBoliches={otherBoliches} />
      <Footer />
    </main>
  )
}

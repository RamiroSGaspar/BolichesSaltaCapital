"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EventoCard } from "@/components/evento-card"
import { AdBanner } from "@/components/ad-banner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Filter } from "lucide-react"
import { getAllEventos } from "@/lib/api/eventos"
import type { Evento } from "@/lib/data"

export const metadata = {
  title: "Eventos y Jodas en Salta | Fiestas Boliches Salta Capital",
  description: "Todas las jodas y eventos de la semana en Salta. Fiestas electrónicas, rock, reggaeton en Balcarce y los mejores boliches de Salta Capital. Info de precios de entrada y promos.",
  keywords: "jodas salta, fiestas salta, eventos boliches salta, balcarce salta, que hacer salta, salir bailar salta, fiestas electronicas salta",
}

export default function EventosPublicPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filtro, setFiltro] = useState<"todos" | "proximos" | "destacados">("todos")

  useEffect(() => {
    getAllEventos()
      .then(data => setEventos(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const eventosFiltrados = eventos.filter(evento => {
    const matchSearch = 
      evento.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evento.boliche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evento.tematica?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    
    if (filtro === "proximos") {
      return matchSearch && evento.fecha >= hoy
    }
    if (filtro === "destacados") {
      return matchSearch && evento.destacado
    }
    return matchSearch
  })

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-xl text-muted-foreground">Cargando eventos...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Eventos en <span className="text-primary">Salta</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Descubre las mejores fiestas y eventos de la ciudad
            </p>
          </div>
        </div>
      </section>

      {/* Filtros y Búsqueda */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Barra de búsqueda */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar eventos por nombre, boliche o temática..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Button
                variant={filtro === "todos" ? "default" : "outline"}
                onClick={() => setFiltro("todos")}
              >
                Todos
              </Button>
              <Button
                variant={filtro === "proximos" ? "default" : "outline"}
                onClick={() => setFiltro("proximos")}
              >
                Próximos
              </Button>
              <Button
                variant={filtro === "destacados" ? "default" : "outline"}
                onClick={() => setFiltro("destacados")}
              >
                Destacados
              </Button>
              <Badge variant="secondary" className="ml-auto">
                {eventosFiltrados.length} eventos
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Eventos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {eventosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventosFiltrados.map((evento) => (
                <EventoCard key={evento.id} evento={evento} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-2xl font-bold mb-2">No se encontraron eventos</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Intenta con otra búsqueda"
                  : "No hay eventos disponibles en este momento"}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EventoCard } from "@/components/evento-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar } from "lucide-react"
import { eventos, boliches } from "@/lib/data"

export default function EventosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [bolicheFilter, setBolicheFilter] = useState("todos")
  const [soloDestacados, setSoloDestacados] = useState(false)

  const eventosFiltrados = eventos
    .filter((e) => {
      // Filtro de búsqueda
      if (searchQuery && !e.nombre.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      // Filtro de boliche
      if (bolicheFilter !== "todos" && e.bolicheId !== bolicheFilter) {
        return false
      }
      // Filtro de destacados
      if (soloDestacados && !e.destacado) {
        return false
      }
      return true
    })
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-balance">
            Eventos y <span className="text-primary">Fiestas</span> en Salta
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Descubrí las mejores noches de la ciudad
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-card border border-border rounded-lg p-6 mb-12 sticky top-20 z-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar evento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtro de boliche */}
            <Select value={bolicheFilter} onValueChange={setBolicheFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los boliches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los boliches</SelectItem>
                {boliches.map((boliche) => (
                  <SelectItem key={boliche.id} value={boliche.id}>
                    {boliche.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Toggle destacados */}
            <Button
              variant={soloDestacados ? "default" : "outline"}
              onClick={() => setSoloDestacados(!soloDestacados)}
              className="w-full"
            >
              Solo destacados
            </Button>
          </div>
        </div>

        {/* Grid de eventos */}
        {eventosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosFiltrados.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Calendar className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold mb-2">No hay eventos que coincidan</h3>
            <p className="text-muted-foreground mb-6">Intenta cambiar los filtros de búsqueda</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setBolicheFilter("todos")
                setSoloDestacados(false)
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}

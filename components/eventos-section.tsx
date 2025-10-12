"use client"

import { EventoCard } from "./evento-card"
import { eventos } from "@/lib/data"
import { Calendar } from "lucide-react"

export function EventosSection() {
  // Mostrar solo los próximos 4 eventos destacados o más recientes
  const eventosDestacados = eventos
    .filter((e) => e.fecha >= new Date())
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
    .slice(0, 4)

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Eventos y <span className="text-primary">Fiestas Próximas</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            No te pierdas las mejores noches de Salta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventosDestacados.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </div>
      </div>
    </section>
  )
}

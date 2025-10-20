"use client"

import { useState, useEffect } from "react"
import { EventoCard } from "./evento-card"
import { getAllEventos } from "@/lib/api/eventos"
import type { Evento } from "@/lib/data"
import { Calendar } from "lucide-react"

export function EventosSection() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllEventos()
      .then(data => {
        const proximos = data
          .filter(e => e.fecha >= new Date())
          .slice(0, 4)
        setEventos(proximos)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="py-24 text-center">Cargando eventos...</div>

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
          {eventos.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </div>
      </div>
    </section>
  )
}
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Music, Star, DollarSign } from "lucide-react"
import type { Evento } from "@/lib/data"
import { useRouter } from "next/navigation"

interface EventoCardProps {
  evento: Evento
}

export function EventoCard({ evento }: EventoCardProps) {
  const router = useRouter()

  const formatFecha = (fecha: Date) => {
    return new Intl.DateTimeFormat("es-AR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    })
      .format(fecha)
      .toUpperCase()
  }

  return (
    <Card
      onClick={() => router.push(`/evento/${evento.id}`)}
      className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden cursor-pointer"
    >
      <div className="relative h-80 bg-secondary overflow-hidden">
        <img
          src={evento.poster || "/placeholder.svg"}
          alt={evento.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Badge fecha */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1">
            {formatFecha(evento.fecha)}
          </Badge>
        </div>

        {/* Badge destacado */}
        {evento.destacado && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Destacado
            </Badge>
          </div>
        )}

        {/* Info sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-2xl font-bold mb-2 text-balance">{evento.nombre}</h3>
          <p className="text-sm opacity-90 mb-3">{evento.boliche}</p>

          <div className="flex flex-wrap gap-3 text-sm mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{evento.hora}</span>
            </div>
            <div className="flex items-center gap-1">
              <Music className="h-4 w-4" />
              <span>{evento.djs.slice(0, 2).join(", ")}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white">
              {evento.tematica}
            </Badge>
            <div className="flex items-center gap-1 text-lg font-bold">
              <DollarSign className="h-5 w-5" />
              <span>${evento.precio.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  )
}

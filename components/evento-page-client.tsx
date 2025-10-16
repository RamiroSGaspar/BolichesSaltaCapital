"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EventoCard } from "@/components/evento-card"
import { AdBanner } from "@/components/ad-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  DollarSign,
  Share2,
  MessageCircle,
  CalendarPlus,
  Star,
  Phone,
  Instagram,
} from "lucide-react"
import { getEventoById, getBolicheById, getEventosByBoliche } from "@/lib/data"
import { useRouter } from "next/navigation"

interface EventoPageClientProps {
  eventoId: string
}

export function EventoPageClient({ eventoId }: EventoPageClientProps) {
  const router = useRouter()
  const evento = getEventoById(eventoId)

  if (!evento) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Evento no encontrado</h1>
          <Button onClick={() => router.push("/eventos")}>Ver todos los eventos</Button>
        </div>
        <Footer />
      </main>
    )
  }

  const boliche = getBolicheById(evento.bolicheId)
  const otrosEventos = getEventosByBoliche(evento.bolicheId)
    .filter((e) => e.id !== evento.id)
    .slice(0, 3)

  const formatFechaCompleta = (fecha: Date) => {
    return new Intl.DateTimeFormat("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(fecha)
  }

  const handleCompartir = () => {
    if (navigator.share) {
      navigator.share({
        title: evento.nombre,
        text: `${evento.nombre} en ${evento.boliche}`,
        url: window.location.href,
      })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero con poster */}
      <div className="relative h-[500px] bg-secondary overflow-hidden">
        <img src={evento.poster || "/placeholder.svg"} alt={evento.nombre} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="text-lg px-4 py-2">{formatFechaCompleta(evento.fecha).split(",")[0].toUpperCase()}</Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {evento.boliche}
            </Badge>
            {evento.destacado && (
              <Badge className="bg-yellow-500 text-black text-lg px-4 py-2">
                <Star className="h-4 w-4 mr-1 fill-current" />
                Destacado
              </Badge>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">{evento.nombre}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Ad banner after hero */}
        <div className="mb-8">
          <AdBanner size="leaderboard" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detalles del evento */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Fecha</p>
                    <p className="text-muted-foreground capitalize">{formatFechaCompleta(evento.fecha)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Horario</p>
                    <p className="text-muted-foreground">{evento.hora} - 06:00</p>
                    <p className="text-sm text-muted-foreground">Duración: 7 horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Lugar</p>
                    <p className="text-muted-foreground">
                      {boliche?.name} - {boliche?.direccionCompleta}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Music className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">DJs / Artistas</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {evento.djs.map((dj, idx) => (
                        <Badge key={idx} variant="secondary">
                          {dj}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Precio de entrada</p>
                    <p className="text-3xl font-bold text-primary">${evento.precio.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="font-semibold mb-2">Temática</p>
                  <Badge className="text-base px-4 py-2">{evento.tematica}</Badge>
                </div>

                <div className="pt-4 border-t">
                  <p className="font-semibold mb-2">Descripción</p>
                  <p className="text-muted-foreground leading-relaxed">{evento.descripcion}</p>
                </div>
              </CardContent>
            </Card>

            {/* Precios especiales */}
            {evento.preciosEspeciales && evento.preciosEspeciales.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Precios Especiales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {evento.preciosEspeciales.map((precio, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="font-medium">{precio.trago}</span>
                        <span className="text-xl font-bold text-primary">${precio.precio.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Promos */}
            {evento.promos && evento.promos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Promociones</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {evento.promos.map((promo, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{promo}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Ad banner in content area */}
            <AdBanner size="medium" />
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* Info del boliche */}
            {boliche && (
              <Card>
                <CardHeader>
                  <CardTitle>Información del Boliche</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <img
                      src={boliche.image || "/placeholder.svg"}
                      alt={boliche.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">{boliche.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{boliche.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{boliche.direccionCompleta}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>{boliche.telefono}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-primary" />
                        <a
                          href={`https://instagram.com/${boliche.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {boliche.instagram}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => router.push(`/boliche/${boliche.id}`)}
                    >
                      Ver boliche
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(boliche.direccionCompleta)}`,
                          "_blank",
                        )
                      }
                    >
                      Cómo llegar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTAs */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${boliche?.telefono.replace(/\D/g, "")}?text=Hola! Quiero reservar para ${evento.nombre}`,
                      "_blank",
                    )
                  }
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Reservar por WhatsApp
                </Button>

                <Button size="lg" variant="secondary" className="w-full">
                  <CalendarPlus className="h-5 w-5 mr-2" />
                  Agregar a calendario
                </Button>

                <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={handleCompartir}>
                  <Share2 className="h-5 w-5 mr-2" />
                  Compartir evento
                </Button>
              </CardContent>
            </Card>

            {/* Ad banner in sidebar */}
            <AdBanner size="medium" />
          </div>
        </div>

        {/* Otros eventos del boliche */}
        {otrosEventos.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Otros eventos en {boliche?.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otrosEventos.map((evento) => (
                <EventoCard key={evento.id} evento={evento} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}

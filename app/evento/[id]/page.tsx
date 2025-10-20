"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EventoCard } from "@/components/evento-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Music, DollarSign, Share2, MessageCircle, CalendarPlus, Star, Phone, Instagram } from "lucide-react"
import { getEventoById, getEventosByBoliche } from "@/lib/api/eventos"
import { getBolicheById } from "@/lib/api/boliches"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const evento = await getEventoById(params.id)
  
  if (!evento) {
    return {
      title: "Evento no encontrado - Tragos Salta"
    }
  }

  const fecha = new Date(evento.fecha).toLocaleDateString('es-AR')

  return {
    title: `${evento.nombre} en ${evento.boliche} | Eventos Salta`,
    description: `${evento.tematica} - ${fecha} - ${evento.hora}. ${evento.descripcion} Entrada: $${evento.precio}`,
    keywords: `${evento.nombre}, ${evento.boliche}, eventos salta, ${evento.tematica}, joda salta`,
  }
}

export default function EventoPage({ params }: { params: Promise<{ id: string }> }) {
  const [evento, setEvento] = useState<any>(null)
  const [boliche, setBoliche] = useState<any>(null)
  const [otrosEventos, setOtrosEventos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    async function fetchData() {
      const resolvedParams = await params
      const eventoData = await getEventoById(resolvedParams.id)
      if (!eventoData) {
        setLoading(false)
        return
      }
      const bolicheData = await getBolicheById(eventoData.bolicheId)
      const otrosData = (await getEventosByBoliche(eventoData.bolicheId)).filter((e: any) => e.id !== eventoData.id).slice(0, 3)
      setEvento(eventoData)
      setBoliche(bolicheData)
      setOtrosEventos(otrosData)
      setLoading(false)
    }
    fetchData()
  }, [params])

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-xl text-muted-foreground">Cargando...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!evento) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Evento no encontrado</h1>
        </div>
        <Footer />
      </main>
    )
  }

  const formatFecha = (fecha: Date) => {
    return new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(fecha)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="relative h-[500px] bg-secondary overflow-hidden">
        <img src={evento.poster || "/placeholder.svg"} alt={evento.nombre} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="text-lg px-4 py-2">{formatFecha(evento.fecha).split(",")[0].toUpperCase()}</Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">{evento.boliche}</Badge>
            {evento.destacado && <Badge className="bg-yellow-500 text-black text-lg px-4 py-2"><Star className="h-4 w-4 mr-1 fill-current" />Destacado</Badge>}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{evento.nombre}</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Detalles del Evento</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3"><Calendar className="h-5 w-5 text-primary mt-1" /><div><p className="font-semibold">Fecha</p><p className="text-muted-foreground capitalize">{formatFecha(evento.fecha)}</p></div></div>
                <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-primary mt-1" /><div><p className="font-semibold">Horario</p><p className="text-muted-foreground">{evento.hora} - 06:00</p></div></div>
                <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary mt-1" /><div><p className="font-semibold">Lugar</p><p className="text-muted-foreground">{boliche?.name} - {boliche?.direccionCompleta}</p></div></div>
                {evento.djs && evento.djs.length > 0 && <div className="flex items-start gap-3"><Music className="h-5 w-5 text-primary mt-1" /><div><p className="font-semibold">DJs / Artistas</p><div className="flex flex-wrap gap-2 mt-2">{evento.djs.map((dj: string, idx: number) => <Badge key={idx} variant="secondary">{dj}</Badge>)}</div></div></div>}
                <div className="flex items-start gap-3"><DollarSign className="h-5 w-5 text-primary mt-1" /><div><p className="font-semibold">Precio</p><p className="text-3xl font-bold text-primary">${evento.precio?.toLocaleString() || 0}</p></div></div>
                {evento.tematica && <div className="pt-4 border-t"><p className="font-semibold mb-2">Temática</p><Badge className="text-base px-4 py-2">{evento.tematica}</Badge></div>}
                {evento.descripcion && <div className="pt-4 border-t"><p className="font-semibold mb-2">Descripción</p><p className="text-muted-foreground">{evento.descripcion}</p></div>}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            {boliche && <Card><CardHeader><CardTitle>Boliche</CardTitle></CardHeader><CardContent className="space-y-4"><div className="relative h-32 rounded-lg overflow-hidden"><img src={boliche.image || "/placeholder.svg"} alt={boliche.name} className="w-full h-full object-cover" /></div><div><h3 className="font-bold text-lg mb-2">{boliche.name}</h3><p className="text-sm text-muted-foreground mb-3">{boliche.description}</p></div></CardContent></Card>}
            <Card><CardContent className="p-4 space-y-3">{boliche?.telefono && <Button size="lg" className="w-full" onClick={() => window.open(`https://wa.me/${boliche.telefono.replace(/\D/g, "")}?text=Hola! Quiero reservar para ${evento.nombre}`, "_blank")}><MessageCircle className="h-5 w-5 mr-2" />Reservar por WhatsApp</Button>}<Button size="lg" variant="outline" className="w-full" onClick={() => { if (navigator.share) navigator.share({ title: evento.nombre, url: window.location.href }) }}><Share2 className="h-5 w-5 mr-2" />Compartir</Button></CardContent></Card>
          </div>
        </div>
        {otrosEventos.length > 0 && <div className="mt-16"><h2 className="text-3xl font-bold mb-8">Otros eventos en {boliche?.name}</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{otrosEventos.map((e: any) => <EventoCard key={e.id} evento={e} />)}</div></div>}
      </div>
      <Footer />
    </main>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { getAllBoliches } from "@/lib/api/boliches"
import type { Boliche } from "@/lib/data"

declare global {
  interface Window {
    google: any
  }
}

export function MapaBoliches() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [boliches, setBoliches] = useState<Boliche[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllBoliches()
      .then(setBoliches)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!mapRef.current || loading || boliches.length === 0) return

    const initMap = () => {
      const salta = { lat: -24.7859, lng: -65.4117 }
      
      const map = new window.google.maps.Map(mapRef.current!, {
        zoom: 12,
        center: salta,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      })

      boliches.forEach((boliche) => {
        if (boliche.latitude && boliche.longitude) {
          const marker = new window.google.maps.Marker({
            position: { lat: boliche.latitude, lng: boliche.longitude },
            map,
            title: boliche.name,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }
          })

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">${boliche.name}</h3>
                <p style="margin: 0; color: #666;">${boliche.location}</p>
                <a href="/boliche/${boliche.id}" style="color: #8b5cf6; text-decoration: none; margin-top: 4px; display: inline-block;">Ver más →</a>
              </div>
            `
          })

          marker.addListener("click", () => {
            infoWindow.open(map, marker)
          })
        }
      })
    }

    if (typeof window.google !== "undefined") {
      initMap()
    } else {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    }
  }, [boliches, loading])

  if (loading) {
    return (
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center">Cargando mapa...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3">
            <MapPin className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Encontrá los <span className="text-primary">Boliches</span> en el Mapa
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Todos los boliches de Salta en un solo lugar
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div ref={mapRef} className="w-full h-[500px]" />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, ExternalLink } from "lucide-react"

interface MapaBolicheIndividualProps {
  boliche: {
    name: string
    location: string
    latitude?: number
    longitude?: number
  }
}

export function MapaBolicheIndividual({ boliche }: MapaBolicheIndividualProps) {
  if (!boliche.latitude || !boliche.longitude) {
    return null
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${boliche.latitude},${boliche.longitude}`
  
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${boliche.latitude},${boliche.longitude}&zoom=15&size=600x300&markers=color:red%7C${boliche.latitude},${boliche.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">
              ¿Cómo <span className="text-primary">llegar</span>?
            </h2>
          </div>

          <Card 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
            onClick={() => window.open(googleMapsUrl, '_blank')}
          >
            <CardContent className="p-0 relative">
              <img 
                src={staticMapUrl} 
                alt={`Mapa de ${boliche.name}`}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="bg-white/90 px-6 py-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  <span className="font-semibold">Abrir en Google Maps</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-semibold">{boliche.location}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
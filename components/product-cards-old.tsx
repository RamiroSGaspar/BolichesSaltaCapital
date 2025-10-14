"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, MapPin, Music } from "lucide-react"
import { getAllBoliches } from "@/lib/api/boliches"
import type { Boliche } from "@/lib/data"
import { useRouter } from "next/navigation"

export function ProductCards() {
  const router = useRouter()
  const [boliches, setBoliches] = useState<Boliche[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllBoliches()
      .then(data => setBoliches(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="py-24 text-center">Cargando...</div>

  return (
    <section id="boliches" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Los mejores <span className="text-primary">boliches</span> de Salta
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Conocé las noches temáticas y DJs de cada lugar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boliches.map((boliche) => (
            <Card
              key={boliche.id}
              onClick={() => router.push(`/boliche/${boliche.id}`)}
              className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 bg-card border-border overflow-hidden cursor-pointer"
            >
              <div className="relative h-48 bg-secondary overflow-hidden">
                <img
                  src={boliche.image || "/placeholder.svg"}
                  alt={boliche.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {boliche.name}
                  </h3>
                  
                    href={`https://instagram.com/${boliche.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Music className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">{boliche.nightTheme}</span>
                </div>

                <div className="text-sm text-muted-foreground">
                  <span className="text-accent">DJ:</span> {boliche.dj}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{boliche.location}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Ver precios y horarios
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
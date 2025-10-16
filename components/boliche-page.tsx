"use client"

import { useState } from "react"
import { Instagram, MapPin, Music, Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AdBanner } from "@/components/ad-banner"
import { useRouter } from "next/navigation"

const categories = ["Todos", "Clásicos", "Premium", "Shots", "Cervezas", "Sin Alcohol"]

interface Boliche {
  id: string
  name: string
  description: string
  nightTheme: string
  location: string
  instagram: string
  dj: string
  image?: string
}

interface Trago {
  id: string
  name: string
  description: string
  price: number
  category: string
  alcoholic: boolean
}

interface BolichPageProps {
  boliche: Boliche
  tragos: Trago[]
  otherBoliches: Boliche[]
}

export function BolichePage({ boliche, tragos, otherBoliches }: BolichPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const router = useRouter()

  const filteredTragos = selectedCategory === "Todos" ? tragos : tragos.filter((t) => t.category === selectedCategory)

  return (
    <>
      {/* Hero / Encabezado */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={boliche.image || "/placeholder.svg"}
            alt={boliche.name}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-balance">{boliche.name}</h1>

            <p className="text-xl md:text-2xl text-muted-foreground text-balance">{boliche.description}</p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-foreground">
                <Music className="h-5 w-5 text-accent" />
                <span className="font-medium">{boliche.nightTheme}</span>
              </div>

              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{boliche.location}</span>
              </div>

              <a
                href={`https://instagram.com/${boliche.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>{boliche.instagram}</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>Abierto: Vie-Sáb 23:00 - 06:00</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5" />
                <span>+54 387 123-4567</span>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-accent">
                DJ de la noche: <span className="font-semibold">{boliche.dj}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <AdBanner size="leaderboard" />
      </div>

      {/* Barra de categorías sticky */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-y border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Listado de tragos por categoría */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Carta de <span className="text-primary">Tragos</span>
            </h2>

            <div className="space-y-4">
              {filteredTragos.map((trago) => (
                <Card key={trago.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground">{trago.name}</h3>
                          {!trago.alcoholic && (
                            <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full font-medium">
                              Sin Alcohol
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{trago.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{trago.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${trago.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <AdBanner size="medium" />
            </div>
          </div>
        </div>
      </section>

      {/* Otros boliches recomendados */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Otros <span className="text-primary">boliches</span> que te pueden gustar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {otherBoliches.map((otherBoliche) => (
              <Card
                key={otherBoliche.id}
                onClick={() => router.push(`/boliche/${otherBoliche.id}`)}
                className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 bg-card border-border overflow-hidden cursor-pointer"
              >
                <div className="relative h-48 bg-secondary overflow-hidden">
                  <img
                    src={otherBoliche.image || "/placeholder.svg"}
                    alt={otherBoliche.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>

                <CardHeader className="pb-3">
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {otherBoliche.name}
                  </h3>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Music className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">{otherBoliche.nightTheme}</span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <span className="text-accent">DJ:</span> {otherBoliche.dj}
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Ver carta
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

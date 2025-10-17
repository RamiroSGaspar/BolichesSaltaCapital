"use client"

import { useState } from "react"
import { Instagram, MapPin, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface Boliche {
  id: string
  name: string
  description: string
  location: string
  instagram: string
  barrio?: string
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
  const categories = ["Todos", "Tragos", "Cervezas", "Shots", "Vinos", "Cocktails", "Sin Alcohol"]
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const router = useRouter()

  const filteredTragos = selectedCategory === "Todos" 
    ? tragos 
    : selectedCategory === "Sin Alcohol"
      ? tragos.filter((t) => !t.alcoholic)
      : tragos.filter((t) => t.category === selectedCategory)

  return (
    <>
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={boliche.image || "/placeholder.svg"} alt={boliche.name} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-balance">{boliche.name}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance">{boliche.description}</p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{boliche.location}</span>
              </div>

              <a href={`https://instagram.com/${boliche.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span>{boliche.instagram}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-y border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button key={category} variant={selectedCategory === category ? "default" : "outline"} onClick={() => setSelectedCategory(category)} className="whitespace-nowrap">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Carta de <span className="text-primary">Tragos</span>
            </h2>

            <div className="space-y-4">
              {filteredTragos.length > 0 ? (
                filteredTragos.map((trago) => (
                  <Card key={trago.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-foreground">{trago.name}</h3>
                            {!trago.alcoholic && <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full font-medium">Sin Alcohol</span>}
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
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No hay tragos en esta categoría</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Otros <span className="text-primary">boliches</span> que te pueden gustar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {otherBoliches.map((otherBoliche) => (
              <Card key={otherBoliche.id} onClick={() => router.push(`/boliche/${otherBoliche.id}`)} className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 bg-card border-border overflow-hidden cursor-pointer">
                <div className="relative h-48 bg-secondary overflow-hidden">
                  <img src={otherBoliche.image || "/placeholder.svg"} alt={otherBoliche.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>
                <CardHeader className="pb-3">
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">{otherBoliche.name}</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-sm">{otherBoliche.barrio}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">Ver carta</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
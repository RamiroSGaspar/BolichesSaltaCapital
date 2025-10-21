import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, MapPin, Clock } from "lucide-react"
import { getAllBoliches } from "@/lib/api/boliches"
import Link from "next/link"

export const metadata = {
  title: "Todos los Boliches | Boliches - Salta Capital",
  description: "Explorá todos los boliches de Salta Capital. Precios, horarios y ubicaciones de los mejores lugares para salir.",
  keywords: "boliches salta, vida nocturna salta, donde salir salta",
}

export default async function BolichesPage() {
  const boliches = await getAllBoliches()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Todos los <span className="text-primary">Boliches</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Explorá todos los lugares de la noche salteña
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boliches.map((boliche) => (
              <div key={boliche.id} className="relative">
                <Link href={`/boliche/${boliche.id}`}>
                  <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 bg-card border-border overflow-hidden cursor-pointer h-full">
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
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span className="text-sm">{boliche.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-accent" />
                        <span className="text-sm">{boliche.horario}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {boliche.description}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Button 
                        variant="ghost" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        Ver precios
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
                
                <a 
                  href={`https://instagram.com/${boliche.instagram.replace("@", "")}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
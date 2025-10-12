"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Instagram, MapPin, Music, Star } from "lucide-react"
import type { Boliche } from "@/lib/data"
import { useRouter } from "next/navigation"

interface BolicheCardProps {
  boliche: Boliche
  preciosPreview?: { trago: string; precio: number }[]
}

export function BolicheCard({ boliche, preciosPreview }: BolicheCardProps) {
  const router = useRouter()

  return (
    <Card
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

        {/* Badges en esquinas */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {boliche.barrio}
          </Badge>
        </div>

        {boliche.destacado && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Destacado
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">
            {boliche.name}
          </h3>
          <a
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

        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4" />
          <span>{boliche.location}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{boliche.description}</p>

        {/* Preview de precios */}
        {preciosPreview && preciosPreview.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {preciosPreview.slice(0, 3).map((precio, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {precio.trago}: ${precio.precio.toLocaleString()}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          Ver precios completos
        </Button>
      </CardFooter>
    </Card>
  )
}

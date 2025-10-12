"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, TrendingDown, DollarSign } from "lucide-react"
import { tragos, boliches, preciosPorBoliche } from "@/lib/data"
import { useRouter } from "next/navigation"

export function ComparadorPrecios() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Filtrar tragos populares para mostrar
  const tragosPopulares = ["fernet-coca", "cerveza-quilmes", "gin-tonic", "vodka-energy", "campari", "shot-jager"]

  const tragosFiltrados = searchQuery
    ? tragos.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : tragos.filter((t) => tragosPopulares.includes(t.id))

  const getPrecioMasBajo = (tragoId: string) => {
    const precios = preciosPorBoliche.filter((p) => p.tragoId === tragoId && p.disponible)
    if (precios.length === 0) return null

    const minPrecio = Math.min(...precios.map((p) => p.precio))
    const boliche = precios.find((p) => p.precio === minPrecio)
    const bolicheData = boliches.find((b) => b.id === boliche?.bolicheId)

    return {
      precio: minPrecio,
      boliche: bolicheData?.name || "",
    }
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              ¿Dónde está más <span className="text-primary">barato</span> tu trago favorito?
            </h2>
          </div>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Comparamos precios en todos los boliches de Salta
          </p>
        </div>

        {/* Buscador */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar trago..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {/* Tabla comparativa simplificada */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Comparador Rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold">Trago</th>
                    <th className="text-left py-4 px-4 font-semibold hidden md:table-cell">Categoría</th>
                    <th className="text-right py-4 px-4 font-semibold">Mejor Precio</th>
                    <th className="text-left py-4 px-4 font-semibold hidden lg:table-cell">Boliche</th>
                  </tr>
                </thead>
                <tbody>
                  {tragosFiltrados.slice(0, 6).map((trago) => {
                    const mejorPrecio = getPrecioMasBajo(trago.id)
                    return (
                      <tr key={trago.id} className="border-b hover:bg-secondary/50 transition-colors">
                        <td className="py-4 px-4 font-medium">{trago.name}</td>
                        <td className="py-4 px-4 hidden md:table-cell">
                          <Badge variant="outline">{trago.category}</Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          {mejorPrecio ? (
                            <div className="flex items-center justify-end gap-2">
                              <TrendingDown className="h-4 w-4 text-green-500" />
                              <span className="text-lg font-bold text-green-600">
                                ${mejorPrecio.precio.toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground hidden lg:table-cell">
                          {mejorPrecio?.boliche || "-"}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button size="lg" onClick={() => router.push("/precios")} className="px-8">
            Ver comparador completo
          </Button>
        </div>
      </div>
    </section>
  )
}

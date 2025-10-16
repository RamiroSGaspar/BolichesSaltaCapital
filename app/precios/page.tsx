"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingDown, TrendingUp, DollarSign } from "lucide-react"
import { tragos, boliches, preciosPorBoliche } from "@/lib/data"

export default function PreciosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoriaActiva, setCategoriaActiva] = useState("Todos")

  const categorias = ["Todos", "Cervezas", "Tragos", "Shots", "Sin Alcohol"]

  const tragosFiltrados = tragos.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategoria = categoriaActiva === "Todos" || t.category === categoriaActiva
    return matchSearch && matchCategoria
  })

  const getPreciosPorTrago = (tragoId: string) => {
    return preciosPorBoliche.filter((p) => p.tragoId === tragoId)
  }

  const getPrecioMasBajo = (tragoId: string) => {
    const precios = getPreciosPorTrago(tragoId).filter((p) => p.disponible)
    return precios.length > 0 ? Math.min(...precios.map((p) => p.precio)) : null
  }

  const getPrecioMasAlto = (tragoId: string) => {
    const precios = getPreciosPorTrago(tragoId).filter((p) => p.disponible)
    return precios.length > 0 ? Math.max(...precios.map((p) => p.precio)) : null
  }

  const getPromedio = (tragoId: string) => {
    const precios = getPreciosPorTrago(tragoId).filter((p) => p.disponible)
    if (precios.length === 0) return null
    const sum = precios.reduce((acc, p) => acc + p.precio, 0)
    return Math.round(sum / precios.length)
  }

  // Stats generales
  const promedioFernet = getPromedio("fernet-coca")
  const bolicheEconomico = boliches[1].name // Patio Cervecería
  const bolichePremium = boliches[4].name // Wayruro
  const totalTragos = tragos.length

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-balance">
            Comparador de <span className="text-primary">Precios</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Encontrá dónde está más barato tu trago favorito
          </p>
        </div>

        {/* Ad Banner after header */}
        <div className="mb-8">
          <AdBanner size="leaderboard" />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground mb-1">Promedio Fernet</p>
              <p className="text-2xl font-bold">${promedioFernet?.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingDown className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm text-muted-foreground mb-1">Más económico</p>
              <p className="text-lg font-bold">{bolicheEconomico}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <p className="text-sm text-muted-foreground mb-1">Premium</p>
              <p className="text-lg font-bold">{bolichePremium}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Search className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground mb-1">Tragos en catálogo</p>
              <p className="text-2xl font-bold">{totalTragos}</p>
            </CardContent>
          </Card>
        </div>

        {/* Buscador y filtros */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar trago..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>

          <Tabs value={categoriaActiva} onValueChange={setCategoriaActiva} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {categorias.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Tabla comparativa */}
        <Card>
          <CardHeader>
            <CardTitle>Comparación de Precios por Boliche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold sticky left-0 bg-card z-10">Trago</th>
                    {boliches.map((boliche) => (
                      <th key={boliche.id} className="text-center py-4 px-3 font-semibold min-w-[100px]">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm">{boliche.name}</span>
                        </div>
                      </th>
                    ))}
                    <th className="text-center py-4 px-4 font-semibold bg-secondary/50">Promedio</th>
                    <th className="text-center py-4 px-4 font-semibold bg-green-500/10">Mejor Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {tragosFiltrados.map((trago) => {
                    const precioMasBajo = getPrecioMasBajo(trago.id)
                    const precioMasAlto = getPrecioMasAlto(trago.id)
                    const promedio = getPromedio(trago.id)

                    return (
                      <tr key={trago.id} className="border-b hover:bg-secondary/50 transition-colors">
                        <td className="py-4 px-4 sticky left-0 bg-card z-10">
                          <div>
                            <p className="font-medium">{trago.name}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {trago.category}
                            </Badge>
                          </div>
                        </td>

                        {boliches.map((boliche) => {
                          const precio = preciosPorBoliche.find(
                            (p) => p.bolicheId === boliche.id && p.tragoId === trago.id,
                          )

                          if (!precio || !precio.disponible) {
                            return (
                              <td key={boliche.id} className="py-4 px-3 text-center text-muted-foreground">
                                <span className="text-sm">No disponible</span>
                              </td>
                            )
                          }

                          const esMasBajo = precio.precio === precioMasBajo
                          const esMasAlto = precio.precio === precioMasAlto

                          return (
                            <td key={boliche.id} className="py-4 px-3 text-center">
                              <div className="flex flex-col items-center gap-1">
                                <span
                                  className={`font-semibold text-base ${
                                    esMasBajo ? "text-green-600" : esMasAlto ? "text-red-600" : "text-foreground"
                                  }`}
                                >
                                  ${precio.precio.toLocaleString()}
                                </span>
                                {esMasBajo && (
                                  <Badge variant="default" className="bg-green-600 text-xs px-2 py-0">
                                    Mejor
                                  </Badge>
                                )}
                              </div>
                            </td>
                          )
                        })}

                        <td className="py-4 px-4 text-center font-semibold bg-secondary/30">
                          {promedio ? `$${promedio.toLocaleString()}` : "-"}
                        </td>

                        <td className="py-4 px-4 text-center bg-green-500/5">
                          {precioMasBajo && (
                            <div className="flex items-center justify-center gap-1">
                              <TrendingDown className="h-4 w-4 text-green-500" />
                              <span className="font-bold text-green-600">${precioMasBajo.toLocaleString()}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span>Mejor precio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span>Precio más alto</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-foreground"></div>
                <span>Precio intermedio</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ad Banner before footer */}
        <div className="mt-12">
          <AdBanner size="large" />
        </div>
      </div>

      <Footer />
    </main>
  )
}

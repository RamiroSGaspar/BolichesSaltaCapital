"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, TrendingDown, MapPin } from "lucide-react"
import { getAllTragos } from "@/lib/api/tragos"
import { getAllBoliches } from "@/lib/api/boliches"
import { getAllPrecios } from "@/lib/api/precios"

export default function PreciosPage() {
  const searchParams = useSearchParams()
  const tragoParam = searchParams.get('trago')
  
  const [tragos, setTragos] = useState<any[]>([])
  const [boliches, setBoliches] = useState<any[]>([])
  const [precios, setPrecios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(tragoParam || "")

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (tragoParam) {
      setSearchQuery(tragoParam)
    }
  }, [tragoParam])

  async function fetchData() {
    try {
      const [t, b, p] = await Promise.all([
        getAllTragos(),
        getAllBoliches(),
        getAllPrecios()
      ])
      setTragos(t)
      setBoliches(b)
      setPrecios(p)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const tragosFiltrados = searchQuery
    ? tragos.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : tragos.slice(0, 20)

  const getPreciosPorTrago = (tragoId: string) => {
    return precios.filter((p) => p.trago_id === tragoId && p.disponible)
  }

  const getPrecioMasBajo = (tragoId: string) => {
    const preciosTrago = getPreciosPorTrago(tragoId)
    if (preciosTrago.length === 0) return null
    
    const minPrecio = Math.min(...preciosTrago.map((p) => p.precio))
    const precioObj = preciosTrago.find((p) => p.precio === minPrecio)
    const boliche = boliches.find((b) => b.id === precioObj?.boliche_id)
    
    return { precio: minPrecio, boliche: boliche?.name || "N/A" }
  }

  const getPrecioMasAlto = (tragoId: string) => {
    const preciosTrago = getPreciosPorTrago(tragoId)
    if (preciosTrago.length === 0) return null
    
    return Math.max(...preciosTrago.map((p) => p.precio))
  }

  const getDiferenciaPrecio = (tragoId: string) => {
    const bajo = getPrecioMasBajo(tragoId)
    const alto = getPrecioMasAlto(tragoId)
    if (!bajo || !alto) return null
    return alto - bajo.precio
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-xl text-muted-foreground">Cargando precios...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold">
              Comparador de <span className="text-primary">Precios</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encontrá el mejor precio para tu trago favorito en todos los boliches de Salta
            </p>
          </div>

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

          <Card>
            <CardHeader>
              <CardTitle>Comparador de Precios</CardTitle>
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
                      <th className="text-right py-4 px-4 font-semibold hidden xl:table-cell">Diferencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tragosFiltrados.map((trago) => {
                      const mejorPrecio = getPrecioMasBajo(trago.id)
                      const diferencia = getDiferenciaPrecio(trago.id)
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
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {mejorPrecio?.boliche || "-"}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right text-sm text-muted-foreground hidden xl:table-cell">
                            {diferencia ? `$${diferencia.toLocaleString()}` : "-"}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {tragosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron tragos</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
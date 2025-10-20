"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Wine, PartyPopper } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getAllBoliches } from "@/lib/api/boliches"
import { getAllTragos } from "@/lib/api/tragos"
import { getAllEventos } from "@/lib/api/eventos"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    boliches: 0,
    tragos: 0,
    eventos: 0
  })
  const [proximosEventos, setProximosEventos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [boliches, tragos, eventos] = await Promise.all([
        getAllBoliches(),
        getAllTragos(),
        getAllEventos()
      ])

      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      const proximos = eventos.filter(e => {
        const fecha = new Date(e.fecha)
        fecha.setHours(0, 0, 0, 0)
        return fecha >= hoy
      }).slice(0, 2)

      setStats({
        boliches: boliches.length,
        tragos: tragos.length,
        eventos: proximos.length
      })
      setProximosEventos(proximos)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const currentDate = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date())

  if (loading) return <div className="p-6">Cargando...</div>

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Bienvenido, Admin</h2>
          <p className="text-muted-foreground capitalize">{currentDate}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Boliches Activos</p>
                  <p className="text-3xl font-bold">{stats.boliches}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tragos en Catálogo</p>
                  <p className="text-3xl font-bold">{stats.tragos}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Wine className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Eventos Próximos</p>
                  <p className="text-3xl font-bold">{stats.eventos}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center">
                  <PartyPopper className="h-6 w-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {proximosEventos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Eventos Próximos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proximosEventos.map((evento) => (
                  <div key={evento.id} className="flex gap-4 p-3 rounded-lg border hover:border-purple-600 transition-colors cursor-pointer" onClick={() => router.push(`/evento/${evento.id}`)}>
                    <img src={evento.poster || "/placeholder.svg"} alt={evento.nombre} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{evento.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{evento.boliche}</p>
                      <Badge variant="secondary" className="mt-2">
                        {new Date(evento.fecha).toLocaleDateString('es-AR')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
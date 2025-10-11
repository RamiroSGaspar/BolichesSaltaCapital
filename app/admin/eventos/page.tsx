"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, CalendarIcon } from "lucide-react"

const eventos = [
  {
    id: 1,
    name: "Fiesta Neon",
    venue: "Macondo",
    date: "Viernes 15 Oct",
    time: "23:00 - 06:00",
    djs: "DJ Snake, DJ Mike",
    price: "$5000",
    image: "/nightclub-interior-red-lights.jpg",
  },
  {
    id: 2,
    name: "Rock Night",
    venue: "La Vieja Estación",
    date: "Sábado 16 Oct",
    time: "22:00 - 05:00",
    djs: "DJ Lucas Paz",
    price: "$4000",
    image: "/bar-vintage-warm-lights.jpg",
  },
  {
    id: 3,
    name: "Reggaeton Party",
    venue: "Wayruro",
    date: "Viernes 22 Oct",
    time: "23:30 - 06:00",
    djs: "DJ Sofi Torres, DJ Caro",
    price: "$4500",
    image: "/modern-nightclub-colorful.jpg",
  },
]

export default function EventosPage() {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  return (
    <>
      <AdminHeader title="Eventos" />
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "calendar")}>
                <TabsList>
                  <TabsTrigger value="list">Lista</TabsTrigger>
                  <TabsTrigger value="calendar">Calendario</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Evento
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {eventos.map((evento) => (
              <Card key={evento.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={evento.image || "/placeholder.svg"}
                      alt={evento.name}
                      className="w-full sm:w-48 h-48 object-cover"
                    />
                    <div className="flex-1 p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-xl">{evento.name}</h3>
                        <p className="text-muted-foreground">{evento.venue}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {evento.date}
                        </Badge>
                        <Badge variant="secondary">{evento.time}</Badge>
                        <Badge variant="secondary">Entrada: {evento.price}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">DJs: {evento.djs}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Vista de calendario en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}

import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Wine, PartyPopper, Megaphone, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
  { icon: Building2, label: "Boliches Activos", value: "15", color: "text-blue-600" },
  { icon: Wine, label: "Tragos en Catálogo", value: "87", color: "text-purple-600" },
  { icon: PartyPopper, label: "Eventos Próximos", value: "12", color: "text-pink-600" },
  { icon: Megaphone, label: "Banners Activos", value: "3", color: "text-green-600" },
]

const recentActivity = [
  { icon: "📝", text: 'Precio de "Fernet con Coca" actualizado en Macondo', time: "Hace 2 horas" },
  { icon: "➕", text: 'Nuevo boliche agregado: "La Vieja Estación"', time: "Ayer, 18:30" },
  { icon: "🎉", text: 'Evento "Fiesta de los 80s" creado en Patio', time: "Hace 3 días" },
  { icon: "💰", text: "Actualización masiva de precios completada", time: "Hace 5 días" },
  { icon: "📢", text: "Nuevo banner publicitario activado", time: "Hace 1 semana" },
]

const upcomingEvents = [
  {
    name: "Fiesta Neon",
    venue: "Macondo",
    date: "Viernes 15/10",
    image: "/nightclub-interior-red-lights.jpg",
  },
  {
    name: "Rock Night",
    venue: "La Vieja Estación",
    date: "Sábado 16/10",
    image: "/bar-vintage-warm-lights.jpg",
  },
]

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold">Bienvenido, Admin</h2>
          <p className="text-muted-foreground capitalize">{currentDate}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Boliche
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Trago
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Crear Evento
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Eventos Próximos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-3 rounded-lg border hover:border-purple-600 transition-colors"
                  >
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{event.name}</h3>
                      <p className="text-sm text-muted-foreground">{event.venue}</p>
                      <Badge variant="secondary" className="mt-2">
                        {event.date}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver detalles
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

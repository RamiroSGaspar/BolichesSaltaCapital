import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, BarChart3 } from "lucide-react"

const banners = [
  {
    id: 1,
    title: "Macondo - Promo Viernes",
    venue: "Macondo",
    position: "Header",
    startDate: "10/10",
    endDate: "20/10",
    clicks: 247,
    image: "/nightclub-interior-red-lights.jpg",
  },
  {
    id: 2,
    title: "Happy Hour - Patio",
    venue: "Patio Cervecería",
    position: "Sidebar",
    startDate: "12/10",
    endDate: "25/10",
    clicks: 189,
    image: "/bar-vintage-warm-lights.jpg",
  },
  {
    id: 3,
    title: "Noche Especial - Wayruro",
    venue: "Wayruro",
    position: "Footer",
    startDate: "15/10",
    endDate: "30/10",
    clicks: 156,
    image: "/modern-nightclub-colorful.jpg",
  },
]

export default function PublicidadPage() {
  return (
    <>
      <AdminHeader title="Publicidad" />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Banners Publicitarios</h2>
            <p className="text-muted-foreground">Gestiona los banners activos en la web</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Banner
          </Button>
        </div>

        {/* Banners List */}
        <div className="space-y-4">
          {banners.map((banner) => (
            <Card key={banner.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-full sm:w-64 h-32 object-cover"
                  />
                  <div className="flex-1 p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg">{banner.title}</h3>
                      <p className="text-sm text-muted-foreground">{banner.venue}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Posición: {banner.position}</Badge>
                      <Badge variant="secondary">
                        Vigencia: {banner.startDate} - {banner.endDate}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        {banner.clicks} clicks
                      </Badge>
                    </div>
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
      </div>
    </>
  )
}

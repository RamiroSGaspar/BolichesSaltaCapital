"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Eye, Trash2, Grid3x3, List } from "lucide-react"
import { boliches } from "@/lib/data"

export default function BolichesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBoliches = boliches.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <AdminHeader title="Boliches" />
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar boliche..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Select defaultValue="todos">
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filtro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="activos">Activos</SelectItem>
                    <SelectItem value="inactivos">Inactivos</SelectItem>
                    <SelectItem value="destacados">Destacados</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("table")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBoliches.map((boliche) => (
              <Card key={boliche.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={boliche.image || "/placeholder.svg"}
                  alt={boliche.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg">{boliche.name}</h3>
                    <p className="text-sm text-muted-foreground">{boliche.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Activo
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold">Nombre</th>
                      <th className="text-left p-4 font-semibold">Ubicación</th>
                      <th className="text-left p-4 font-semibold">Estado</th>
                      <th className="text-left p-4 font-semibold">Destacado</th>
                      <th className="text-right p-4 font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBoliches.map((boliche) => (
                      <tr key={boliche.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{boliche.name}</td>
                        <td className="p-4 text-muted-foreground">{boliche.location}</td>
                        <td className="p-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Activo
                          </Badge>
                        </td>
                        <td className="p-4">-</td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}

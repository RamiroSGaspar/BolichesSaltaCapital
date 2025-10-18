"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { getAllBoliches, createBoliche, updateBoliche, deleteBoliche } from "@/lib/api/boliches"
import type { Boliche } from "@/lib/data"
import { useRouter } from "next/navigation"

export default function BolichesPage() {
  const router = useRouter()
  const [boliches, setBoliches] = useState<Boliche[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    barrio: "",
    telefono: "",
    instagram: "",
    horario: "",
    description: "",
    image: "",
    destacado: false,
    latitude: "",
    longitude: ""
  })

  useEffect(() => {
    fetchBoliches()
  }, [])

  async function fetchBoliches() {
    try {
      const data = await getAllBoliches()
      setBoliches(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setFormData({
      id: "",
      name: "",
      location: "",
      barrio: "",
      telefono: "",
      instagram: "",
      horario: "",
      description: "",
      image: "",
      destacado: false,
      latitude: "",
      longitude: ""
    })
    setEditingId(null)
  }

  function handleEdit(boliche: Boliche) {
    setEditingId(boliche.id)
    setFormData({
      id: boliche.id,
      name: boliche.name,
      location: boliche.location,
      barrio: boliche.barrio || "",
      telefono: boliche.telefono || "",
      instagram: boliche.instagram || "",
      horario: boliche.horario || "",
      description: boliche.description || "",
      image: boliche.image || "",
      destacado: boliche.destacado || false,
      latitude: boliche.latitude?.toString() || "",
      longitude: boliche.longitude?.toString() || ""
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    try {
      const data = {
        name: formData.name,
        location: formData.location,
        barrio: formData.barrio,
        telefono: formData.telefono,
        instagram: formData.instagram,
        horario: formData.horario,
        description: formData.description,
        image: formData.image,
        destacado: formData.destacado,
        direccionCompleta: `${formData.location}, ${formData.barrio}`,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null
      }

      if (editingId) {
        await updateBoliche(editingId, data as any)
      } else {
        await createBoliche({ id: formData.id, ...data } as any)
      }

      setDialogOpen(false)
      fetchBoliches()
      resetForm()
    } catch (error) {
      console.error(error)
      alert(`Error al ${editingId ? 'actualizar' : 'crear'} boliche`)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este boliche?")) return
    try {
      await deleteBoliche(id)
      fetchBoliches()
    } catch (error) {
      console.error(error)
      alert('Error al eliminar boliche')
    }
  }

  const filteredBoliches = boliches.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.barrio?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <div className="p-6">Cargando...</div>

  return (
    <>
      <AdminHeader title="Boliches" />
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar boliches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Dialog open={dialogOpen} onOpenChange={(open) => {
                setDialogOpen(open)
                if (!open) resetForm()
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Boliche
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingId ? 'Editar Boliche' : 'Crear Nuevo Boliche'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {!editingId && (
                      <div>
                        <Label>ID *</Label>
                        <Input value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="macondo" />
                      </div>
                    )}
                    <div>
                      <Label>Nombre *</Label>
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <Label>Dirección *</Label>
                      <Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Balcarce 901" />
                    </div>
                    <div>
                      <Label>Barrio</Label>
                      <Input value={formData.barrio} onChange={(e) => setFormData({...formData, barrio: e.target.value})} placeholder="Centro" />
                    </div>
                    <div>
                      <Label>Teléfono</Label>
                      <Input value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})} placeholder="387-555-1234" />
                    </div>
                    <div>
                      <Label>Instagram</Label>
                      <Input value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} placeholder="@boliche" />
                    </div>
                    <div>
                      <Label>Horario</Label>
                      <Input value={formData.horario} onChange={(e) => setFormData({...formData, horario: e.target.value})} placeholder="23:00 - 06:00" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Latitud</Label>
                        <Input 
                          type="number" 
                          step="any"
                          value={formData.latitude} 
                          onChange={(e) => setFormData({...formData, latitude: e.target.value})} 
                          placeholder="-24.7859" 
                        />
                      </div>
                      <div>
                        <Label>Longitud</Label>
                        <Input 
                          type="number" 
                          step="any"
                          value={formData.longitude} 
                          onChange={(e) => setFormData({...formData, longitude: e.target.value})} 
                          placeholder="-65.4117" 
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} />
                    </div>
                    <div>
                      <Label>URL Imagen</Label>
                      <Input value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="/nightclub.jpg" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="destacado" checked={formData.destacado} onCheckedChange={(checked) => setFormData({...formData, destacado: checked as boolean})} />
                      <Label htmlFor="destacado" className="cursor-pointer">Boliche Destacado</Label>
                    </div>
                    <Button onClick={handleSubmit} className="w-full">
                      {editingId ? 'Actualizar Boliche' : 'Crear Boliche'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBoliches.map((boliche) => (
            <Card key={boliche.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={boliche.image || "/placeholder.svg"} alt={boliche.name} className="w-full h-48 object-cover" />
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg">{boliche.name}</h3>
                  <p className="text-sm text-muted-foreground">{boliche.location}</p>
                  {boliche.barrio && <Badge variant="secondary" className="mt-2">{boliche.barrio}</Badge>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/boliche/${boliche.id}`)}>
                    <Eye className="h-4 w-4 mr-1" />Ver
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(boliche)}>
                    <Edit className="h-4 w-4 mr-1" />Editar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(boliche.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBoliches.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No se encontraron boliches
          </div>
        )}
      </div>
    </>
  )
}
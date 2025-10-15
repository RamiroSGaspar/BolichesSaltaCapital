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
import { Search, Plus, Eye, Trash2 } from "lucide-react"
import { getAllBoliches, createBoliche, deleteBoliche } from "@/lib/api/boliches"
import type { Boliche } from "@/lib/data"
import { useRouter } from "next/navigation"

export default function BolichesPage() {
  const router = useRouter()
  const [boliches, setBoliches] = useState<Boliche[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
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
  destacado: false
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

  async function handleCreate() {
    try {
      await createBoliche({
        ...formData,
        direccionCompleta: `${formData.location}, ${formData.barrio}`
      } as any)
      setDialogOpen(false)
      fetchBoliches()
      resetForm()
    } catch (error) {
      console.error(error)
      alert('Error al crear boliche')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este boliche?")) return
    try {
      await deleteBoliche(id)
      fetchBoliches()
    } catch (error) {
      console.error(error)
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
      destacado: false
    })
  }

  const filteredBoliches = boliches.filter((b) => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <div>Cargando...</div>

  return (
    <>
      <AdminHeader title="Boliches" />
      <div className="p-6 space-y-6">
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
              <div className="flex gap-2">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Nuevo Boliche</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>ID</Label>
                        <Input value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="macondo" />
                      </div>
                      <div>
                        <Label>Nombre</Label>
                        <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div>
                        <Label>Dirección</Label>
                        <Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                      </div>
                      <div>
                        <Label>Barrio</Label>
                        <Input value={formData.barrio} onChange={(e) => setFormData({...formData, barrio: e.target.value})} />
                      </div>
                      <div>
                        <Label>Teléfono</Label>
                        <Input value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
                      </div>
                      <div>
                        <Label>Instagram</Label>
                        <Input value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} placeholder="@boliche" />
                      </div>
                      <div>
                        <Label>Horario</Label>
                        <Input value={formData.horario} onChange={(e) => setFormData({...formData, horario: e.target.value})} placeholder="23:00 - 06:00" />
                      </div>
                      <div>
                        <Label>Descripción</Label>
                        <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                      </div>
                      <div>
                        <Label>URL Imagen</Label>
                        <Input value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                      </div>
                      <Button onClick={handleCreate} className="w-full">Crear Boliche</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
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
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Activo</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/boliche/${boliche.id}`)}>
                    <Eye className="h-4 w-4 mr-1" />Ver
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(boliche.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
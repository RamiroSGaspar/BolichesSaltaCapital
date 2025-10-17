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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { getAllTragos, createTrago, updateTrago, deleteTrago } from "@/lib/api/tragos"
import type { Trago } from "@/lib/data"

export default function TragosPage() {
  const [tragos, setTragos] = useState<Trago[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "Tragos",
    price: 0,
    description: "",
    alcoholic: true,
    disponible: true
  })

  useEffect(() => {
    fetchTragos()
  }, [])

  async function fetchTragos() {
    try {
      const data = await getAllTragos()
      setTragos(data)
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
      category: "Tragos",
      price: 0,
      description: "",
      alcoholic: true,
      disponible: true
    })
    setEditingId(null)
  }

  function handleEdit(trago: Trago) {
    setEditingId(trago.id)
    setFormData({
      id: trago.id,
      name: trago.name,
      category: trago.category,
      price: trago.price || 0,
      description: trago.description || "",
      alcoholic: trago.alcoholic,
      disponible: trago.disponible
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    try {
      const data = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description,
        alcoholic: formData.alcoholic,
        disponible: formData.disponible
      }

      if (editingId) {
        await updateTrago(editingId, data)
      } else {
        await createTrago({ id: formData.id, ...data })
      }

      setDialogOpen(false)
      fetchTragos()
      resetForm()
    } catch (error) {
      console.error(error)
      alert(`Error al ${editingId ? 'actualizar' : 'crear'} trago`)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este trago?")) return
    try {
      await deleteTrago(id)
      fetchTragos()
    } catch (error) {
      console.error(error)
      alert('Error al eliminar trago')
    }
  }

  const filteredTragos = tragos.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <div className="p-6">Cargando...</div>

  return (
    <>
      <AdminHeader title="Tragos" />
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar tragos..."
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
                  <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Trago
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>{editingId ? 'Editar Trago' : 'Crear Nuevo Trago'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {!editingId && (
                      <div>
                        <Label>ID *</Label>
                        <Input value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="fernet-coca" />
                      </div>
                    )}
                    <div>
                      <Label>Nombre *</Label>
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Fernet con Coca" />
                    </div>
                    <div>
                      <Label>Categoría</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tragos">Tragos</SelectItem>
                          <SelectItem value="Cervezas">Cervezas</SelectItem>
                          <SelectItem value="Shots">Shots</SelectItem>
                          <SelectItem value="Vinos">Vinos</SelectItem>
                          <SelectItem value="Cocktails">Cocktails</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Precio Base (opcional)</Label>
                      <Input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} placeholder="0" />
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="alcoholic" checked={formData.alcoholic} onCheckedChange={(checked) => setFormData({...formData, alcoholic: checked as boolean})} />
                      <Label htmlFor="alcoholic" className="cursor-pointer">Contiene Alcohol</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disponible" checked={formData.disponible} onCheckedChange={(checked) => setFormData({...formData, disponible: checked as boolean})} />
                      <Label htmlFor="disponible" className="cursor-pointer">Disponible</Label>
                    </div>
                    <Button onClick={handleSubmit} className="w-full">
                      {editingId ? 'Actualizar Trago' : 'Crear Trago'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTragos.map((trago) => (
            <Card key={trago.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg">{trago.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{trago.category}</Badge>
                    {trago.alcoholic && <Badge variant="secondary">Alcohólico</Badge>}
                    {trago.disponible ? (
                      <Badge className="bg-green-100 text-green-700">Disponible</Badge>
                    ) : (
                      <Badge variant="destructive">No disponible</Badge>
                    )}
                  </div>
                </div>
                {trago.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{trago.description}</p>
                )}
                {trago.price > 0 && (
                  <p className="text-lg font-bold text-primary">${trago.price.toLocaleString()}</p>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(trago)}>
                    <Edit className="h-4 w-4 mr-1" />Editar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(trago.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTragos.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No se encontraron tragos
          </div>
        )}
      </div>
    </>
  )
}
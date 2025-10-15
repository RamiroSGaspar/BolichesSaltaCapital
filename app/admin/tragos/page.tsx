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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Trash2 } from "lucide-react"
import { getAllTragos, createTrago, deleteTrago } from "@/lib/api/tragos"
import type { Trago } from "@/lib/data"

export default function TragosPage() {
  const [tragos, setTragos] = useState<Trago[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
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

  async function handleCreate() {
    try {
      await createTrago(formData)
      setDialogOpen(false)
      fetchTragos()
      resetForm()
    } catch (error) {
      console.error(error)
      alert('Error al crear trago')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este trago?")) return
    try {
      await deleteTrago(id)
      fetchTragos()
    } catch (error) {
      console.error(error)
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
  }

  const filteredTragos = tragos.filter((t) => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <div>Cargando...</div>

  return (
    <>
      <AdminHeader title="Tragos" />
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center justify-between">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar trago..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Nuevo Trago</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>ID</Label>
                      <Input value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="fernet-coca" />
                    </div>
                    <div>
                      <Label>Nombre</Label>
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <Label>Categoría</Label>
                      <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cervezas">Cervezas</SelectItem>
                          <SelectItem value="Tragos">Tragos</SelectItem>
                          <SelectItem value="Shots">Shots</SelectItem>
                          <SelectItem value="Sin Alcohol">Sin Alcohol</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Precio Base</Label>
                      <Input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} />
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <Button onClick={handleCreate} className="w-full">Crear Trago</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTragos.map((trago) => (
            <Card key={trago.id}>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg">{trago.name}</h3>
                  <Badge variant="outline">{trago.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{trago.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${trago.price}</span>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(trago.id)}>
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
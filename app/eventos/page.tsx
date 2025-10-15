"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Trash2 } from "lucide-react"
import { getAllEventos, createEvento, deleteEvento } from "@/lib/api/eventos"
import { getAllBoliches } from "@/lib/api/boliches"
import type { Evento, Boliche } from "@/lib/data"

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [boliches, setBoliches] = useState<Boliche[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    boliche_id: "",
    fecha: "",
    hora: "23:00",
    djs: "",
    tematica: "",
    precio: 0,
    descripcion: "",
    poster: "",
    destacado: false
  })

  useEffect(() => {
    Promise.all([getAllEventos(), getAllBoliches()])
      .then(([e, b]) => {
        setEventos(e)
        setBoliches(b)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate() {
    try {
      const boliche = boliches.find(b => b.id === formData.boliche_id)
      await createEvento({
        ...formData,
        boliche: boliche?.name,
        djs: formData.djs.split(',').map(d => d.trim()),
        promos: []
      })
      setDialogOpen(false)
      fetchEventos()
    } catch (error) {
      console.error(error)
      alert('Error al crear evento')
    }
  }

  async function fetchEventos() {
    const data = await getAllEventos()
    setEventos(data)
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar evento?")) return
    try {
      await deleteEvento(id)
      fetchEventos()
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div>Cargando...</div>

  return (
    <>
      <AdminHeader title="Eventos" />
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div className="flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />Nuevo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Nuevo Evento</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>ID</Label>
                      <Input value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="fiesta-neon" />
                    </div>
                    <div>
                      <Label>Nombre</Label>
                      <Input value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                    </div>
                    <div>
                      <Label>Boliche</Label>
                      <Select value={formData.boliche_id} onValueChange={(v) => setFormData({...formData, boliche_id: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {boliches.map(b => (
                            <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Fecha</Label>
                      <Input type="date" value={formData.fecha} onChange={(e) => setFormData({...formData, fecha: e.target.value})} />
                    </div>
                    <div>
                      <Label>Hora</Label>
                      <Input value={formData.hora} onChange={(e) => setFormData({...formData, hora: e.target.value})} placeholder="23:00" />
                    </div>
                    <div>
                      <Label>DJs (separados por coma)</Label>
                      <Input value={formData.djs} onChange={(e) => setFormData({...formData, djs: e.target.value})} placeholder="DJ Snake, DJ Mike" />
                    </div>
                    <div>
                      <Label>Temática</Label>
                      <Input value={formData.tematica} onChange={(e) => setFormData({...formData, tematica: e.target.value})} />
                    </div>
                    <div>
                      <Label>Precio</Label>
                      <Input type="number" value={formData.precio} onChange={(e) => setFormData({...formData, precio: Number(e.target.value)})} />
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Textarea value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />
                    </div>
                    <div>
                      <Label>URL Poster</Label>
                      <Input value={formData.poster} onChange={(e) => setFormData({...formData, poster: e.target.value})} />
                    </div>
                    <Button onClick={handleCreate} className="w-full">Crear Evento</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventos.map((evento) => (
            <Card key={evento.id}>
              <img src={evento.poster || "/placeholder.svg"} alt={evento.nombre} className="w-full h-48 object-cover" />
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg">{evento.nombre}</h3>
                  <p className="text-sm text-muted-foreground">{evento.boliche}</p>
                  <p className="text-sm">{new Date(evento.fecha).toLocaleDateString()}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleDelete(evento.id)} className="w-full">
                  <Trash2 className="h-4 w-4 mr-1" />Eliminar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
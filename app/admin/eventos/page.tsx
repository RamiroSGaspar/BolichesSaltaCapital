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
import { Search, Plus, Edit, Trash2, Calendar } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { getAllEventos, createEvento, updateEvento, deleteEvento } from "@/lib/api/eventos"
import { getAllBoliches } from "@/lib/api/boliches"
import type { Evento, Boliche } from "@/lib/data"

export default function EventosAdminPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [boliches, setBoliches] = useState<Boliche[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
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
    destacado: false,
    preciosEspeciales: "",
    promos: ""
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [e, b] = await Promise.all([getAllEventos(), getAllBoliches()])
      setEventos(e)
      setBoliches(b)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setFormData({
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
      destacado: false,
      preciosEspeciales: "",
      promos: ""
    })
    setEditingId(null)
  }

  function handleEdit(evento: Evento) {
    setEditingId(evento.id)
    setFormData({
      id: evento.id,
      nombre: evento.nombre,
      boliche_id: evento.bolicheId,
      fecha: evento.fecha.toISOString().split('T')[0],
      hora: evento.hora || "23:00",
      djs: evento.djs.join(', '),
      tematica: evento.tematica || "",
      precio: evento.precio || 0,
      descripcion: evento.descripcion || "",
      poster: evento.poster || "",
      destacado: evento.destacado || false,
      preciosEspeciales: evento.preciosEspeciales ? JSON.stringify(evento.preciosEspeciales) : "",
      promos: evento.promos ? evento.promos.join(', ') : ""
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    try {
      const boliche = boliches.find(b => b.id === formData.boliche_id)
      const eventoData = {
        nombre: formData.nombre,
        boliche_id: formData.boliche_id,
        boliche: boliche?.name,
        fecha: formData.fecha,
        hora: formData.hora,
        djs: formData.djs.split(',').map(d => d.trim()).filter(d => d),
        tematica: formData.tematica,
        precio: Number(formData.precio),
        descripcion: formData.descripcion,
        poster: formData.poster,
        destacado: formData.destacado,
        precios_especiales: formData.preciosEspeciales ? JSON.parse(formData.preciosEspeciales) : null,
        promos: formData.promos ? formData.promos.split(',').map(p => p.trim()).filter(p => p) : []
      }

      if (editingId) {
        await updateEvento(editingId, eventoData)
      } else {
        await createEvento({ id: formData.id, ...eventoData })
      }

      setDialogOpen(false)
      resetForm()
      fetchData()
    } catch (error) {
      console.error(error)
      alert(`Error al ${editingId ? 'actualizar' : 'crear'} evento`)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este evento?")) return
    try {
      await deleteEvento(id)
      fetchData()
    } catch (error) {
      console.error(error)
      alert('Error al eliminar evento')
    }
  }

  const eventosFiltrados = eventos.filter(e => 
    e.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.boliche.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.tematica?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <div className="p-6">Cargando...</div>

  return (
    <>
      <AdminHeader title="Eventos" />
      <div className="p-6 space-y-6">
        {/* Header con búsqueda */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar eventos..."
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
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Editar Evento' : 'Crear Nuevo Evento'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {!editingId && (
                  <div>
                    <Label>ID *</Label>
                    <Input 
                      value={formData.id} 
                      onChange={(e) => setFormData({...formData, id: e.target.value})} 
                      placeholder="fiesta-neon-2024"
                    />
                  </div>
                )}
                <div>
                  <Label>Nombre del Evento *</Label>
                  <Input 
                    value={formData.nombre} 
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})} 
                    placeholder="Fiesta Neon"
                  />
                </div>
                <div>
                  <Label>Boliche *</Label>
                  <Select value={formData.boliche_id} onValueChange={(value) => setFormData({...formData, boliche_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar boliche" />
                    </SelectTrigger>
                    <SelectContent>
                      {boliches.map(b => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Fecha *</Label>
                    <Input 
                      type="date" 
                      value={formData.fecha} 
                      onChange={(e) => setFormData({...formData, fecha: e.target.value})} 
                    />
                  </div>
                  <div>
                    <Label>Hora</Label>
                    <Input 
                      type="time" 
                      value={formData.hora} 
                      onChange={(e) => setFormData({...formData, hora: e.target.value})} 
                    />
                  </div>
                </div>
                <div>
                  <Label>DJs (separados por coma)</Label>
                  <Input 
                    value={formData.djs} 
                    onChange={(e) => setFormData({...formData, djs: e.target.value})} 
                    placeholder="DJ Martín, DJ Lucas"
                  />
                </div>
                <div>
                  <Label>Temática</Label>
                  <Input 
                    value={formData.tematica} 
                    onChange={(e) => setFormData({...formData, tematica: e.target.value})} 
                    placeholder="Electrónica, Reggaeton, Rock..."
                  />
                </div>
                <div>
                  <Label>Precio de Entrada</Label>
                  <Input 
                    type="number" 
                    value={formData.precio} 
                    onChange={(e) => setFormData({...formData, precio: Number(e.target.value)})} 
                    placeholder="5000"
                  />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Textarea 
                    value={formData.descripcion} 
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})} 
                    placeholder="Descripción del evento..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label>URL del Poster</Label>
                  <Input 
                    value={formData.poster} 
                    onChange={(e) => setFormData({...formData, poster: e.target.value})} 
                    placeholder="/evento-poster.jpg"
                  />
                </div>
                <div>
                  <Label>Promociones (separadas por coma)</Label>
                  <Input 
                    value={formData.promos} 
                    onChange={(e) => setFormData({...formData, promos: e.target.value})} 
                    placeholder="2x1 hasta las 2am, Fernet $3000"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="destacado" 
                    checked={formData.destacado} 
                    onCheckedChange={(checked) => setFormData({...formData, destacado: checked as boolean})} 
                  />
                  <Label htmlFor="destacado" className="cursor-pointer">Evento Destacado</Label>
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  {editingId ? 'Actualizar Evento' : 'Crear Evento'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lista de eventos */}
        <div className="grid gap-4">
          {eventosFiltrados.map((evento) => (
            <Card key={evento.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-secondary overflow-hidden">
                    <img
                      src={evento.poster || "/placeholder.svg"}
                      alt={evento.nombre}
                      className="w-full h-full object-cover"
                    />
                    {evento.destacado && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
                        Destacado
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{evento.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{evento.boliche}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(evento.fecha).toLocaleDateString('es-AR')}
                      </Badge>
                      <Badge variant="secondary">{evento.hora}</Badge>
                      {evento.tematica && <Badge variant="outline">{evento.tematica}</Badge>}
                      <Badge className="bg-green-100 text-green-700">${evento.precio}</Badge>
                    </div>
                    {evento.djs && evento.djs.length > 0 && (
                      <p className="text-sm">
                        <span className="font-medium">DJs:</span> {evento.djs.join(', ')}
                      </p>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(evento)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(evento.id)}
                      >
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

        {eventosFiltrados.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No se encontraron eventos
          </div>
        )}
      </div>
    </>
  )
}
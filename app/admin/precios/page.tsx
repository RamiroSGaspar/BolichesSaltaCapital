"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getAllTragos } from "@/lib/api/tragos"
import { getAllBoliches } from "@/lib/api/boliches"
import { getAllPrecios, updatePrecio } from "@/lib/api/precios"
import type { Trago, Boliche } from "@/lib/data"

export default function PreciosPage() {
  const [tragos, setTragos] = useState<Trago[]>([])
  const [boliches, setBoliches] = useState<Boliche[]>([])
  const [precios, setPrecios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ boliche_id: "", trago_id: "", precio: 0 })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [t, b, p] = await Promise.all([getAllTragos(), getAllBoliches(), getAllPrecios()])
      setTragos(t)
      setBoliches(b)
      setPrecios(p)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate() {
    try {
      await updatePrecio(formData.boliche_id, formData.trago_id, formData.precio)
      setDialogOpen(false)
      fetchData()
      setFormData({ boliche_id: "", trago_id: "", precio: 0 })
    } catch (error) {
      console.error(error)
      alert('Error al asignar precio')
    }
  }

  if (loading) return <div>Cargando...</div>

  return (
    <>
      <AdminHeader title="Gestión de Precios" />
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Asignar Precio
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Asignar Precio a Trago</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Boliche</Label>
                    <Select value={formData.boliche_id} onValueChange={(v) => setFormData({...formData, boliche_id: v})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {boliches.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Trago</Label>
                    <Select value={formData.trago_id} onValueChange={(v) => setFormData({...formData, trago_id: v})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {tragos.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Precio</Label>
                    <Input type="number" value={formData.precio} onChange={(e) => setFormData({...formData, precio: Number(e.target.value)})} />
                  </div>
                  <Button onClick={handleCreate} className="w-full">Asignar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-secondary">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Trago</th>
                    {boliches.map(b => <th key={b.id} className="text-center p-4 font-semibold text-foreground">{b.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {tragos.map((trago) => (
                    <tr key={trago.id} className="border-b hover:bg-secondary/50">
                      <td className="p-4 font-medium text-foreground">{trago.name}</td>
                      {boliches.map(boliche => {
                        const precio = precios.find(p => p.boliche_id === boliche.id && p.trago_id === trago.id)
                        return (
                          <td key={boliche.id} className="p-4 text-center text-foreground">
                            {precio ? `$${precio.precio}` : <span className="text-muted-foreground">-</span>}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
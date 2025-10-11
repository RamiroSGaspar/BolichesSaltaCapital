"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, DollarSign } from "lucide-react"
import { tragos } from "@/lib/data"

const categories = ["Todos", "Clásicos", "Premium", "Shots", "Cervezas", "Sin Alcohol"]

export default function TragosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredTragos = tragos.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || t.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <AdminHeader title="Tragos" />
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full sm:w-auto">
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
              <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Trago
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Tragos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTragos.map((trago) => (
            <Card key={trago.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{trago.name}</h3>
                  <Badge variant="secondary" className="mt-2">
                    {trago.category}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Precios en:</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Macondo: ${trago.price}</p>
                    <p>• Patio: ${trago.price - 200}</p>
                    <p>• La Vieja Estación: ${trago.price + 100}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Precios
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

import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const preciosData = [
  { trago: "Fernet con Coca", macondo: 4500, patio: 3500, laVieja: 3800 },
  { trago: "Cerveza Quilmes", macondo: 2800, patio: 2500, laVieja: 2800 },
  { trago: "Gin Tonic", macondo: 5000, patio: 4800, laVieja: null },
  { trago: "Vodka Energy", macondo: 4200, patio: 4000, laVieja: 4500 },
  { trago: "Mojito", macondo: 3500, patio: 3200, laVieja: 3400 },
]

export default function PreciosPage() {
  return (
    <>
      <AdminHeader title="Precios" />
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full sm:w-auto flex gap-2">
                <Select defaultValue="todas">
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="clasicos">Clásicos</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="shots">Shots</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Price Comparison Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Trago / Boliche</th>
                    <th className="text-center p-4 font-semibold">Macondo</th>
                    <th className="text-center p-4 font-semibold">Patio</th>
                    <th className="text-center p-4 font-semibold">La Vieja</th>
                    <th className="text-center p-4 font-semibold">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {preciosData.map((row, index) => {
                    const precios = [row.macondo, row.patio, row.laVieja].filter((p) => p !== null) as number[]
                    const min = Math.min(...precios)
                    const max = Math.max(...precios)
                    const avg = Math.round(precios.reduce((a, b) => a + b, 0) / precios.length)

                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{row.trago}</td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1">
                            ${row.macondo}
                            {row.macondo === max && <Badge className="bg-red-100 text-red-700 text-xs">❌</Badge>}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1">
                            ${row.patio}
                            {row.patio === min && <Badge className="bg-green-100 text-green-700 text-xs">✅</Badge>}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {row.laVieja ? `$${row.laVieja}` : <span className="text-muted-foreground">-</span>}
                        </td>
                        <td className="p-4 text-center font-semibold">${avg}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

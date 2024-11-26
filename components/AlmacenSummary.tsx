'use client'

import { useAlbaranes } from '@/hooks/useAlbaranes'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AlmacenSummary() {
  const { albaranes } = useAlbaranes()

  const almacenSummary = albaranes.reduce((acc, albaran) => {
    if (albaran.tipo === 'propio') {
      if (!acc[albaran.almacen]) {
        acc[albaran.almacen] = {
          kgHumedos: 0,
          kgSecos: 0,
          humedadTotal: 0,
          count: 0
        }
      }
      acc[albaran.almacen].kgHumedos += Number(albaran.kgHumedos)
      acc[albaran.almacen].kgSecos += Number(albaran.kgSecos)
      acc[albaran.almacen].humedadTotal += Number(albaran.humedad)
      acc[albaran.almacen].count++
    }
    return acc
  }, {} as Record<string, { kgHumedos: number; kgSecos: number; humedadTotal: number; count: number }>)

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Resumen por Almacén</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2 bg-green-100">Almacén</th>
                <th className="text-right p-2 bg-green-100">Toneladas Húmedas</th>
                <th className="text-right p-2 bg-green-100">Toneladas Secas</th>
                <th className="text-right p-2 bg-green-100">Humedad Promedio</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(almacenSummary).map(([almacen, datos]) => (
                <tr key={almacen} className="border-b">
                  <td className="p-2">{almacen}</td>
                  <td className="text-right p-2">{(datos.kgHumedos / 1000).toFixed(2)} t</td>
                  <td className="text-right p-2">{(datos.kgSecos / 1000).toFixed(2)} t</td>
                  <td className="text-right p-2">{(datos.humedadTotal / datos.count).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}


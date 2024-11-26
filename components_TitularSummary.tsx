'use client'

import { useAlbaranes } from '@/hooks/useAlbaranes'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TitularSummary() {
  const { albaranes } = useAlbaranes()

  const titularSummary = albaranes.reduce((acc, albaran) => {
    if (!acc[albaran.titular]) {
      acc[albaran.titular] = {
        kgHumedos: 0,
        kgSecos: 0,
        humedadTotal: 0,
        count: 0
      }
    }
    acc[albaran.titular].kgHumedos += Number(albaran.kgHumedos)
    acc[albaran.titular].kgSecos += Number(albaran.kgSecos)
    acc[albaran.titular].humedadTotal += Number(albaran.humedad)
    acc[albaran.titular].count++
    return acc
  }, {} as Record<string, { kgHumedos: number; kgSecos: number; humedadTotal: number; count: number }>)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resumen por Explotación</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2 bg-green-100">Titular</th>
                <th className="text-right p-2 bg-green-100">Toneladas Húmedas</th>
                <th className="text-right p-2 bg-green-100">Toneladas Secas</th>
                <th className="text-right p-2 bg-green-100">Humedad Promedio</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(titularSummary).map(([titular, datos]) => (
                <tr key={titular} className="border-b">
                  <td className="p-2">{titular}</td>
                  <td className="text-right p-2">
                    <span className="font-bold text-green-900 bg-green-100 px-2 py-1 rounded">
                      {(datos.kgHumedos / 1000).toFixed(2)} t
                    </span>
                  </td>
                  <td className="text-right p-2">
                    <span className="text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                      {(datos.kgSecos / 1000).toFixed(2)} t
                    </span>
                  </td>
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


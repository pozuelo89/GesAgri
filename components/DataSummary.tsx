'use client'

import { useAlbaranes } from '@/hooks/useAlbaranes'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DataSummary() {
  const { albaranes } = useAlbaranes()

  const today = new Date().toISOString().split('T')[0]

  const summary = albaranes.reduce((acc, albaran) => {
    if (albaran.tipo === 'propio') {
      acc.totalKgHumedos += Number(albaran.kgHumedos)
      acc.totalKgSecos += Number(albaran.kgSecos)
      acc.humedadTotal += Number(albaran.humedad)
      acc.count++

      if (albaran.fecha === today) {
        acc.totalKgHumedosHoy += Number(albaran.kgHumedos)
        acc.totalKgSecosHoy += Number(albaran.kgSecos)
        acc.humedadTotalHoy += Number(albaran.humedad)
        acc.countHoy++
      }
    }
    return acc
  }, {
    totalKgHumedos: 0,
    totalKgSecos: 0,
    totalKgHumedosHoy: 0,
    totalKgSecosHoy: 0,
    humedadTotal: 0,
    humedadTotalHoy: 0,
    count: 0,
    countHoy: 0
  })

  const promedioHumedad = summary.count > 0 ? (summary.humedadTotal / summary.count).toFixed(2) : '0'
  const promedioHumedadHoy = summary.countHoy > 0 ? (summary.humedadTotalHoy / summary.countHoy).toFixed(2) : '0'

  const kgToToneladas = (kg: number) => (kg / 1000).toFixed(2)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Resumen General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Total Toneladas Húmedas:</p>
              <p>
                <span className="font-bold text-green-900 bg-green-100 px-2 py-1 rounded">
                  {kgToToneladas(summary.
totalKgHumedos)} t
                </span>
              </p>
            </div>
            <div>
              <p className="font-semibold">Total Toneladas Secas:</p>
              <p>
                <span className="text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                  {kgToToneladas(summary.totalKgSecos)} t
                </span>
              </p>
            </div>
            <div>
              <p className="font-semibold">Humedad Promedio:</p>
              <p>{promedioHumedad}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Resumen Hoy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Toneladas Húmedas Hoy:</p>
              <p>
                <span className="font-bold text-green-900 bg-green-100 px-2 py-1 rounded">
                  {kgToToneladas(summary.totalKgHumedosHoy)} t
                </span>
              </p>
            </div>
            <div>
              <p className="font-semibold">Toneladas Secas Hoy:</p>
              <p>
                <span className="text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                  {kgToToneladas(summary.totalKgSecosHoy)} t
                </span>
              </p>
            </div>
            <div>
              <p className="font-semibold">Humedad Promedio Hoy:</p>
              <p>{promedioHumedadHoy}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


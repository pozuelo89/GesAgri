'use client'

import { useState } from 'react'
import { useAlbaranes, type AlbaranFilters } from '@/hooks/useAlbaranes'
import { useDatosMaestros } from '@/hooks/useDatosMaestros'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AlbaranTable() {
  const { albaranes, setFilters } = useAlbaranes()
  const { datosMaestros } = useDatosMaestros()
  const [filterValues, setFilterValues] = useState<AlbaranFilters>({})

  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filterValues, [name]: value === 'all' ? '' : value }
    setFilterValues(newFilters)
    setFilters(newFilters)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-green-700">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select onValueChange={(value) => handleFilterChange('titular', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por Titular" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los titulares</SelectItem>
              {datosMaestros.titulares.map((titular) => (
                <SelectItem key={titular} value={titular}>{titular}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange('cultivo', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por Cultivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los cultivos</SelectItem>
              {datosMaestros.cultivos.map((cultivo) => (
                <SelectItem key={cultivo} value={cultivo}>{cultivo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange('almacen', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por Almacén" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los almacenes</SelectItem>
              {datosMaestros.almacenes.map((almacen) => (
                <SelectItem key={almacen} value={almacen}>{almacen}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input
            type="date"
            name="fechaDesde"
            value={filterValues.fechaDesde || ''}
            onChange={(e) => handleFilterChange('fechaDesde', e.target.value)}
            className="p-2 border border-green-300 rounded"
          />
          <input
            type="date"
            name="fechaHasta"
            value={filterValues.fechaHasta || ''}
            onChange={(e) => handleFilterChange('fechaHasta', e.target.value)}
            className="p-2 border border-green-300 rounded"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-green-600 text-white font-semibold text-sm uppercase">Nº Albarán</th>
              <th className="px-4 py-2 bg-green-600 text-white font-semibold text-sm uppercase">Titular</th>
              <th className="px-4 py-2 bg-green-600 text-white font-semibold text-sm uppercase">Cultivo</th>
              <th className="px-4 py-2 bg-green-600 text-white font-semibold text-sm uppercase">Fecha</th>
              <th className="px-4 py-2 bg-green-600 text-white font-semibold text-sm uppercase">Parcela</th>
              <th className="px-4 py-2 bg-green-600 text-white font-semibold text-sm uppercase">Almacén</th>
              <th className="px-4 py-2 bg-green-600 text-white font-semibold text-sm uppercase">Kg Húmedos</th>
              <th className="px-4 py-2 bg-green-600 text-white font-semibold text-sm uppercase">Kg Secos</th>
              <th className="px-4 py-2 bg-green-600 text-white font-semibold text-sm uppercase">% Humedad</th>
              <th className="px-4 py-2 bg-green-600 text-white font-semibold text-sm uppercase">Peso Específico</th>
            </tr>
          </thead>
          <tbody>
            {albaranes.map((albaran, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-green-50' : 'bg-white'}>
                <td className="px-4 py-2 border-b border-green-100">{albaran.numeroAlbaran}</td>
                <td className="px-4 py-2 border-b border-green-100">{albaran.titular}</td>
                <td className="px-4 py-2 border-b border-green-100">{albaran.cultivo}</td>
                <td className="px-4 py-2 border-b border-green-100">{albaran.fecha}</td>
                <td className="px-4 py-2 border-b border-green-100">{albaran.parcela}</td>
                <td className="px-4 py-2 border-b border-green-100">{albaran.almacen}</td>
                <td className="px-4 py-2 border-b border-green-100">
                  <span className="font-bold text-green-900 bg-green-100 px-2 py-1 rounded">
                    {Math.round(Number(albaran.kgHumedos))}
                  </span>
                </td>
                <td className="px-4 py-2 border-b border-green-100">
                  <span className="text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                    {Math.round(Number(albaran.kgSecos))}
                  </span>
                </td>
                <td className="px-4 py-2 border-b border-green-100">{albaran.humedad}</td>
                <td className="px-4 py-2 border-b border-green-100">{albaran.pesoEspecifico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-green-700">Subtotal de Tickets Filtrados</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-semibold">Total Toneladas Húmedas:</p>
            <p>
              <span className="font-bold text-green-900 bg-green-100 px-2 py-1 rounded">
                {(albaranes.reduce((sum, albaran) => sum + Number(albaran.kgHumedos), 0) / 1000).toFixed(2)} t
              </span>
            </p>
          </div>
          <div>
            <p className="font-semibold">Total Toneladas Secas:</p>
            <p>
              <span className="text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                {(albaranes.reduce((sum, albaran) => sum + Number(albaran.kgSecos), 0) / 1000).toFixed(2)} t
              </span>
            </p>
          </div>
          <div>
            <p className="font-semibold">Humedad Promedio:</p>
            <p>
              {albaranes.length > 0
                ? (albaranes.reduce((sum, albaran) => sum + Number(albaran.humedad), 0) / albaranes.length).toFixed(2)
                : '0'}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


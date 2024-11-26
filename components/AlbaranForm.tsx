'use client'

import { useState, useEffect } from 'react'
import { useAlbaranes } from '@/hooks/useAlbaranes'
import { useDatosMaestros } from '@/hooks/useDatosMaestros'
import { useRouter } from 'next/navigation'

export default function AlbaranForm() {
  const router = useRouter()
  const { addAlbaran, getLastAlbaran } = useAlbaranes()
  const { datosMaestros } = useDatosMaestros()
  const [formData, setFormData] = useState({
    numeroAlbaran: '',
    tipo: 'propio',
    titular: '',
    cultivo: '',
    fecha: new Date().toISOString().split('T')[0],
    parcela: '',
    almacen: '',
    kgHumedos: '',
    kgSecos: '',
    humedad: '',
    pesoEspecifico: ''
  })

  useEffect(() => {
    const lastAlbaran = getLastAlbaran()
    if (lastAlbaran) {
      setFormData(prevData => ({
        ...prevData,
        titular: lastAlbaran.titular,
        cultivo: lastAlbaran.cultivo,
        parcela: lastAlbaran.parcela,
        almacen: lastAlbaran.almacen
      }))
    }
  }, [getLastAlbaran])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addAlbaran(formData)
    router.push('/listado-albaranes')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="numeroAlbaran"
          value={formData.numeroAlbaran}
          onChange={handleChange}
          placeholder="Número de Albarán"
          className="p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="tipo"
              value="propio"
              checked={formData.tipo === 'propio'}
              onChange={handleChange}
              className="mr-2"
              required
            />
            Propio
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="tipo"
              value="tercero"
              checked={formData.tipo === 'tercero'}
              onChange={handleChange}
              className="mr-2"
              required
            />
            Tercero
          </label>
        </div>
        <select
          name="titular"
          value={formData.titular}
          onChange={handleChange}
          className="p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        >
          <option value="">Seleccione un titular</option>
          {datosMaestros.titulares.map(titular => (
            <option key={titular} value={titular}>{titular}</option>
          ))}
        </select>
        <select
          name="cultivo"
          value={formData.cultivo}
          onChange={handleChange}
          className="p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        >
          <option value="">Seleccione un cultivo</option>
          {datosMaestros.cultivos.map(cultivo => (
            <option key={cultivo} value={cultivo}>{cultivo}</option>
          ))}
        </select>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
        <select
          name="parcela"
          value={formData.parcela}
          onChange={handleChange}
          className="p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        >
          <option value="">Seleccione una parcela</option>
          {datosMaestros.parcelas.map(parcela => (
            <option key={parcela} value={parcela}>{parcela}</option>
          ))}
        </select>
        <select
          name="almacen"
          value={formData.almacen}
          onChange={handleChange}
          className="p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        >
          <option value="">Seleccione un almacén</option>
          {datosMaestros.almacenes.map(almacen => (
            <option key={almacen} value={almacen}>{almacen}</option>
          ))}
        </select>
        <input
          type="number"
          name="kgHumedos"
          value={formData.kgHumedos}
          onChange={handleChange}
          placeholder="Kg Húmedos"
          className="p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
        <input
          type="number"
          name="kgSecos"
          value={formData.kgSecos}
          onChange={handleChange}
          placeholder="Kg Secos"
          className="p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
        <input
          type="number"
          name="humedad"
          value={formData.humedad}
          onChange={handleChange}
          placeholder="% Humedad"
          className="p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
        <input
          type="number"
          name="pesoEspecifico"
          value={formData.pesoEspecifico}
          onChange={handleChange}
          placeholder="Peso Específico"
          className="p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Añadir Albarán
      </button>
    </form>
  )
}


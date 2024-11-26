'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useDatosMaestros } from '@/hooks/useDatosMaestros'

export default function DatosMaestros() {
  const { datosMaestros, addDatoMaestro, editDatoMaestro, deleteDatoMaestro } = useDatosMaestros()
  const [newData, setNewData] = useState({ type: '', value: '' })
  const [editingData, setEditingData] = useState<{ type: string; index: number; value: string } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newData.type && newData.value) {
      addDatoMaestro(newData.type, newData.value)
      setNewData({ type: '', value: '' })
    }
  }

  const handleEdit = (type: string, index: number, value: string) => {
    setEditingData({ type, index, value })
  }

  const handleSaveEdit = () => {
    if (editingData) {
      editDatoMaestro(editingData.type, editingData.index, editingData.value)
      setEditingData(null)
    }
  }

  const handleDelete = (type: string, index: number) => {
    deleteDatoMaestro(type, index)
  }

  return (
    <main className="container mx-auto p-4 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-500 pb-2">
        Datos Maestros
      </h1>
      <Link href="/" className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 ease-in-out">
        Volver
      </Link>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex gap-4 mb-4">
          <select
            value={newData.type}
            onChange={(e) => setNewData({ ...newData, type: e.target.value })}
            className="p-2 border border-green-300 rounded flex-grow"
            required
          >
            <option value="">Seleccione tipo de dato</option>
            <option value="almacenes">Almacén</option>
            <option value="titulares">Titular</option>
            <option value="cultivos">Cultivo</option>
            <option value="parcelas">Parcela</option>
          </select>
          <input
            type="text"
            value={newData.value}
            onChange={(e) => setNewData({ ...newData, value: e.target.value })}
            placeholder="Nuevo valor"
            className="p-2 border border-green-300 rounded flex-grow"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 ease-in-out">
          Añadir Dato Maestro
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(datosMaestros).map(([type, values]) => (
          <div key={type} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-green-700 capitalize">{type}</h2>
            <ul className="list-disc list-inside">
              {values.map((value, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  {editingData && editingData.type === type && editingData.index === index ? (
                    <input
                      type="text"
                      value={editingData.value}
                      onChange={(e) => setEditingData({ ...editingData, value: e.target.value })}
                      className="p-1 border border-green-300 rounded"
                    />
                  ) : (
                    <span>{value}</span>
                  )}
                  <div>
                    {editingData && editingData.type === type && editingData.index === index ? (
                      <button
                        onClick={handleSaveEdit}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(type, index, value)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        Editar
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(type, index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}


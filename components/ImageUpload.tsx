'use client'

import { useState } from 'react'
import { useAlbaranes } from '@/hooks/useAlbaranes'

export default function ImageUpload() {
  const { addAlbaran } = useAlbaranes()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsProcessing(true)
      // Aquí simularemos el procesamiento de la imagen
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Datos simulados extraídos de la imagen
      const extractedData = {
        numeroAlbaran: 'A001',
        titular: 'Juan Pérez',
        cultivo: 'Maíz',
        fecha: new Date().toISOString().split('T')[0],
        parcela: 'Parcela A',
        almacen: 'Almacén 1',
        kgHumedos: '1000',
        kgSecos: '900',
        humedad: '10',
        pesoEspecifico: '72'
      }
      
      addAlbaran(extractedData)
      setIsProcessing(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="imageInput"
      />
      <label
        htmlFor="imageInput"
        className="block w-full p-2 bg-green-500 text-white rounded text-center cursor-pointer hover:bg-green-600"
      >
        {isProcessing ? 'Procesando...' : 'Capturar/Subir Imagen'}
      </label>
    </div>
  )
}


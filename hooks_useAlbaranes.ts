'use client'

import { useState, useEffect } from 'react'

export interface Albaran {
  numeroAlbaran: string
  tipo: 'propio' | 'tercero'
  titular: string
  cultivo: string
  fecha: string
  parcela: string
  almacen: string
  kgHumedos: string
  kgSecos: string
  humedad: string
  pesoEspecifico: string
}

export interface AlbaranFilters {
  titular?: string
  cultivo?: string
  almacen?: string
  fechaDesde?: string
  fechaHasta?: string
}

export function useAlbaranes() {
  const [albaranes, setAlbaranes] = useState<Albaran[]>([])
  const [filters, setFilters] = useState<AlbaranFilters>({})

  useEffect(() => {
    const storedAlbaranes = localStorage.getItem('albaranes')
    if (storedAlbaranes) {
      setAlbaranes(JSON.parse(storedAlbaranes))
    }
  }, [])

  const addAlbaran = (albaran: Albaran) => {
    const updatedAlbaranes = [...albaranes, albaran]
    setAlbaranes(updatedAlbaranes)
    localStorage.setItem('albaranes', JSON.stringify(updatedAlbaranes))
  }

  const getLastAlbaran = () => {
    return albaranes[albaranes.length - 1] || null
  }

  const filteredAlbaranes = albaranes.filter(albaran => {
    let matches = true
    
    if (filters.titular && !albaran.titular.toLowerCase().includes(filters.titular.toLowerCase())) {
      matches = false
    }
    if (filters.cultivo && !albaran.cultivo.toLowerCase().includes(filters.cultivo.toLowerCase())) {
      matches = false
    }
    if (filters.almacen && !albaran.almacen.toLowerCase().includes(filters.almacen.toLowerCase())) {
      matches = false
    }
    if (filters.fechaDesde && albaran.fecha < filters.fechaDesde) {
      matches = false
    }
    if (filters.fechaHasta && albaran.fecha > filters.fechaHasta) {
      matches = false
    }
    
    return matches
  })

  return { albaranes: filteredAlbaranes, addAlbaran, setFilters, getLastAlbaran }
}


'use client'

import { useState, useEffect } from 'react'

type DatosMaestros = {
  almacenes: string[]
  titulares: string[]
  cultivos: string[]
  parcelas: string[]
}

export function useDatosMaestros() {
  const [datosMaestros, setDatosMaestros] = useState<DatosMaestros>({
    almacenes: [],
    titulares: [],
    cultivos: [],
    parcelas: []
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDatos = localStorage.getItem('datosMaestros')
      if (storedDatos) {
        setDatosMaestros(JSON.parse(storedDatos))
      }
    }
  }, [])

  const addDatoMaestro = (type: keyof DatosMaestros, value: string) => {
    const updatedDatos = {
      ...datosMaestros,
      [type]: [...datosMaestros[type], value]
    }
    setDatosMaestros(updatedDatos)
    if (typeof window !== 'undefined') {
      localStorage.setItem('datosMaestros', JSON.stringify(updatedDatos))
    }
  }

  const editDatoMaestro = (type: keyof DatosMaestros, index: number, newValue: string) => {
    const updatedDatos = {
      ...datosMaestros,
      [type]: datosMaestros[type].map((value, i) => i === index ? newValue : value)
    }
    setDatosMaestros(updatedDatos)
    if (typeof window !== 'undefined') {
      localStorage.setItem('datosMaestros', JSON.stringify(updatedDatos))
    }
  }

  const deleteDatoMaestro = (type: keyof DatosMaestros, index: number) => {
    const updatedDatos = {
      ...datosMaestros,
      [type]: datosMaestros[type].filter((_, i) => i !== index)
    }
    setDatosMaestros(updatedDatos)
    if (typeof window !== 'undefined') {
      localStorage.setItem('datosMaestros', JSON.stringify(updatedDatos))
    }
  }

  return { datosMaestros, addDatoMaestro, editDatoMaestro, deleteDatoMaestro }
}


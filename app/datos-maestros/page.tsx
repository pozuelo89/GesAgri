'use client'

import { useDatosMaestros } from '@/hooks/useDatosMaestros'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function DatosMaestrosPage() {
  const { datosMaestros, addDatoMaestro, editDatoMaestro, deleteDatoMaestro } = useDatosMaestros()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Datos Maestros</h1>
      {Object.entries(datosMaestros).map(([type, items]) => (
        <Card key={type} className="mb-4">
          <CardHeader>
            <CardTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {items.map((item, index) => (
                <li key={index} className="flex items-center mb-2">
                  <Input
                    value={item}
                    onChange={(e) => editDatoMaestro(type as keyof typeof datosMaestros, index, e.target.value)}
                    className="mr-2"
                  />
                  <Button onClick={() => deleteDatoMaestro(type as keyof typeof datosMaestros, index)} variant="destructive">
                    Eliminar
                  </Button>
                </li>
              ))}
            </ul>
            <div className="flex mt-4">
              <Input
                placeholder={`Nuevo ${type}`}
                className="mr-2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addDatoMaestro(type as keyof typeof datosMaestros, (e.target as HTMLInputElement).value)
                    ;(e.target as HTMLInputElement).value = ''
                  }
                }}
              />
              <Button onClick={() => {
                const input = document.querySelector(`input[placeholder="Nuevo ${type}"]`) as HTMLInputElement
                if (input.value) {
                  addDatoMaestro(type as keyof typeof datosMaestros, input.value)
                  input.value = ''
                }
              }}>
                Añadir
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


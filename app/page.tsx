import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Bienvenido a KZ Agricultura</h1>
      <Card>
        <CardHeader>
          <CardTitle>Ejemplo de Componentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Escribe algo..." className="mb-4" />
          <Button className="mr-4">Botón de Ejemplo</Button>
          <Checkbox id="terms" />
          <label htmlFor="terms" className="ml-2">Acepto los términos</label>
        </CardContent>
      </Card>
    </main>
  )
}


import Link from 'next/link'
import DataSummary from '@/components/DataSummary'
import TitularSummary from '@/components/TitularSummary'
import AlmacenSummary from '@/components/AlmacenSummary'
import { Button } from "@/components/ui/button"

export default function AlbaranesCosecha() {
  return (
    <main className="container mx-auto p-4 bg-green-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 border-b-2 border-green-500 pb-2">
          Tickets Cosecha
        </h1>
      </header>
      <nav className="mb-6">
        <Link href="/dashboard" passHref>
          <Button variant="outline" className="mb-4">
            Volver al Dashboard
          </Button>
        </Link>
      </nav>
      <div className="grid gap-6">
        <DataSummary />
        <TitularSummary />
        <AlmacenSummary />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/crear-albaran" passHref>
            <Button className="w-full h-16">
              Crear Ticket
            </Button>
          </Link>
          <Link href="/listado-albaranes" passHref>
            <Button className="w-full h-16">
              Listado Tickets
            </Button>
          </Link>
          <Link href="/datos-maestros" passHref>
            <Button className="w-full h-16">
              Añadir Datos
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}


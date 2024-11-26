import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-green-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">KZ Gestión Agrícola</h1>
      </header>
      <main>
        <nav className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/albaranes-cosecha" passHref>
            <Button className="w-full h-24 text-lg">Tickets cosecha</Button>
          </Link>
          <Link href="/crear-albaran" passHref>
            <Button className="w-full h-24 text-lg">Crear Ticket</Button>
          </Link>
          <Link href="/listado-albaranes" passHref>
            <Button className="w-full h-24 text-lg">Listado Tickets</Button>
          </Link>
          <Link href="/datos-maestros" passHref>
            <Button className="w-full h-24 text-lg">Datos Maestros</Button>
          </Link>
        </nav>
      </main>
      <footer className="mt-8 text-center text-gray-500">
        <p>&copy; 2023 KZ Gestión Agrícola. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

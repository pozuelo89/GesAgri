import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">KZ Gestión Agrícola</h1>
      <div className="grid gap-4">
        <Link href="/albaranes-cosecha">
          <Button className="w-full">Tickets cosecha</Button>
        </Link>
        {/* Aquí puedes agregar más botones para otras páginas en el futuro */}
      </div>
    </div>
  )
}


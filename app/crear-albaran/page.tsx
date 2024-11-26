import AlbaranForm from '@/components/AlbaranForm'
import ImageUpload from '@/components/ImageUpload'
import Link from 'next/link'

export default function CrearAlbaran() {
  return (
    <main className="container mx-auto p-4 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-500 pb-2">
        Crear Nuevo Albarán
      </h1>
      <Link href="/" className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 ease-in-out">
        Volver
      </Link>
      <div className="grid gap-6">
        <AlbaranForm />
        <div>
          <h2 className="text-xl font-semibold mb-3 text-green-700">Subir Imagen de Albarán</h2>
          <ImageUpload />
        </div>
      </div>
    </main>
  )
}


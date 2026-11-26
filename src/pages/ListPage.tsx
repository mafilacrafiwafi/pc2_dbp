import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ItemCard from '../components/ItemCard'
import Pagination from '../components/Pagination'
import { getLocations } from '../api/services'
import type { Location } from '../types'

const SIZE = 5

// dashboard con la lista de espacios
function ListPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // pide la pagina actual a la API
  const loadLocations = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getLocations(page, SIZE)
      setLocations(data.items)
      setTotalPages(data.totalPages)
    } catch {
      setError('No se pudo cargar la lista de espacios')
    } finally {
      setLoading(false)
    }
  }

  // se vuelve a consultar cada vez que cambia la pagina
  useEffect(() => {
    loadLocations()
  }, [page])

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Espacios</h1>

        {loading && <p className="text-gray-600">Cargando...</p>}

        {!loading && error && (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <p className="mb-2">{error}</p>
            <button onClick={loadLocations} className="bg-red-600 text-white px-4 py-2 rounded">
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && locations.length === 0 && (
          <p className="text-gray-600">No hay espacios para mostrar.</p>
        )}

        {!loading && !error && locations.length > 0 && (
          <div className="grid gap-4">
            {locations.map((location) => (
              <ItemCard key={location.id} location={location} />
            ))}
          </div>
        )}

        {!loading && !error && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
          />
        )}
      </div>
    </div>
  )
}

export default ListPage

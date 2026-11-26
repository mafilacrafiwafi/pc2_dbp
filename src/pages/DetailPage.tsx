import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import StatusBadge from '../components/StatusBadge'
import { getLocation } from '../api/services'
import type { Location } from '../types'

// detalle de un espacio
function DetailPage() {
  const { id } = useParams()
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // pide el espacio por su id
  const loadLocation = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getLocation(id!)
      setLocation(data)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError('El espacio no existe')
      } else {
        setError('No se pudo cargar el espacio')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLocation()
  }, [id])

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Volver al dashboard
        </Link>

        {loading && <p className="text-gray-600 mt-4">Cargando...</p>}

        {!loading && error && (
          <p className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</p>
        )}

        {!loading && location && (
          <div className="bg-white border border-gray-200 rounded p-6 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{location.name}</h1>
              <StatusBadge status={location.status} />
            </div>
            <p className="mb-4">{location.description}</p>
            <p className="text-gray-600">Edificio: {location.building}</p>
            <p className="text-gray-600">Piso: {location.floor}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailPage

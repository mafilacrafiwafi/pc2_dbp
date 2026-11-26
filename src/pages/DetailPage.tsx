import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import StatusBadge from '../components/StatusBadge'
import FormField from '../components/FormField'
import { createTicket, getLocation } from '../api/services'
import type { Location } from '../types'

// detalle de un espacio
function DetailPage() {
  const { id } = useParams()
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState('')
  const [sendError, setSendError] = useState('')

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

  // formulario para crear una solicitud
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSuccess('')
    setSendError('')

    const text = description.trim()
    if (text.length < 10 || text.length > 200) {
      setDescriptionError('La descripcion debe tener de 10 a 200 caracteres')
      return
    }
    setDescriptionError('')

    setSending(true)
    try {
      await createTicket(id!, text)
      setSuccess('Solicitud creada correctamente')
      setDescription('')
      loadLocation()
    } catch (err) {
      // el espacio esta cerrado
      if (axios.isAxiosError(err) && err.response?.status === 409 && err.response.data.code === 'LOCATION_CLOSED') {
        setSendError('El espacio esta cerrado y no admite solicitudes')
        loadLocation()
      } else if (axios.isAxiosError(err) && err.response) {
        setSendError(err.response.data.message)
      } else {
        setSendError('No se pudo enviar la solicitud')
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
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

        {success && <p className="bg-green-100 text-green-700 p-4 rounded mt-4">{success}</p>}

        {!loading && location && (
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded p-6 mt-4">
            <h2 className="text-lg font-semibold mb-4">Nueva solicitud</h2>

            {sendError && <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{sendError}</p>}

            <FormField
              label="Descripcion del problema"
              name="description"
              value={description}
              onChange={setDescription}
              error={descriptionError}
            />

            <button
              type="submit"
              disabled={sending}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {sending ? 'Enviando...' : 'Enviar solicitud'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default DetailPage

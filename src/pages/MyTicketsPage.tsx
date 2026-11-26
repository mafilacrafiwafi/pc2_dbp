import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import StatusBadge from '../components/StatusBadge'
import { getMyTickets } from '../api/services'
import type { Ticket } from '../types'

// mis solicitudes
function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTickets = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getMyTickets()
      setTickets(data)
    } catch {
      setError('No se pudieron cargar tus solicitudes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTickets()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Mis solicitudes</h1>

        {loading && <p className="text-gray-600">Cargando...</p>}

        {!loading && error && (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <p className="mb-2">{error}</p>
            <button onClick={loadTickets} className="bg-red-600 text-white px-4 py-2 rounded">
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && tickets.length === 0 && (
          <p className="text-gray-600">Todavia no tienes solicitudes.</p>
        )}

        {!loading && !error && tickets.length > 0 && (
          <div className="grid gap-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white border border-gray-200 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold">
                    #{ticket.id} - {ticket.resourceName}
                  </h2>
                  <StatusBadge status={ticket.status} />
                </div>
                <p className="text-gray-700">{ticket.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyTicketsPage

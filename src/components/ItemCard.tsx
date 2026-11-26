import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import StatusBadge from './StatusBadge'

interface ItemCardProps {
  title: string
  status: 'OPEN' | 'CLOSED'
  to?: string
  children: ReactNode
}

// tarjeta para espacios y solicitudes
function ItemCard({ title, status, to, children }: ItemCardProps) {
  const content = (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <StatusBadge status={status} />
      </div>
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className="block bg-white border border-gray-200 rounded p-4 hover:shadow">
        {content}
      </Link>
    )
  }

  return <div className="bg-white border border-gray-200 rounded p-4">{content}</div>
}

export default ItemCard

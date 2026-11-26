import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import type { Location } from '../types'

interface ItemCardProps {
  location: Location
}

function ItemCard({ location }: ItemCardProps) {
  return (
    <Link
      to={`/locations/${location.id}`}
      className="block bg-white border border-gray-200 rounded p-4 hover:shadow"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{location.name}</h2>
        <StatusBadge status={location.status} />
      </div>
      <p className="text-gray-600 text-sm">Edificio: {location.building}</p>
      <p className="text-gray-600 text-sm">Piso: {location.floor}</p>
    </Link>
  )
}

export default ItemCard

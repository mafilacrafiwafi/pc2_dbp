interface StatusBadgeProps {
  status: 'OPEN' | 'CLOSED'
}

// etiqueta de estado
function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'OPEN') {
    return <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded">Abierto</span>
  }
  return <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded">Cerrado</span>
}

export default StatusBadge

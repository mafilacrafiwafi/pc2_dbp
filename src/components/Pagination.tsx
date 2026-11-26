interface PaginationProps {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

// controles de paginacion
function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span>
        Pagina {page} de {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  )
}

export default Pagination

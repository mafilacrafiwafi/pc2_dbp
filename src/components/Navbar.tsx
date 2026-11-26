import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// barra de navegacion
function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  // cerrar sesion: borra el token y vuelve al login
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
      <span className="font-bold">AulaSoporte</span>
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="hover:underline">
          Espacios
        </Link>
        <Link to="/my-tickets" className="hover:underline">
          Mis solicitudes
        </Link>
        <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">
          Cerrar sesion
        </button>
      </div>
    </nav>
  )
}

export default Navbar

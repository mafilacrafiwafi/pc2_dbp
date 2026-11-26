import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'

// pagina de login
function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (email === '' || password === '') {
      setError('Ingresa tu correo y contrasena')
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Correo o contrasena incorrectos')
      } else if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message)
      } else {
        setError('No se pudo conectar con el servidor')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Iniciar sesion</h1>

        {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</p>}

        <FormField label="Correo" name="email" type="email" value={email} onChange={setEmail} />
        <FormField label="Contrasena" name="password" type="password" value={password} onChange={setPassword} />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>

        <p className="text-sm text-center mt-4">
          No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage

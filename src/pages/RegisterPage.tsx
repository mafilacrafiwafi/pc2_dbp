import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import FormField from '../components/FormField'
import { register } from '../api/services'

// pagina de registro
function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  // validaciones del formulario
  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {}
    if (name.trim() === '') {
      newErrors.name = 'El nombre es obligatorio'
    } else if (name.length > 100) {
      newErrors.name = 'El nombre debe tener hasta 100 caracteres'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresa un correo válido'
    }
    if (password.length < 8 || password.length > 72) {
      newErrors.password = 'La contraseña debe tener de 8 a 72 caracteres'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setApiError('')
    if (!validate()) return

    setLoading(true)
    try {
      await register({ name, email, password })
      navigate('/login')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setApiError(error.response.data.message)
      } else {
        setApiError('No se pudo conectar con el servidor')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>

        {apiError && <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{apiError}</p>}

        <FormField label="Nombre" name="name" value={name} onChange={setName} error={errors.name} />
        <FormField label="Correo" name="email" type="email" value={email} onChange={setEmail} error={errors.email} />
        <FormField label="Contraseña" name="password" type="password" value={password} onChange={setPassword} error={errors.password} />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage

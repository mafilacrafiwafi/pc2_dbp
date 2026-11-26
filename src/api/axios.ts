import axios from 'axios'

const api = axios.create({
  baseURL: 'https://aulasoporte-api.aaron-navarro.workers.dev/api',
  headers: { 'Content-Type': 'application/json' },
})

// agrega el token a cada peticion (misma clave y formato que useLocalStorage)
api.interceptors.request.use((config) => {
  const saved = localStorage.getItem('token')
  if (saved) {
    // si alteraron el token y ya no es JSON, se manda tal cual
    let token = saved
    try {
      token = JSON.parse(saved)
    } catch {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// si el token vence o es invalido, vuelve al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || ''
    if (error.response?.status === 401 && !url.includes('/auth/login')) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import * as services from '../api/services'

interface AuthContextType {
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useLocalStorage('token', null)

  const login = async (email: string, password: string) => {
    const data = await services.login({ email, password })
    setToken(data.token)
  }

  const logout = () => {
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

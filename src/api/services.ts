import api from './axios'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types'

// registro
export async function register(data: RegisterRequest) {
  const res = await api.post<RegisterResponse>('/auth/register', data)
  return res.data
}

// login
export async function login(data: LoginRequest) {
  const res = await api.post<LoginResponse>('/auth/login', data)
  return res.data
}

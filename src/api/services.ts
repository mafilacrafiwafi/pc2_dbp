import api from './axios'
import type { Location, LocationsPage, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, Ticket } from '../types'

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

export async function getLocations(page: number, size: number) {
  const res = await api.get<LocationsPage>('/locations', { params: { page, size } })
  return res.data
}

export async function getLocation(id: string) {
  const res = await api.get<Location>(`/locations/${id}`)
  return res.data
}

// crear solicitud para un espacio
export async function createTicket(id: string, description: string) {
  const res = await api.post<Ticket>(`/locations/${id}/tickets`, { description })
  return res.data
}

// solicitudes del usuario
export async function getMyTickets() {
  const res = await api.get<Ticket[]>('/me/tickets')
  return res.data
}

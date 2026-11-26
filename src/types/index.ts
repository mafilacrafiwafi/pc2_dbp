// tipos de la API

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  id: number
  name: string
  email: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface Location {
  id: number
  name: string
  building: string
  floor: number
  status: 'OPEN' | 'CLOSED'
  description: string
}

export interface LocationsPage {
  items: Location[]
  page: number
  size: number
  totalItems: number
  totalPages: number
}

export interface ApiError {
  code: string
  message: string
}

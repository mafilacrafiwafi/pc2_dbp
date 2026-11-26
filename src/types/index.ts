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

export interface ApiError {
  code: string
  message: string
}

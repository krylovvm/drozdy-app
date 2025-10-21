import { apiClient } from '@/shared/api/client'
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../model/types'

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/api/auth/register', data)

  return res.data
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/api/auth/login', data)

  return res.data
}

export async function getCurrentUser(): Promise<{ user: User }> {
  const res = await apiClient.get<{ user: User }>('/api/auth/me')

  return res.data
}

export async function logoutUser(): Promise<void> {
  await apiClient.post('/api/auth/logout')
}

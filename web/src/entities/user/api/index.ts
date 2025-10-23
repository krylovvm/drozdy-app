import { apiClient } from '@/shared/api/client'

import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../model/types'

const API_URL = '/api/auth'

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>(`${API_URL}/register`, data)

  return res.data
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>(`${API_URL}/login`, data)

  return res.data
}

export async function getCurrentUser(): Promise<{ user: User }> {
  const res = await apiClient.get<{ user: User }>(`${API_URL}/me`)

  return res.data
}

export async function logoutUser(): Promise<void> {
  await apiClient.post(`${API_URL}/logout`)
}

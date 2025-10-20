import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Handle auth errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

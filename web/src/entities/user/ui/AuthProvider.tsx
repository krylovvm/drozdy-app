import { createContext, ReactNode, useContext } from 'react'

import { useUser } from '../model'
import type { User } from '../model/types'

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useUser()
  const user = data?.user ?? null
  const isAuthenticated = Boolean(user)

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

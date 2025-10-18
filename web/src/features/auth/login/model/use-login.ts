import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { userApi } from '@/entities/user/api/user-api'
import { LoginRequest } from '@/entities/user/model/types'

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginRequest) => userApi.login(data),
    onSuccess: data => {
      localStorage.setItem('token', data.token)
      queryClient.setQueryData(['user'], { user: data.user })
      router.push('/')
    },
  })
}

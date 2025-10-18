import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { userApi } from '@/entities/user/api/user-api'
import { RegisterRequest } from '@/entities/user/model/types'

export const useRegister = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterRequest) => userApi.register(data),
    onSuccess: data => {
      localStorage.setItem('token', data.token)
      queryClient.setQueryData(['user'], { user: data.user })
      router.push('/')
    },
  })
}

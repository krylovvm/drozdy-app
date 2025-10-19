import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { LoginRequest, USER_QUERY_KEY } from '@/entities/user/'
import { userApi } from '@/entities/user/api'

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginRequest) => userApi.login(data),
    onSuccess: data => {
      localStorage.setItem('token', data.token)
      queryClient.setQueryData([USER_QUERY_KEY], { user: data.user })
      router.push('/')
    },
  })
}

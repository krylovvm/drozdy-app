import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { USER_QUERY_KEY, userApi } from '@/entities/user/'
import { RegisterRequest } from '@/entities/user/model/types'

export const useRegister = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterRequest) => userApi.register(data),
    onSuccess: data => {
      localStorage.setItem('token', data.token)
      queryClient.setQueryData([USER_QUERY_KEY], { user: data.user })
      router.push('/')
    },
  })
}

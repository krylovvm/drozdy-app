import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { LoginRequest, USER_QUERY_KEY, userApi } from '@/entities/user/'
import { PATHS } from '@/shared/config/paths'

export const useLogin = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginRequest) => userApi.login(data),
    onSuccess: data => {
      queryClient.setQueryData([USER_QUERY_KEY], { user: data.user })
      push(PATHS.PROFILE)
    },
  })
}

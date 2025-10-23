import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { registerUser, USER_QUERY_KEY } from '@/entities/user/'
import { RegisterRequest } from '@/entities/user/model/types'
import { PATHS } from '@/shared/config/paths'

export const useRegister = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterRequest) => registerUser(data),
    onSuccess: data => {
      queryClient.setQueryData([USER_QUERY_KEY], { user: data.user })
      push(PATHS.PROFILE)
    },
  })
}

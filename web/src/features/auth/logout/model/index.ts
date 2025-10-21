import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { USER_QUERY_KEY, logoutUser } from '@/entities/user/'
import { PATHS } from '@/shared/config/paths'

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      queryClient.setQueryData([USER_QUERY_KEY], null)
      router.push(PATHS.HOME)
    },
  })
}

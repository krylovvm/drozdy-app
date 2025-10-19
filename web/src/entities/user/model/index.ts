import { useQuery } from '@tanstack/react-query'

import { userApi } from '../api'

export const USER_QUERY_KEY = 'user'

export const useUser = () => {
  return useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: userApi.getMe,
    retry: false,
  })
}

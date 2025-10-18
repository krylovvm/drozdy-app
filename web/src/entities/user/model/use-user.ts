import { useQuery } from '@tanstack/react-query'
import { userApi } from '../api/user-api'

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: userApi.getMe,
    retry: false,
  })
}

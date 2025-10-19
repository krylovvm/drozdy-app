import { useInfiniteQuery } from '@tanstack/react-query'

import { listByUser } from '../api/'

export const POSTS_BY_USER_QUERY_KEY = 'user-posts'

export const useUserPosts = (username: string) =>
  useInfiniteQuery({
    queryKey: [POSTS_BY_USER_QUERY_KEY, username],
    queryFn: ({ pageParam }) =>
      listByUser(username, { cursor: pageParam as string | undefined, limit: 20 }),
    getNextPageParam: (lastPage: { nextCursor?: string }) => lastPage.nextCursor,
    initialPageParam: undefined,
  })

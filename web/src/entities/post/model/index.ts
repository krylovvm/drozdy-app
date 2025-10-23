import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { createPost, getPostsByUser } from '../api/'

export interface Post {
  id: string
  content: string
  createdAt: string
  userId: string
}

export interface PostsPage {
  items: Post[]
  nextCursor: string | null
}

export const POSTS_BY_USER_QUERY_KEY = 'user-posts'

export const useUserPosts = (username: string) =>
  useInfiniteQuery({
    queryKey: [POSTS_BY_USER_QUERY_KEY, username],
    queryFn: ({ pageParam }) =>
      getPostsByUser(username, { cursor: pageParam as string | undefined, limit: 10 }),
    getNextPageParam: (lastPage: PostsPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  })

export const useCreatePost = (username: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (content: string) => createPost(username, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_BY_USER_QUERY_KEY, username] })
    },
  })
}

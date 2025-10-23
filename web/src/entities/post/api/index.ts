import { apiClient } from '@/shared/api/client'

import type { PostsPage } from '../model/'

const API_USERS_URL = '/api/users'
const API_POSTS_URL = '/api/posts'

export const getPostsByUser = async (
  username: string,
  params: { limit?: number; cursor?: string }
): Promise<PostsPage> => {
  const res = await apiClient.get(`${API_USERS_URL}/${username}/posts`, { params })

  return res.data
}

export const createPost = async (username: string, content: string) => {
  const res = await apiClient.post(`${API_USERS_URL}/${username}/posts`, { content })

  return res.data
}

export const deletePost = async (postId: string) => {
  await apiClient.delete(`${API_POSTS_URL}/${postId}`)
}

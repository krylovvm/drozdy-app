import { apiClient } from '@/shared/api/client'

export const listByUser = async (username: string, params: { limit?: number; cursor?: string }) => {
  const res = await apiClient.get(`/api/users/${username}/posts`, { params })
  return res.data
}

export const createPost = async (username: string, content: string) => {
  const res = await apiClient.post(`/api/users/${username}/posts`, { content })
  return res.data
}

export const deletePost = async (postId: string) => {
  await apiClient.delete(`/api/posts/${postId}`)
}

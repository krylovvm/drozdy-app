export interface Post {
  id: string
  userId: string
  content: string
  createdAt: Date
}

export const posts: Post[] = []

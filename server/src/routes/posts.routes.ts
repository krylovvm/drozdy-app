import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { posts, Post } from '../models/post.model'
import { users } from '../models/user.model'
import { requireAuth } from '../middleware/auth.middleware'

const router = Router()

// Get posts by username (with pagination)
router.get('/users/:username/posts', (req: Request, res: Response) => {
  const { username } = req.params
  const { limit = 20, cursor } = req.query

  const user = users.find(u => u.name === username || u.email === username)
  if (!user) return res.status(404).json({ message: 'User not found' })

  let userPosts = posts.filter(p => p.userId === user.id)
  userPosts = userPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  let startIdx = 0
  if (cursor) {
    const idx = userPosts.findIndex(p => p.id === cursor)
    if (idx !== -1) startIdx = idx + 1
  }

  const items = userPosts.slice(startIdx, startIdx + Number(limit))
  const nextCursor = items.length === Number(limit) ? items[items.length - 1].id : null

  res.json({ items, nextCursor })
})

// Create post (auth required)
router.post('/users/:username/posts', requireAuth, (req: Request, res: Response) => {
  const { username } = req.params
  const { content } = req.body
  // TODO: fix any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (req as any).userId

  if (!content || typeof content !== 'string' || content.length < 1 || content.length > 280) {
    return res.status(400).json({ message: 'Content must be 1-280 characters' })
  }

  const user = users.find(u => u.id === userId)
  if (!user || (user.name !== username && user.email !== username)) {
    return res.status(403).json({ message: 'You can only post as yourself' })
  }

  // Cooldown: last post must be older than 3 seconds
  const lastPost = posts
    .filter(p => p.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
  if (lastPost && Date.now() - lastPost.createdAt.getTime() < 3000) {
    return res.status(429).json({ message: 'Wait 3 seconds between posts' })
  }

  const post: Post = {
    id: uuidv4(),
    userId,
    content,
    createdAt: new Date(),
  }
  posts.push(post)

  res.status(201).json(post)
})

// Delete post (auth required)
router.delete('/posts/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params
  // TODO: fix any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (req as any).userId

  const idx = posts.findIndex(p => p.id === id && p.userId === userId)
  if (idx === -1) return res.status(404).json({ message: 'Post not found or forbidden' })

  posts.splice(idx, 1)
  res.json({ message: 'Post deleted' })
})

export default router

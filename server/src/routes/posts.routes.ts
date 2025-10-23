import { Router, Request, Response } from 'express'
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware'
import { prisma } from '../prisma'
import { PostDTO } from '../models/post.model'

const router = Router()

// Get posts by username (with pagination)
router.get('/users/:username/posts', async (req: Request, res: Response) => {
  const { username } = req.params
  const { limit = 20, cursor } = req.query

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: username }, { email: username }],
    },
  })

  if (!user) return res.status(404).json({ message: 'User not found' })

  const take = Number(limit)
  const where = { userId: user.id }
  const orderBy = { createdAt: 'desc' as const }
  const cursorObj = cursor ? { id: String(cursor) } : undefined

  const posts: PostDTO[] = await prisma.post.findMany({
    where,
    orderBy,
    take,
    ...(cursorObj && { skip: 1, cursor: cursorObj }),
  })

  const nextCursor = posts.length === take ? posts[posts.length - 1].id : null

  res.json({ items: posts, nextCursor })
})

// Create post (auth required)
router.post('/users/:username/posts', requireAuth, async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest
  const { username } = authReq.params
  const { content } = authReq.body
  const userId = authReq.userId

  if (!content || typeof content !== 'string' || content.length < 1 || content.length > 280) {
    return res.status(400).json({ message: 'Content must be 1-280 characters' })
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      OR: [{ username: username }, { email: username }],
    },
  })
  if (!user) {
    return res.status(403).json({ message: 'You can only post as yourself' })
  }

  // Cooldown: last post must be older than 3 seconds
  const lastPost = await prisma.post.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
  if (lastPost && Date.now() - new Date(lastPost.createdAt).getTime() < 3000) {
    return res.status(429).json({ message: 'Wait 3 seconds between posts' })
  }

  const post: PostDTO = await prisma.post.create({
    data: {
      userId,
      content,
    },
  })

  res.status(201).json(post)
})

// Delete post (auth required)
router.delete('/posts/:id', requireAuth, async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest
  const { id } = authReq.params
  const userId = authReq.userId

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post || post.userId !== userId) {
    return res.status(404).json({ message: 'Post not found or forbidden' })
  }

  await prisma.post.delete({
    where: { id },
  })
  res.json({ message: 'Post deleted' })
})

export default router

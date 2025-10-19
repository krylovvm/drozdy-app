import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.util'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ message: 'Not authenticated' })

  try {
    const { userId } = verifyToken(token)
    // TODO: fix any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(req as any).userId = userId
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

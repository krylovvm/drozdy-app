import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { users, User, UserDTO } from '../models/user.model'
import { generateToken, verifyToken } from '../utils/jwt.util'

const router = Router()

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user: User = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    }

    users.push(user)

    // Generate token
    const token = generateToken(user.id)

    // Send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    const userDTO: UserDTO = {
      id: user.id,
      email: user.email,
      name: user.name,
    }

    res.status(201).json({ user: userDTO, token })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Find user
    const user = users.find(u => u.email === email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user.id)

    // Send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    const userDTO: UserDTO = {
      id: user.id,
      email: user.email,
      name: user.name,
    }

    res.json({ user: userDTO, token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get current user
router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    const { userId } = verifyToken(token)
    const user = users.find(u => u.id === userId)

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    const userDTO: UserDTO = {
      id: user.id,
      email: user.email,
      name: user.name,
    }

    res.json({ user: userDTO })
  } catch (error) {
    console.error('Me error:', error)
    res.status(401).json({ message: 'Invalid token' })
  }
})

// Logout
router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
})

export default router

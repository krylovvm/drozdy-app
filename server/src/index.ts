import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Drozdy API' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

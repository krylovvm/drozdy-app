'use client'

import { Alert, Box, Button, TextField } from '@mui/material'
import { AxiosError } from 'axios'
import { useState } from 'react'

import { useLogin } from '../model'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: login, isPending, error } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
  }

  const getErrorMessage = () => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || 'Login failed'
    }
    return 'Login failed'
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {getErrorMessage()}
        </Alert>
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        type="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={e => setEmail(e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isPending}
      >
        {isPending ? 'Signing In...' : 'Sign In'}
      </Button>
    </Box>
  )
}

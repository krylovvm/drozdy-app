'use client'

import { Alert,Box, Button, TextField } from '@mui/material'
import { AxiosError } from 'axios'
import { useState } from 'react'

import { useRegister } from '../model'

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: register, isPending, error } = useRegister()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    register({ name, email, password })
  }

  const getErrorMessage = () => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || 'Registration failed'
    }

    return 'Registration failed'
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
        label="Name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        type="email"
        autoComplete="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isPending}
      >
        {isPending ? 'Creating Account...' : 'Sign Up'}
      </Button>
    </Box>
  )
}

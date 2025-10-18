'use client'

import Link from 'next/link'
import { Container, Box, Typography, Paper } from '@mui/material'
import { LoginForm } from '@/features/auth/login/ui/login-form'

export function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>

          <LoginForm />

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link href="/register" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

'use client'

import Link from 'next/link'
import { Container, Box, Typography, Paper } from '@mui/material'
import { RegisterForm } from '@/features/auth/register/ui/register-form'

export function RegisterPage() {
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
            Sign Up
          </Typography>

          <RegisterForm />

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Already have an account? Sign In
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

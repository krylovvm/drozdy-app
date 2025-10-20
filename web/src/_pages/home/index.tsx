'use client'

import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/entities/user'
import { PATHS } from '@/shared/config/paths'

export function HomePage() {
  const { isLoading, isAuthenticated } = useAuth()

  const { push } = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      push(PATHS.PROFILE)
    }
  }, [isLoading, isAuthenticated, push])

  return (
    <Container sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Drozdy
          </Typography>
          <Typography gutterBottom>Share moments. Stay connected. Microblog your way.</Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Button component={NextLink} href={PATHS.LOGIN}>
              Login
            </Button>
            <Button component={NextLink} href={PATHS.REGISTER}>
              Register
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  )
}

'use client'

import { Container, Typography } from '@mui/material'
import { Box, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/entities/user/'
import { LogoutButton } from '@/features/auth/'
import { PostCreateForm } from '@/features/post/'
import { PATHS } from '@/shared/config/paths'
import { ProfileFeed } from '@/widgets/profile-feed/'

export function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth()

  const { push } = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      push(PATHS.HOME)
    }
  }, [isLoading, isAuthenticated, push])

  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container>
      <LogoutButton />
      <Typography variant="h2">{user?.username}</Typography>
      <PostCreateForm username={user?.username || ''} />
      <ProfileFeed username={user?.username || ''} />
    </Container>
  )
}

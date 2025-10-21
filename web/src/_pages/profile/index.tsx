'use client'

import { Container, Box, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/entities/user/'
import { PostCreateForm } from '@/features/post/'
import { PATHS } from '@/shared/config/paths'
import { Feed } from '@/widgets/feed'
import { ProfileHeader } from '@/widgets/profile-header'

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

  const username = user?.username || ''

  return (
    <Container sx={{ pb: 4 }}>
      <ProfileHeader username={username} />
      <PostCreateForm username={username} />
      <Feed username={username} />
    </Container>
  )
}

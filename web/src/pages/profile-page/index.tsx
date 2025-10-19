'use client'

import { Container, Typography } from '@mui/material'

import { useUser } from '@/entities/user/'
import { PostCreateForm } from '@/features/post/'
import { ProfileFeed } from '@/widgets/profile-feed/'

export function ProfilePage() {
  const { data, isLoading, error } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Profile not found</div>

  return (
    <Container>
      <Typography variant="h2">{data?.user.username}</Typography>
      <PostCreateForm username={data?.user.username || ''} />
      <ProfileFeed username={data?.user.username || ''} />
    </Container>
  )
}

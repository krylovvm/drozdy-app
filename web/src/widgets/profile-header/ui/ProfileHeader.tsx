'use client'

import { Avatar, Container, Stack, Typography } from '@mui/material'

import { LogoutButton } from '@/features/auth/'

export const ProfileHeader = ({ username }: { username: string }) => {
  return (
    <Container
      component="header"
      sx={{
        position: 'sticky',
        py: 2,
        mb: 2,
        top: 0,
        zIndex: 10,
        background: theme => theme.palette.background.default,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ width: 48, height: 48 }}>{username.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="h4">{username}</Typography>
        </Stack>
        <LogoutButton />
      </Stack>
    </Container>
  )
}

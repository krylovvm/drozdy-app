'use client'

import { Button } from '@mui/material'

import { useLogout } from '../model/'

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout()

  return (
    <Button variant="outlined" onClick={() => logout()} disabled={isPending}>
      Logout
    </Button>
  )
}

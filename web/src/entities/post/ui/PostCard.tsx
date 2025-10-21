'use client'

import { Card, CardContent, Typography } from '@mui/material'

export const PostCard = ({
  id,
  content,
  createdAt,
}: {
  id: string
  content: string
  createdAt: string
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {content}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  )
}

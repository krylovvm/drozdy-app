'use client'

import { Card, CardContent, Typography } from '@mui/material'
import { memo } from 'react'

export const PostCard = memo(({ content, createdAt }: { content: string; createdAt: string }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body1" sx={{ mb: 1, wordBreak: 'break-word' }}>
          {content}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  )
})

PostCard.displayName = 'PostCard'

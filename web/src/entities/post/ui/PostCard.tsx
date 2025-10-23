'use client'

import { DeleteOutlined } from '@mui/icons-material'
import { Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { memo } from 'react'

export const PostCard = memo(
  ({
    content,
    createdAt,
    onClickDelete,
  }: {
    content: string
    createdAt: string
    onClickDelete: () => void
  }) => {
    return (
      <Card
        variant="outlined"
        sx={{
          width: '100%',
        }}
      >
        <CardContent>
          <Typography variant="body1" sx={{ mb: 1, wordBreak: 'break-word' }}>
            {content}
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              {new Date(createdAt).toLocaleString()}
            </Typography>
            <IconButton
              size="small"
              className="delete-button"
              title="Delete post"
              aria-label="Delete post"
              aria-haspopup="dialog"
              onClick={onClickDelete}
            >
              <DeleteOutlined fontSize="small" />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    )
  }
)

PostCard.displayName = 'PostCard'

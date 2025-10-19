'use client'

import { Box, Button, CircularProgress, Paper, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { createPost, POSTS_BY_USER_QUERY_KEY } from '@/entities/post/'

export function PostCreateForm({ username }: { username: string }) {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (content: string) => createPost(username, content),
    onSuccess: () => {
      setContent('')
      queryClient.invalidateQueries({ queryKey: [POSTS_BY_USER_QUERY_KEY, username] })
    },
  })

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box
        component="form"
        onSubmit={e => {
          e.preventDefault()
          mutate(content)
        }}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="What's happening?"
          multiline
          minRows={3}
          maxRows={8}
          value={content}
          onChange={e => setContent(e.target.value)}
          slotProps={{ htmlInput: { maxLength: 280 } }}
          required
          variant="outlined"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
          <span style={{ color: content.length > 280 ? 'red' : 'inherit' }}>
            {content.length}/280
          </span>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending || !content.trim() || content.length > 280}
            endIcon={isPending ? <CircularProgress size={18} /> : null}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

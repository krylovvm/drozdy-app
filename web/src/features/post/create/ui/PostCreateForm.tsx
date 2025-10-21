'use client'

import { Box, Button, CircularProgress, Paper, TextField } from '@mui/material'
import { useState } from 'react'

import { useCreatePost } from '@/entities/post/'

export const PostCreateForm = ({ username }: { username: string }) => {
  const [content, setContent] = useState('')

  const { mutate: createPost, isPending } = useCreatePost(username)

  const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setContent('')
    createPost(content)
  }

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmitPost}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="What's happening?"
          multiline
          minRows={3}
          maxRows={8}
          value={content}
          onChange={handleChangeContent}
          slotProps={{ htmlInput: { maxLength: 280 } }}
          required
          variant="outlined"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
          <Box component="span" sx={{ color: content.length > 280 ? 'red' : 'inherit' }}>
            {content.length}/280
          </Box>
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

'use client'

import { Box, Button, CircularProgress, List, ListItem, Stack } from '@mui/material'
import { useState } from 'react'

import { PostCard, useUserPosts } from '@/entities/post/'
import { DeletePostDialog } from '@/features/post/'

export const Feed = ({ username }: { username: string }) => {
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean
    postId: string | null
  }>({ isOpen: false, postId: null })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUserPosts(username)
  const posts = data?.pages.flatMap(page => page.items) || []

  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    )
  }

  const handleDeletePost = (postId: string) => {
    setDeleteModalState({ isOpen: true, postId })
  }

  return (
    <>
      <List sx={{ pt: 0 }}>
        {posts.map(post => (
          <ListItem sx={{ px: 0 }} key={post.id}>
            <PostCard
              content={post.content}
              createdAt={post.createdAt}
              onClickDelete={() => handleDeletePost(post.id)}
            />
          </ListItem>
        ))}
      </List>
      {hasNextPage && (
        <Stack justifyContent="center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="contained"
            sx={{ mx: 'auto' }}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
        </Stack>
      )}
      <DeletePostDialog
        isOpen={deleteModalState.isOpen}
        onClose={() => setDeleteModalState({ isOpen: false, postId: null })}
        postId={deleteModalState.postId || ''}
        username={username}
      />
    </>
  )
}

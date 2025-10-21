'use client'

import { Box, Button, CircularProgress, Stack } from '@mui/material'
import { useUserPosts, PostCard } from '@/entities/post/'

export const Feed = ({ username }: { username: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUserPosts(username)

  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Stack spacing={2}>
      {data?.pages
        // TODO: fix any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .flatMap(page => (page as any).items)
        .map(post => (
          <PostCard key={post.id} id={post.id} content={post.content} createdAt={post.createdAt} />
        ))}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          variant="contained"
          sx={{ alignSelf: 'center', mt: 2 }}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </Stack>
  )
}

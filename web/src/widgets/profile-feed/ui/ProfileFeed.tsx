'use client'

import { Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material'

import { useUserPosts } from '@/entities/post/'

export function ProfileFeed({ username }: { username: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUserPosts(username)

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
          <Card key={post.id} variant="outlined">
            <CardContent>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {post.content}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(post.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          variant="contained"
          sx={{ alignSelf: 'center', mt: 2 }}
        >
          {isFetchingNextPage ? <CircularProgress size={20} /> : 'Load more'}
        </Button>
      )}
    </Stack>
  )
}

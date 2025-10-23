'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { useDeletePost } from '@/entities/post'

interface DeletePostDialogProps {
  isOpen: boolean
  onClose: () => void
  postId: string
  username: string
}

export const DeletePostDialog = ({ isOpen, onClose, postId, username }: DeletePostDialogProps) => {
  const { mutate: deletePost, isPending } = useDeletePost(username)

  const handleConfirm = () => {
    deletePost(postId, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this post? This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={handleConfirm} disabled={isPending}>
          {isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

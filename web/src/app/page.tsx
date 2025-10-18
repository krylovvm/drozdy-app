import { Box, Typography, Container } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Drozdy
        </Typography>
      </Box>
    </Container>
  )
}

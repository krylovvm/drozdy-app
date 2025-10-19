'use client'
import { useUser } from '@/entities/user/'

export function ProfilePage() {
  const { data, isLoading, error } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Profile not found</div>

  return (
    <div>
      <h2>{data?.user.name}</h2>
      {/* TODO: User posts */}
    </div>
  )
}

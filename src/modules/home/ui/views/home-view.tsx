'use client'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export const HomeView = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  if (!session) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div>
        <h1>Welcome {session.user?.name}</h1>
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: { onSuccess: () => router.push('/auth/sign-in') },
            })
          }
        >
          Sign Out
        </Button>
      </div>
    </>
  )
}

"use client"

import { FC, startTransition } from 'react'
import { Button } from './ui/Button'
import { useMutation } from '@tanstack/react-query'
import { SubscribeToSubredditPayload } from '@/lib/validators/community'
import axios, { AxiosError } from 'axios'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface SubscribeLeaveToggleProps {
  subredditId: string
  subredditName: string
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({subredditId, subredditName}) => {

    const isSubscribed = false
    const { loginToast } = useCustomToast()
    const router = useRouter()

    const {} = useMutation({
        mutationFn: async () => {
            const payload:SubscribeToSubredditPayload = {
              subredditId
            }

            const {data} = await axios.post('/api/community/subscribe', payload)
            return data as string
        },
        onError: (err: any) => {
          if(err instanceof AxiosError) {
            if(err.response?.status === 401) {
              return loginToast()
            }
          }
          
          return toast({
            title: 'There was a problem',
            description: 'Something went wrong, please try again.',
            variant: 'destructive',
          })
        },
        onSuccess: () => {
          startTransition(() => {
            router.refresh()
          })

          return toast({
            title: "Subscribed",
            description: `You are now subscribed to s/${subredditName}`
          })
        }
    }
    )

  return (
    isSubscribed ? (
        <Button variant={'destructive'} className='w-full mt-1 mb-4'>Leave Community</Button>
    ) : (
        <Button className='w-full mt-1 mb-4'>Join Community</Button>
    )
  )
}

export default SubscribeLeaveToggle

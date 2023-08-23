"use client"

import { FC } from 'react'
import { Button } from './ui/Button'
import { useMutation } from '@tanstack/react-query'
import { SubscribeToSubredditPayload } from '@/lib/validators/community'
import axios, { AxiosError } from 'axios'
import { useCustomToasts } from '@/hooks/use-custom-toast'
import { toast } from '@/hooks/use-toast'

interface SubscribeLeaveToggleProps {
  subredditId: string
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({subredditId}) => {

    const isSubscribed = false
    const { loginToast } = useCustomToasts()

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

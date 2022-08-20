import { useSession } from 'next-auth/react'
import React from 'react'
import Avatar from './avatar'

function postbox() {
    const { data: session} = useSession()
  return (
    <form>
        <div className='flex items-center space-x-3'>
            <Avatar />
            <input type='text' disabled={!session} className='flex-1 bg-blue-50 p-2 outline-none rounded-md' placeholder={session ? 'Start a conversation!' : 'Sign in to make a post'} />
        </div>
    </form>
  )
}

export default postbox
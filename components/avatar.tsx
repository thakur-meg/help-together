import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
type Props = {
    seed?: string
    large?: boolean
}
function avatar({seed, large}: Props) {
    const { data: session } = useSession() 
  return (
    <div className={`relative h-10 w-10 rounded-full overflow-hidden border-gray-300 bg-white ${large && 'h-20 w-20'}`}>
        <Image 
        layout='fill'
        src={`https://robohash.org/seeds${session?.user?.name || 'seeds'}/?set=set4`}/>
    </div>

  )
}

export default avatar
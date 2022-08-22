import React from 'react'
import Image from 'next/image'
import { MenuIcon, ChevronDownIcon, HomeIcon, SearchIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function navbar() {
    const { data: session } = useSession();

  return (
    <div className='flex px-4 py-2 shadow-sm sticky top-0 z-50 bg-white'>
        <Link href={'/'}>
        <div className='relative h-20 w-20 flex-shrink-1 cursor-pointer mr-3'>
            <Image src='/../public/img/logo.png' layout='fill' objectFit='contain'/>
        </div></Link>
        <div className='ml-5 flex items-center lg:hidden text-green-400'>
            <MenuIcon className='icon' />
        </div>

        {session ? (
            <div className='hidden lg:flex items-center p-2 border border-gray-100 cursor-pointer' onClick={() => signOut()}>
            <div>
            <p className='truncate text-green-700'>{session?.user?.name}</p>
            <p className='text-gray-400'>Logout</p>
            </div>
            <ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400'/>
        </div>
        ): (
            <div className='hidden lg:flex items-center p-2 border border-gray-100 cursor-pointer' onClick={() => signIn()}>
            <p className='text-green-700'>Sign In</p>
        </div>
        )}
        
    </div>
  )
}

export default navbar
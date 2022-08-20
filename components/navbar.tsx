import React from 'react'
import Image from 'next/image'
import { MenuIcon, ChevronDownIcon, HomeIcon, SearchIcon } from '@heroicons/react/solid'
import { StarIcon, BellIcon, PlusIcon, ChatIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'

function navbar() {
    const { data: session } = useSession();

  return (
    <div className='flex px-4 py-2 shadow-sm sticky top-0 z-50 bg-white'>
        <div className='relative h-10 w-10 flex-shrink-0 cursor-pointer mr-3'>
            <Image src='/../public/img/ht-logo.png' layout='fill' objectFit='contain'/>
        </div>
        <div className='flex xl:min-w-[300px] text-blue-500 items-center '>
            <HomeIcon className='h-5 w-5'/>
            <p className='ml-2 hidden flex-1 lg:inline'>Home</p>
            <ChevronDownIcon className='h-5 w-5'/>
        </div>
        <form className='flex flex-1 items-center space-x-2 rounded-sm border-gray-200 bg-blue-100 px-3 py-1'>
            <SearchIcon  className='h-6 w-6 text-blue-500'/>
            <input type='text' placeholder='Search' className='flex-1 bg-transparent outline-none'></input>
            <button type='submit' hidden/>
        </form>
        <div className='flex text-blue-400 hidden lg:inline-flex items-center space-x-2 '>
            <ChatIcon className='icon' />
            <BellIcon className='icon' />
            <PlusIcon className='icon' />
        </div>
        <div className='ml-5 flex items-center lg:hidden text-blue-500'>
            <MenuIcon className='icon' />
        </div>

        {session ? (
            <div className='hidden lg:flex items-center p-2 border-gray-100 cursor-pointer' onClick={() => signOut()}>
            <div>
            <p className='truncate text-blue-500'>{session?.user?.name}</p>
            <p className='text-gray-400'>Status</p>
            </div>
            <ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400'/>
        </div>
        ): (
            <div className='hidden lg:flex items-center p-2 border-gray-100 cursor-pointer' onClick={() => signIn()}>
            <p className='text-blue-500'>Sign In</p>
        </div>
        )}
        
    </div>
  )
}

export default navbar
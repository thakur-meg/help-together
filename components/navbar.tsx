import React from 'react'
import Image from 'next/image'
import { MenuIcon, ChevronDownIcon, HomeIcon, SearchIcon } from '@heroicons/react/solid'
import { StarIcon, BellIcon, PlusIcon, ChatIcon } from '@heroicons/react/outline'

function navbar() {
  return (
    <div className='flex px-4 py-2 shadow-sm sticky top-0 z-50'>
        <div className='relative h-10 w-10 flex-shrink-0 cursor-pointer'>
            <Image src='/../public/img/ht-logo.png' layout='fill' objectFit='contain'/>
        </div>
        <div className='flex items-center xl:min-w-[300px]'>
            <HomeIcon className='h-5 w-5'/>
            <p className='ml-2 hidden flex-1 lg:inline'>Home</p>
            <ChevronDownIcon className='h-5 w-5'/>
        </div>
        <form className='flex flex-1 items-center space-x-2 rounded-sm border-gray-200 bg-gray-100 px-3 py-1'>
            <SearchIcon  className='h-6 w-6 text-gray-400'/>
            <input type='text' placeholder='Search' className='flex-1 bg-transparent outline-none'></input>
            <button type='submit' hidden/>
        </form>
    </div>
  )
}

export default navbar
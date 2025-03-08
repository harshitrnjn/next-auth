"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {

    const router = useRouter();

    const buttonClick = () => {
        router.push('/profile')
    }

  return (
    <div className='w-full h-screen bg-black flex flex-col justify-center items-center'>
      <button 
      onClick={buttonClick}
      className='px-6 py-3 bg-green-700 text-white text-xl font-semibold rounded'>
        USER
      </button>
    </div>
  )
}

export default page

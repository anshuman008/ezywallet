import { Button } from '@/components/ui/button'
import { Text } from '@radix-ui/themes'
import React from 'react'

const page = () => {
  return (
    <div className=' h-screen flex justify-center items-center flex-col gap-y-20'>
 
      <span>Logo</span>

      <div className='flex flex-col justify-center items-center gap-y-5'>
        <Text className='text-5xl font-bold'>Welcome to Backpack</Text>
        <Text className='text-2xl font-bold'>Lets get started.</Text>
      </div>

      <div className='flex flex-col justify-center items-center gap-y-5'>
        <Button className='w-[300px]'>Create a new wallet</Button>
        <Button  className='w-[300px]'>Import Wallet</Button>
      </div>
 
    </div>
  )
}

export default page
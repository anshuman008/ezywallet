'use client'
import { useAppContext } from '@/context';
import Image from 'next/image'
import React from 'react'

const Page = () => {
  const {wallets, setWallets} = useAppContext();

  return (
    <div className='flex flex-col justify-center items-center h-full gap-y-20 px-4'>

      {/* header section  */}
      
      <div>
        {JSON.stringify(wallets)}
      </div>
      <div className='flex justify-between px-2 w-full'>
        <span className='p-3 rounded-full bg-red-300 text-red-500'>A1</span>
        <div className='grid grid-cols-3 justify-center items-center  bg-gray-500 rounded-full'>
          <div className='flex justify-center items-center'><Image src={'/sol.png'} alt='logo' width={50} height={50} /></div>
          <span className='border border-l-2 border-r-2 border-y-0 p-2 px-2 border-slate-400'>Wallet 1 🔽</span>
          <span className='text-center'>©️</span>
        </div>
        <span>expand</span>
      </div>


      {/* price section  */}

      <div className='flex flex-col gap-y-5 justify-center items-center'>

        <span className='text-6xl font-bold'>$0.00</span>

        <div className='flex gap-7'>
          <span className='text-2xl text-slate-500'>$0.00</span>
          <span className='text-2xl text-slate-500'>0%</span>
        </div>
      </div>


      {/* functions  */}
      <div className='flex gap-8 '>
        {
          ["Recieve", "Send", "Swap"].map((t, index) => <span className='flex flex-col w-[50px] justify-center items-center' key={index}>
            <span className='p-3 rounded-full text-center bg-gray-500'>⬆️</span>
            <span>{t}</span>
          </span>)
        }
      </div>


      {/* coins  */}

      <div className='flex  justify-between items-center w-full '>
        <div className='flex gap-3 justify-center items-center'>
          <div className='flex justify-center items-center'><Image src={'/sol.png'} alt='logo' width={100} height={100} /></div>

          <span className='flex flex-col gap-y-1'>
            <span>Etherium</span>
            <span>0.0 eth</span>
          </span>
        </div>


        <div>
          <div className='flex gap-7'>
            <span className='text-2xl text-slate-500'>$0.00</span>
            <span className='text-2xl text-slate-500'>0%</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Page
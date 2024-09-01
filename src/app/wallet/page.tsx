'use client'
import { useWalletStore } from '@/state/wallet';
import Image from 'next/image'
import React from 'react'
import { ChevronDownIcon, CopyIcon, ArrowBigUp, ArrowBigUpDash, ArrowBigUpIcon } from 'lucide-react'
const Page = () => {
  const { allWallets, setWallet } = useWalletStore();

  return (
    <div className='flex justify-center items-center'>

      <div className='flex flex-col justify-center items-center h-full gap-y-20 w-full md:w-[50%]'>
        {/* header section  */}

        {/* <div>
          {JSON.stringify(allWallets)}
        </div> */}
        <div className='grid grid-cols-3  items-start justify-between  md:px-2 w-full'>

          <div className='flex flex-col  items-center gap-y-2 py-2 h-[400px] w-[70px]  overflow-hidden'>
            <span className='p-3 text-center w-[50px] h-[50px] rounded-full bg-slate-600 cursor-pointer'>A1</span>

            <span className='p-3 text-center w-[50px] h-[50px] rounded-full bg-slate-600 cursor-pointer'>A2</span>
          </div>


          <div className='flex flex-col justify-center items-center gap-y-14'>


          <div className='flex justify-center items-center w-[200px] md:w-[250px] gap-x-1 px-2 bg-gray-500 rounded-full'>
            <div className='flex justify-center items-center size-14 p-2 rounded-full '><Image src={'/eth.png'} alt='logo' width={100} height={100} /></div>
            <span className='w-[150px] md:w-[200px] gap-x-2 border  flex  justify-center items-center border-x-2  border-y-0  border-slate-400'>
              <span className='text-sm md:text-lg font-bold text-center cursor-pointer'>Wallet 1</span>
              <ChevronDownIcon className='cursor-pointer' />
            </span>

            <span className='flex justify-center items-center h-[50px] w-[50px] overflow-hidden'>
              <CopyIcon className='cursor-pointer'/>
            </span>
          </div>

            {/* price section  */}



            <div className='flex flex-col gap-y-5 justify-center items-center w-full'>

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
                  <span className='p-3 rounded-full text-center bg-gray-500'><ArrowBigUpIcon /></span>
                  <span>{t}</span>
                </span>)
              }
            </div>

          </div>

      

          <span></span>
        </div>




        {/* coins  */}

        <div className='flex  justify-evenly gap-x-3 items-center w-full '>
          <div className='flex gap-3 justify-center items-center'>
            <div className='flex justify-center items-center'><Image src={'/eth.png'} alt='logo' width={50} height={50} /></div>

            <span className='flex flex-col gap-y-1'>
              <span>Etherium</span>
              <span>0.0 eth</span>
            </span>
          </div>


          <div>
            <div className='flex gap-2 md:gap-7'>
              <span className='text-xl md:text-2xl text-slate-500'>$0.00</span>
              <span className='text-xl md:text-2xl text-slate-500'>0%</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Page
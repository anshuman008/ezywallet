'use client'
import { Input } from '@/components/ui/input'
import { Heading } from '@radix-ui/themes'
import Image from 'next/image'
import React, { useState } from 'react'


const cryptos = [
    { name: "Etherium" },
    { name: "Solana" }
]
const page = () => {

    const [step, setStep] = useState(0);
    return (
        <div className=' h-screen flex flex-col gap-y-4 justify-center items-center dark:bg-[#0e0f14]'>
            {/* <SelectNetwor /> */}
            <WarningComp/>
            <div className='flex gap-x-3 px-3 w-[35%]'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>

                <span onClick={() => setStep((prev) => prev - 1)} className='cursor-pointer'>Back</span>
            </div>
        </div>
    )
}

export default page


const SelectNetwor = () => {
    return <div className='w-[35%] flex justify-center items-center flex-col gap-y-6'>

        <div className='flex flex-col justify-center items-center text-center gap-y-6'>
            <Heading className='text-4xl font-bold'>Select Network</Heading>
            <span className='text-2xl text-gray-500'>Backpack supports multiple blockchains. <br />
                Which do you want to use? You can add more later.
            </span>
        </div>


        <div className='w-full'>
            <Input placeholder='Search Network' className='w-full text-lg py-8 bg-[#202127]' />
        </div>

        <div className='w-full p-2 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            <Image src={'/sol.png'} height={100} width={100} alt='sol' />
            <span className='text-xl font-bold'>Solana</span>
        </div>

        <div className='w-full p-2 py-4 pl-10 gap-3 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            <Image src={'/eth.png'} height={50} width={50} alt='sol' />
            <span className='text-xl font-bold'>Etherium</span>
        </div>
    </div>
}



const WarningComp = () => {
    return <div className='w-[35%] flex justify-center items-center flex-col gap-y-6'>

        <div className='flex flex-col justify-center items-center text-center gap-y-6'>
            <Heading className='text-4xl font-bold'>Secret Recovery Phrase Warning</Heading>
            <span className='text-2xl text-gray-500'>
                On the next page, you will receive your secret <br /> recovery phrase.

            </span>
        </div>




        <div className='w-full p-2 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            <span className='text-xl font-bold'>This is the ONLY way to recover your account if you lose access to your device or password.
            </span>
        </div>

        <div className='w-full p-2 py-4 pl-10 gap-3 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            {/* <Image src={'/eth.png'} height={50} width={50} alt='sol' /> */}
            <span className='text-xl font-bold'>Write it down, store it in a safe place, and NEVER share it with anyone.


            </span>
        </div>
    </div>
}



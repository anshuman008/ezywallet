'use client'
import { Heading } from "@radix-ui/themes"
import { Input } from "../ui/input"
import Image from 'next/image'

const SelectNetwork = ({ step, setStep, setNetwork }) => {
    return <div className='px-2 md:!px-0 md:w-[35%] flex justify-center items-center flex-col gap-y-6'>

        <div className='flex flex-col justify-center items-center text-center gap-y-6'>
            <Heading className='text-4xl font-bold'>Select Network</Heading>
            <span className='text-2xl text-gray-500'>Backpack supports multiple blockchains. <br />
                Which do you want to use? You can add more later.
            </span>
        </div>


        <div className='w-full'>
            <Input placeholder='Search Network' className='w-full text-lg py-8 bg-[#202127]' />
        </div>

        <div onClick={() => { setNetwork('solana'), setStep((prev:any) => prev + 1) }} className='w-full p-2 rounded-lg bg-[#202127] flex items-center cursor-pointer gap-x-3 px-3'>
            <Image src={'/solana.png'} height={50} width={50} alt='sol' />
            <span className='text-xl font-bold'>Solana</span>
        </div>

        <div onClick={() => { setNetwork('etherium'), setStep((prev) => prev + 1) }} className='w-full p-2 rounded-lg bg-[#202127] flex items-center cursor-pointer gap-x-3 px-3'>
            <Image src={'/ethereum.png'} height={50} width={50} alt='sol' />
            <span className='text-xl font-bold'>Etherium</span>
        </div>
    </div>
}


export default SelectNetwork;
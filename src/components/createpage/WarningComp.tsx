'use client'
import { Heading } from "@radix-ui/themes";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

const WarningComp = ({ step, setStep }) => {

    const [checked, setChecked] = useState(false);
    return <div className='px-2 md:!px-0 md:w-[35%]  flex justify-center items-center flex-col gap-y-6'>

        <div className='flex flex-col justify-center items-center text-center gap-y-6'>
            <Heading className='text-4xl font-bold'>Secret Recovery Phrase Warning</Heading>
            <span className='text-2xl text-gray-500'>
                On the next page, you will receive your secret <br /> recovery phrase.
            </span>
        </div>




        <div className='w-full p-2 py-4 pl-10 gap-3 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
            <span className='text-lg text-gray-500 font-bold'>This is the ONLY way to recover your account if you lose access to your device or password.
            </span>
        </div>

        <div className='w-full p-2 py-4 pl-10 gap-3 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            {/* <Image src={'/ethereum.png'} height={50} width={50} alt='sol' /> */}


            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-500">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
            </svg>

            <span className='text-lg text-gray-500 font-bold'>Write it down, store it in a safe place, and NEVER share it with anyone.


            </span>
        </div>


        <div className='flex gap-2 p-3 justify-center items-start rounded-lg hover:text-gray-300'>
            <Checkbox className='size-5 mt-2' onCheckedChange={() => setChecked((prev) => !prev)} />
            <span className='font-bold'>I understand that I am responsible for saving my,
                secret recovery phrase, and that it is the only way,
                to recover my wallet.</span>
        </div>


        <Button onClick={() => setStep((prev) => prev + 1)} className={`text-lg px-10}`} disabled={!checked} >Next</Button>
    </div>
}


export default WarningComp;
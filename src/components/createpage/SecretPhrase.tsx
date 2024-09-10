'use client'
import { Heading } from "@radix-ui/themes";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

const SecretPharas = ({ mnemonicWords, step, setStep }) => {

    const [isCopied, setIsCopied] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleCopy = () => {
        const wordsToCopy = mnemonicWords.join(" ");
        navigator.clipboard.writeText(wordsToCopy)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 3000)
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return <div className='px-2 md:!px-0 md:w-[35%]  flex justify-center items-center flex-col gap-y-6'>

        <div className='flex flex-col justify-center items-center text-center gap-y-6'>
            <Heading className=' text-2xl md:text-4xl font-bold'>Secret Recovery Phrase</Heading>
            <span className=' text-xl md:text-2xl text-gray-500'>
                Save these words in a safe place.
            </span>

            <span className='text-blue-500 font-bold cursor-pointer'>Read the warning again</span>
        </div>




        <div className='flex justify-center items-center flex-col gap-y-2 w-full bg-[#202127] p-2 rounded-lg hover:bg-slate-800 cursor-pointer' onClick={handleCopy}>


            <div className='w-full p-1 md:p-2 md:py-4 md:pl-10  rounded-lg  grid grid-cols-3 gap-y-6 gap-x-5  md:gap-x-10 md:gap-y-10'>
                {/* <Image src={'/ethereum.png'} height={50} width={50} alt='sol' /> */}


                {mnemonicWords?.map((wd: string, index: number) => (<span key={index} className=' font-bold'>{index + 1}. {wd}</span>))}

            </div>

            <span>{isCopied ? 'Copied!!' : 'Click anywhere in card to copy!!'} </span>
        </div>




        <div className='flex gap-2 p-3 justify-center text-gray-500 items-center rounded-lg hover:text-gray-300'>
            <Checkbox className='size-5 'onCheckedChange={() => setChecked((prev) => !prev)} />
            <span className='font-bold'>I saved my recovery phrase</span>
        </div>

        <Button className='text-lg px-10' disabled={!checked} onClick={()=>setStep((prev)=>prev+1)}>Next</Button>
    </div>
}


export default SecretPharas;
'use client'
import { Input } from '@/components/ui/input'
import { Heading } from '@radix-ui/themes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


const cryptos = [
    { name: "Etherium" },
    { name: "Solana" }
]
const page = () => {

    const [step, setStep] = useState(0);
    return (
        <div className=' h-screen flex flex-col gap-y-4 justify-center items-center dark:bg-[#0e0f14]'>
            {/* <SelectNetwor /> */}
            {/* <Method/> */}
            <Secret/>
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
    return <div className='w-[30%] flex justify-center items-center flex-col gap-y-6'>

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
            <Image src={'/solana.png'} height={100} width={100} alt='sol' />
            <span className='text-xl font-bold'>Solana</span>
        </div>

        <div className='w-full p-2 py-4 pl-10 gap-3 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            <Image src={'/ethereum.png'} height={50} width={50} alt='sol' />
            <span className='text-xl font-bold'>Etherium</span>
        </div>
    </div>
}



const Method = () => {
    return <div className='w-[35%] flex justify-center items-center flex-col gap-y-6'>

        <div className='flex flex-col justify-center items-center text-center gap-y-6'>
            <Heading className='text-4xl font-bold'>Import your Wallet(s)</Heading>
            <span className='text-2xl text-gray-500'>
            Choose a method to import your wallet.
            </span>
        </div>
        <div className='w-full p-2 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className='text-xl ml-4 font-bold'>Import secret recovery phrase</span>
        </div>
    </div>
}
const Secret = () => {
    const [length, setLength] = useState(24);
    const [displayseed, setDisplaySeed] = useState(24);
    const [isDisabled, setIsDisabled] = useState(true);
    const [mnemonics, setMnemonics] = useState(Array(12).fill('')); 

    const toggleLength = () => {
        if (length === 12) {
            setLength(24);
            setMnemonics(Array(12).fill('')); 
        } else {
            setLength(12);
            setMnemonics(Array(24).fill('')); 
        }
        setDisplaySeed(length === 12 ? 24 : 12);
    };

   
    const handlePaste = (e:any, index:any) => {
        e.preventDefault(); 
        const pastedData = e.clipboardData.getData('text'); 
        const words = pastedData.trim().split(' '); 
        // console.log(words);
        const actualLenght = length===12?24:12;

        if (words.length <= actualLenght) {
            const updatedMnemonics = [...mnemonics];
            words.forEach((word:any, idx:any) => {
                if (idx < actualLenght) {
                    updatedMnemonics[idx] = word;
                }
            });
            setMnemonics(updatedMnemonics); 
        } else {
            alert("Pasted data exceeds the number of available input boxes.");
        }
    };

    const handleChange = (index:any, value:any) => {
        const updatedMnemonics = [...mnemonics];
        updatedMnemonics[index] = value;
        setMnemonics(updatedMnemonics);
    };

   
    useEffect(() => {
        const allFilled = mnemonics.every(word => word.trim().length>2);
        setIsDisabled(!allFilled); 
    }, [mnemonics]);

    
    const importwallet = () => {
        localStorage.setItem('mnemonic', mnemonics.join(' ')); 
    };

    return (
        <div className='min-h-screen w-full bg-black flex flex-col items-center text-white justify-center'>
            <div className='flex gap-2 mt-4 flex-col justify-center text-center'>
                <h1 className='text-3xl md:text-4xl font-bold'>Secret Recovery Phrase</h1>
                <p className='text-gray-400 text-sm md:text-base'>Enter or paste your 12 or 24 word phrase.</p>
                <h1 onClick={toggleLength} className='text-sm md:text-lg hover:text-blue-600 font-bold cursor-pointer text-blue-500'>
                    Use {displayseed} words
                </h1>
            </div>

            <div className={`flex mt-5 flex-row overflow-y-scroll hide-scrollbar ${length === 24 ? 'min-h-[20%]' :'min-h-[40%]'} flex-wrap w-[90%] md:w-[70%] lg:w-[50%] justify-center gap-2`}>
                {mnemonics.map((word, index) => (
                    <div key={index} className='bg-slate-800 flex items-center flex-row h-10 rounded-md p-2 w-full sm:w-[48%] md:w-[30%] lg:w-[22%]'>
                        <span className='w-5'>{index + 1}</span>
                        <input
                            type="text"
                            value={word}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onPaste={(e) => handlePaste(e, index)}
                            className="bg-slate-800 block focus:outline-none w-full h-10 p-2 rounded"
                        />
                    </div>
                ))}
            </div>

            <button
                disabled={isDisabled}
                onClick={importwallet}
                className={` ${isDisabled ? 'bg-gray-600 hover:cursor-not-allowed' : 'cursor-pointer bg-white'} mt-8 font-medium text-black h-10 rounded-md w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20%]`}>
                Import Wallet
            </button>
        </div>
    );
}



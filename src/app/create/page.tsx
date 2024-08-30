'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Heading } from '@radix-ui/themes'
import { Keypair } from '@solana/web3.js'
import { mnemonicToSeedSync } from 'bip39'
import { derivePath } from 'ed25519-hd-key'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import nacl from 'tweetnacl'
import bs58 from "bs58";


const cryptos = [
    { name: "Etherium" },
    { name: "Solana" }
]
const wordList = [
    "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
    "absurd", "abuse", "access", "accident"
];


const page = () => {

    const [step, setStep] = useState(0);
    const [network,setNetwork] = useState('');

    const genrateSolWallet = ( mnemonic: string,accountIndex: number) =>{
        try{
          const seedBuffer = mnemonicToSeedSync(mnemonic);
    
          const path = `m/44'/501'/${accountIndex}'/0'`; 
          const { key: derivedSeed } = derivePath(path, seedBuffer.toString("hex"));
          let publicKeyEncoded: string;
          let privateKeyEncoded: string;
      
          const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
          const keypair = Keypair.fromSecretKey(secretKey);
      
          privateKeyEncoded = bs58.encode(secretKey);
          publicKeyEncoded = keypair.publicKey.toBase58();
      
    
          return {solPrivateKeyEncoded:privateKeyEncoded,solPublicKeyEncoded:publicKeyEncoded}
        }catch (error) {
          toast.error("Failed to generate wallet. Please try again.");
          return null;
        }
        
      }

    useEffect(()=>{
     
    },[step])

    return (
        <div className=' h-screen flex flex-col gap-y-4 justify-center items-center dark:bg-[#0e0f14]'>

            {
                step === 0 ? <SelectNetwor step={step} setStep={setStep} setNetwork={setNetwork} /> : step === 1 ? <WarningComp step={step} setStep={setStep} /> : step === 2 ? <SecretPharas step={step} setStep={setStep} /> : <PasswordComp step={step} setStep={setStep} />

            }



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


const SelectNetwor = ({step,setStep,setNetwork}) => {
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

        <div onClick={()=>{setNetwork('solana'), setStep((prev)=>prev+1)}} className='w-full p-2 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            <Image src={'/sol.png'} height={100} width={100} alt='sol' />
            <span className='text-xl font-bold'>Solana</span>
        </div>

        <div  onClick={()=>{setNetwork('etherium'), setStep((prev)=>prev+1)}}className='w-full p-2 py-4 pl-10 gap-3 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            <Image src={'/eth.png'} height={50} width={50} alt='sol' />
            <span className='text-xl font-bold'>Etherium</span>
        </div>
    </div>
}



const WarningComp = ({step,setStep}) => {

    const [checked,setChecked] = useState(false);
    return <div className='w-[35%] flex justify-center items-center flex-col gap-y-6'>

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
            {/* <Image src={'/eth.png'} height={50} width={50} alt='sol' /> */}


            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-500">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
            </svg>

            <span className='text-lg text-gray-500 font-bold'>Write it down, store it in a safe place, and NEVER share it with anyone.


            </span>
        </div>


        <div className='flex gap-2 p-3 justify-center items-start rounded-lg hover:text-gray-300'>
            <Checkbox className='size-5 mt-2' onCheckedChange={()=>setChecked((prev) => !prev)} />
            <span className='font-bold'>I understand that I am responsible for saving my,
                secret recovery phrase, and that it is the only way,
                to recover my wallet.</span>
        </div>


        <Button onClick={()=>setStep((prev) => prev+1)} className={`text-lg px-10 ${checked?'bg-green-500 text-white':'bg-gray-500'}`} disabled={!checked} >Next</Button>
    </div>
}


const SecretPharas = () => {

    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {

        const wordsToCopy = wordList.join(' ');
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

    return <div className='w-[35%] flex justify-center items-center flex-col gap-y-6'>

        <div className='flex flex-col justify-center items-center text-center gap-y-6'>
            <Heading className='text-4xl font-bold'>Secret Recovery Phrase</Heading>
            <span className='text-2xl text-gray-500'>
                Save these words in a safe place.
            </span>

            <span className='text-blue-500 font-bold cursor-pointer'>Read the warning again</span>
        </div>




        <div className='flex justify-center items-center flex-col gap-y-2 w-full bg-[#202127] p-2 rounded-lg hover:bg-slate-800 cursor-pointer' onClick={handleCopy}>


            <div className='w-full p-2 py-4 pl-10  rounded-lg  grid grid-cols-3 gap-10'>
                {/* <Image src={'/eth.png'} height={50} width={50} alt='sol' /> */}


                {wordList.map((wd, index) => (<span className=' font-bold'>{index + 1}. {wd}</span>))}

            </div>

            <span>{isCopied ? 'Copied!!' : 'Click anywhere in card to copy!!'} </span>
        </div>




        <div className='flex gap-2 p-3 justify-center text-gray-500 items-center rounded-lg hover:text-gray-300'>
            <Checkbox className='size-5 ' />
            <span className='font-bold'>I saved my recovery phrase</span>
        </div>

        <Button className='text-lg px-10'>Next</Button>
    </div>
}

const PasswordComp = () => {

    const [passVisible, setPassVisible] = useState(false);
    return <div className='w-[35%] flex justify-center items-center flex-col gap-y-6'>

        <div className='flex flex-col justify-center items-center text-center gap-y-6'>
            <Heading className='text-4xl font-bold'>Create a Password</Heading>
            <span className='text-2xl text-gray-500'>
                It should be at least 8 characters.
                <br /> You’ll need this to unlock Backpack.
            </span>
        </div>

        <div className='w-full flex justify-center items-center bg-[#202127] pr-3'>
            <Input placeholder='Password' className='w-full text-lg py-8 bg-[#202127] focus-visible:ring-0 ' type={passVisible ? 'text' : 'password'} />



            {
                passVisible ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer" onClick={() => setPassVisible(!passVisible)}>
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer" onClick={() => setPassVisible(!passVisible)}>
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                </svg>


            }

        </div>

        <div className='w-full'>
            <Input placeholder='Confirm Passwrod' className='w-full text-lg py-8 bg-[#202127]' />
        </div>



        <div className='flex gap-2 p-3 justify-center items-center rounded-lg hover:text-gray-300'>
            <Checkbox className='size-5 ' />
            <span className='font-bold'>I agree to the <span className='text-blue-500'>Term of Services</span>
            </span>
        </div>
        <Button className='text-lg px-10'>Next</Button>
    </div>
}
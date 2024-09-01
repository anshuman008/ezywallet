'use client'
import { generateMnemonic } from 'bip39'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import SelectNetwork from '@/components/createpage/SelectNetwork'
import WarningComp from '@/components/createpage/WarningComp'
import PasswordComp from '@/components/createpage/PasswordComp'
import SecretPharas from '@/components/createpage/SecretPhrase'
import { genrateEthWallet,genrateSolWallet } from '@/lib/WalletsFunctions'
import { useAppContext } from '@/context'


interface Wallet {
    publicKey: string;
    privateKey: string;
    mnemonic: string;
    path: string;
    blockchain: string
}

const Page = () => {

    const {wallets, setWallets} = useAppContext();
    
    const [step, setStep] = useState(0);
    const [network, setNetwork] = useState('');
    const [mnemonicWords, setMnemonicWords] = useState<string[]>(
        Array(12).fill(" ")
    );
    // const [wallets, setWallets] = useState<Wallet[]>([]);


    useEffect(() => {
        console.log('updated wallet', wallets)
    }, [wallets])

    useEffect(() => {
        if (step === 2) {
            const mnemonic = generateMnemonic();
            const words = mnemonic.split(" ");
            setMnemonicWords(words);
        network === "solana"?genrateSolWallet(mnemonic, wallets.length,setWallets): genrateEthWallet(mnemonic, wallets.length,setWallets);


        }
    }, [step])
  
    return (
        <div className=' h-screen flex flex-col gap-y-4 justify-center items-center dark:bg-[#0e0f14]'>

            {
                step === 0 ? <SelectNetwork step={step} setStep={setStep} setNetwork={setNetwork} /> : step === 1 ? <WarningComp step={step} setStep={setStep} /> : step === 2 ? <SecretPharas mnemonicWords={mnemonicWords} step={step} setStep={setStep} /> : <PasswordComp setStep={setStep} />

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

export default Page


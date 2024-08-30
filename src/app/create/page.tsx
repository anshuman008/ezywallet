'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Heading } from '@radix-ui/themes'
import { Keypair } from '@solana/web3.js'
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from 'bip39'
import { derivePath } from 'ed25519-hd-key'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import nacl from 'tweetnacl'
import bs58 from "bs58";
import { ethers } from 'ethers'
import { CloseEye, OpenEye } from '@/utils/Icons'

interface Wallet {
    publicKey: string;
    privateKey: string;
    mnemonic: string;
    path: string;
    blockchain: string
}

const Page = () => {

    const [step, setStep] = useState(0);
    const [network, setNetwork] = useState('');
    const [mnemonicWords, setMnemonicWords] = useState<string[]>(
        Array(12).fill(" ")
    );
    const [wallets, setWallets] = useState<Wallet[]>([]);


    const genrateSolWallet = (mnemonic: string, accountIndex: number) => {
        try {
            const seedBuffer = mnemonicToSeedSync(mnemonic);

            const path = `m/44'/501'/${accountIndex}'/0'`;
            const { key: derivedSeed } = derivePath(path, seedBuffer.toString("hex"));
            let publicKeyEncoded: string;
            let privateKeyEncoded: string;

            const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
            const keypair = Keypair.fromSecretKey(secretKey);

            privateKeyEncoded = bs58.encode(secretKey);
            publicKeyEncoded = keypair.publicKey.toBase58();

            const newwallet = {
                publicKey: publicKeyEncoded,
                privateKey: privateKeyEncoded,
                mnemonic: mnemonic,
                path: path,
                blockchain: "solana"
            }

            setWallets([...wallets, newwallet]);

            console.log('wallet genrated succesfully!!')
        } catch (error) {
            toast.error("Failed to generate wallet. Please try again.");
            return null;
        }

    }


    const genrateEthWallet = (mnemonic: string, accountIndex: number) => {
        try {
            const seedBuffer = mnemonicToSeedSync(mnemonic);

            const path = `m/44'/501'/${accountIndex}'/0'`;
            const { key: derivedSeed } = derivePath(path, seedBuffer.toString("hex"));
            let publicKeyEncoded: string;
            let privateKeyEncoded: string;

            const privateKey = Buffer.from(derivedSeed).toString("hex");
            privateKeyEncoded = privateKey;

            const wallet = new ethers.Wallet(privateKey);
            publicKeyEncoded = wallet.address;


            const newwallet = {
                publicKey: publicKeyEncoded,
                privateKey: privateKeyEncoded,
                mnemonic: mnemonic,
                path: path,
                blockchain: "eitherium"
            }

            setWallets([...wallets, newwallet]);
            console.log('wallet genrated sucessfully!!')
        } catch (error) {
            toast.error("Failed to generate wallet. Please try again.");
            return null;
        }
    }

    useEffect(() => {
        console.log('updated wallet', wallets)
    }, [wallets])

    useEffect(() => {
        if (step === 2) {
            const mnemonic = generateMnemonic();
            const words = mnemonic.split(" ");
            setMnemonicWords(words);
            network === "solana"?genrateSolWallet(mnemonic, wallets.length): genrateEthWallet(mnemonic, wallets.length);
        }
    }, [step])

    return (
        <div className=' h-screen flex flex-col gap-y-4 justify-center items-center dark:bg-[#0e0f14]'>

            {
                step === 0 ? <SelectNetwor step={step} setStep={setStep} setNetwork={setNetwork} /> : step === 1 ? <WarningComp step={step} setStep={setStep} /> : step === 2 ? <SecretPharas mnemonicWords={mnemonicWords} step={step} setStep={setStep} /> : <PasswordComp step={step} setStep={setStep} />

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


const SelectNetwor = ({ step, setStep, setNetwork }) => {
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

        <div onClick={() => { setNetwork('solana'), setStep((prev) => prev + 1) }} className='w-full p-2 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            <Image src={'/sol.png'} height={100} width={100} alt='sol' />
            <span className='text-xl font-bold'>Solana</span>
        </div>

        <div onClick={() => { setNetwork('etherium'), setStep((prev) => prev + 1) }} className='w-full p-2 py-4 pl-10 gap-3 rounded-lg bg-[#202127] flex items-center cursor-pointer'>
            <Image src={'/eth.png'} height={50} width={50} alt='sol' />
            <span className='text-xl font-bold'>Etherium</span>
        </div>
    </div>
}



const WarningComp = ({ step, setStep }) => {

    const [checked, setChecked] = useState(false);
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
            <Checkbox className='size-5 mt-2' onCheckedChange={() => setChecked((prev) => !prev)} />
            <span className='font-bold'>I understand that I am responsible for saving my,
                secret recovery phrase, and that it is the only way,
                to recover my wallet.</span>
        </div>


        <Button onClick={() => setStep((prev) => prev + 1)} className={`text-lg px-10}`} disabled={!checked} >Next</Button>
    </div>
}


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

// const PasswordComp = () => {

//     const [passVisible, setPassVisible] = useState(false);
//     return <div className='w-[35%] flex justify-center items-center flex-col gap-y-6'>

//         <div className='flex flex-col justify-center items-center text-center gap-y-6'>
//             <Heading className='text-4xl font-bold'>Create a Password</Heading>
//             <span className='text-2xl text-gray-500'>
//                 It should be at least 8 characters.
//                 <br /> You’ll need this to unlock Backpack.
//             </span>
//         </div>

//         <div className='w-full flex justify-center items-center bg-[#202127] pr-3'>
//             <Input placeholder='Password'minLength={8}  className='w-full text-lg py-8 bg-[#202127] focus-visible:ring-0 ' type={passVisible ? 'password' : 'text'} />
//             {
//                 passVisible ? <span onClick={()=>setPassVisible(false)}><OpenEye /></span> : <span onClick={()=>setPassVisible(true)}><CloseEye/></span>
//             }

//         </div>

//         <div className='w-full'>
//             <Input placeholder='Confirm Passwrod' minLength={8} className='w-full text-lg py-8 bg-[#202127]' />
//         </div>

//         <div className='flex gap-2 p-3 justify-center items-center rounded-lg hover:text-gray-300'>
//             <Checkbox className='size-5 ' />
//             <span className='font-bold'>I agree to the <span className='text-blue-500'>Term of Services</span>
//             </span>
//         </div>
//         <Button className='text-lg px-10'>Next</Button>
//     </div>
// }

const PasswordComp = () => {
    const [passVisible, setPassVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isButtonDisabled = password.length < 8 || password !== confirmPassword;

    return (
        <div className='w-[35%] flex justify-center items-center flex-col gap-y-6'>

            <div className='flex flex-col justify-center items-center text-center gap-y-6'>
                <Heading className='text-4xl font-bold'>Create a Password</Heading>
                <span className='text-2xl text-gray-500'>
                    It should be at least 8 characters.
                    <br /> You’ll need this to unlock Backpack.
                </span>
            </div>

            <div className='w-full flex justify-center items-center bg-[#202127] pr-3'>
                <Input 
                    placeholder='Password' 
                    minLength={8}  
                    className='w-full text-lg py-8 bg-[#202127] focus-visible:ring-0' 
                    type={passVisible ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                    passVisible 
                    ? <span onClick={() => setPassVisible(false)}><OpenEye /></span> 
                    : <span onClick={() => setPassVisible(true)}><CloseEye /></span>
                }
            </div>

            <div className='w-full'>
                <Input 
                    placeholder='Confirm Password' 
                    minLength={8} 
                    className='w-full text-lg py-8 bg-[#202127]' 
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className='flex gap-2 p-3 justify-center items-center rounded-lg hover:text-gray-300'>
                <Checkbox className='size-5' />
                <span className='font-bold'>I agree to the <span className='text-blue-500'>Term of Services</span></span>
            </div>

            <Button className={`text-lg px-10 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isButtonDisabled}>
                Next
            </Button>
        </div>
    );
};
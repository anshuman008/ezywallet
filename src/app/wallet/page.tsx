'use client'
import { useWalletStore } from '@/state/wallet';
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import { ChevronDownIcon, CopyIcon, ArrowBigUpDash, ArrowBigUpIcon, PlusCircleIcon, PlusIcon, Check } from 'lucide-react'
import { addEthWallet, addSolWallet } from '@/lib/WalletsFunctions'

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';


const Page = () => {

  const router = useRouter();


  const { allvaults, setVault, setWallet } = useWalletStore()
  const [optionModel, setOptionModel] = useState(false);
  const [network, setNetwrok] = useState(allvaults[0]?.solwallets.length ? 'solana' : 'ethereum')

  const [allwallets, setAllwallets] = useState(allvaults[0]?.solwallets.length ? allvaults[0].solwallets : allvaults[0].ethwallets);

  const [walletModel, setWalletModel] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(0);
  const [isCopied,setIsCopied] = useState(false);
   
  const [noWallets,setNoWallets] = useState(false);
  console.log(allvaults, 'this is the all vauylts')
  console.log(allvaults[0]?.accountId, 'this is the sol')

  const handleCopy = (data:string) => {
    const wordsToCopy = data;
    navigator.clipboard.writeText(wordsToCopy)
        .then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000)
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
  };
 



   useEffect(() => {

    // if (!allvaults.length) {
    //   router.push('/dashboard');
    // }

      if(network === 'solana' && !allvaults[0].solwallets.length){
        setNoWallets(true);
      }else if(network === 'ethereum' && !allvaults[0].ethwallets.length){
        setNoWallets(true);
      }


      if(network === 'solana' && allvaults[0].solwallets.length){
       setAllwallets(allvaults[0].solwallets)
      }else if(network === 'ethereum' && allvaults[0].ethwallets.length){
        setAllwallets(allvaults[0].ethwallets)      }

   },[network,allvaults])

  console.log(allvaults, ' this is the all vaulets')

  return (
    <div className='flex justify-center items-center'>

       {
        noWallets?<div>
          <h1>No wallets</h1>
          <Button onClick={() => {
                network === "solana" ? addSolWallet(allvaults[0].mnemonic, allvaults[0].solwallets.length? allvaults[0].solwallets.length:0 , setWallet, allvaults[0]?.accountId) : addEthWallet(allvaults[0].mnemonic, allvaults[0].solwallets.length? allvaults[0].solwallets.length:0, setWallet, allvaults[0]?.accountId);

                setAllwallets(network === 'solana' ? allvaults[0].solwallets : allvaults[0].ethwallets)
                setNoWallets(false)
          }}>Add {network} Wallet</Button>
        </div>:
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


          <div className='relative flex flex-col justify-center items-center gap-y-14'>


            <div className='flex justify-center items-center w-[200px] md:w-[350px] gap-x-1 px-2 bg-gray-500 rounded-full'>
              <div className='flex justify-center items-center size-14 p-2 rounded-full  '><Image onClick={() => setOptionModel(!optionModel)} className='cursor-pointer' src={`/${network}.png`} alt='logo' width={100} height={100} />
              </div>


              {/* network options  */}
              {
                optionModel &&
                <div className='absolute top-16  md:left-[-15px]  rounded-lg bg-slate-500 flex flex-col gap-y-2 py-2 px-2'>

                  <div className='flex gap-2 justify-between items-center px-3 hover:bg-slate-800 py-2 rounded-lg cursor-pointer' onClick={() => {
                    setNetwrok('solana');
                    setOptionModel(!optionModel)
                  }}>

                    <div className='flex justify-center items-center gap-x-2'>
                      <Image src={'/sol1.png'} alt='logo' width={30} height={30} />
                      <span>Solana</span>
                    </div>

                    {network === 'solana' && <Check />}
                  </div>


                  <div className='flex gap-2 justify-between items-center px-3 hover:bg-slate-800 py-2 rounded-lg cursor-pointer' onClick={() => {
                    setNetwrok('ethereum');
                    setOptionModel(!optionModel)
                  }}>

                    <div className='flex justify-center items-center gap-x-2'>
                      <Image src={'/eth.png'} alt='logo' width={30} height={30} />
                      <span>ethereum</span>
                    </div>

                    {network === 'ethereum' && <Check />}
                  </div>
                </div>
              }



              <span className='w-[150px] md:w-[200px] gap-x-2 border  flex  justify-center items-center border-x-2  border-y-0  border-slate-400'>
                <span className='text-sm md:text-lg font-bold text-center cursor-pointer' >wallet {currentWallet + 1}</span>
                <ChevronDownIcon className='cursor-pointer' onClick={() => setWalletModel(!walletModel)} />
              </span>

              <span className='flex justify-center items-center h-[50px] w-[50px] overflow-hidden'>
                <CopyIcon className='cursor-pointer' />
              </span>
            </div>


            {
              walletModel && <div className='absolute top-16 h-[500px] flex flex-col gap-y-3 bg-slate-600 p-3 rounded-lg w-[500px] overflow-y-scroll overflow-x-hidden'>

                {/* wallet one */}

                {
                  allwallets.map((wl, index) => <div key={index} className={`relative flex justify-between items-center p-3 hover:bg-gray-700 bg-gray-800 rounded-lg cursor-pointer ${currentWallet === index ? 'border-2 border-blue-500' : ''}`} onClick={() => {
                    setCurrentWallet(index);
                    setWalletModel(false);
                  }}>
                    <div className={`flex gap-x-3 justify-center items-center `}>
                      <Image src={`/${network}.png`} alt='logo' width={30} height={30} />
                      <div className='flex flex-col'>
                        <span>{wl.blockchain} wallet {index + 1}</span>
                        <span>{wl.publicKey.substring(1, 5)}....{wl.publicKey.substring(wl.publicKey.length - 5, wl.publicKey.length)}</span>
                      </div>
                    </div>

                    <div className='p-2 rounded-full hover:bg-gray-600'     onClick={(e) => {
        e.stopPropagation(); // Prevent the click from bubbling up to the parent div
        handleCopy(wl.publicKey);
      }}>
                     {isCopied? <Check/> : <CopyIcon />}
                    </div>
                  </div>)
                }

                <div className='flex w-full justify-center items-center'>
                  <PlusCircleIcon onClick={() => {
                    network === "solana" ? addSolWallet(allvaults[0].mnemonic, allvaults[0].solwallets.length, setWallet, allvaults[0]?.accountId) : addEthWallet(allvaults[0].mnemonic, allvaults[0].solwallets.length, setWallet, allvaults[0]?.accountId);

                    setAllwallets(network === 'solana' ? allvaults[0].solwallets : allvaults[0].ethwallets)
                  }} />
                </div>

              </div>
            }



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
            <div className='flex justify-center items-center'><Image src={`/${network}.png`} alt='logo' width={50} height={50} /></div>

            <span className='flex flex-col gap-y-1'>
              <span>{network}</span>
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
       }


    </div>
  )
}

export default Page
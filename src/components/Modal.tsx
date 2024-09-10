import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'sonner'
import { Cross,CircleX } from 'lucide-react'

// const Modal = () => {

//     const [airdropAmount, setAirdropAmount] = useState(0);

//     return (
//             <Dialog>
//                 <DialogTrigger className='flex flex-col justify-center items-center gap-y-2'>
//                     <span className='p-3 rounded-full text-center bg-white'><Image src={'/airdrop.png'} height={30} width={30} alt='airdrop' /></span>
//                     <span>Airdrop</span>
//                 </DialogTrigger>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>do not exceed the 50 solana limit</DialogTitle>
//                         <DialogDescription>
//                             This action cannot be undone. This will permanently delete your account
//                             and remove your data from our servers.
//                         </DialogDescription>
//                     </DialogHeader>

//                     <div className="grid gap-4 py-4">

//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <label className="text-right">
//                                 Amount
//                             </label>
//                             <Input id="username" value={airdropAmount} onChange={(e) => {
//                                 if (Number(e.target.value) <= 50) {
//                                     setAirdropAmount(Number(e.target.value))
//                                 }
//                                 else if (Number(e.target.value) > 50) {
//                                     toast('please enter below then 50')
//                                 }
//                             }} className="col-span-3" />
//                         </div>
//                     </div>
//                     <DialogFooter>

//                         <Button onClick={() => {
//                             // airDropSol(allwallets[currentWallet].publicKey,airdropAmount);
//                             // setFetchBalanc(true);                      
//                         }} >drop</Button>

//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//     )
// }

const AirDropModal = ({setModal}) => {
    const [amount, setAmount] = useState('');
    const [address,setAddress] = useState('');

    return (
        // <div className='top-0 bottom-0 left-0 right-0 w-full absolute z-20 bg-[#000000a1] flex justify-center items-center'>
        //     <div className='w-[90%] md:w-[400px] h-[350px] bg-gray-800 rounded-lg p-6 shadow-lg relative'>
        //         {/* Modal Title */}
        //         <h2 className='text-2xl font-bold text-white text-center mb-4'>Airdrop Tokens</h2>

        //         {/* Description */}
        //         <p className='text-sm text-gray-300 text-center mb-6'>
        //             This airdrop is only work on <span className='font-semibold text-white'>Devnet</span> or <span className='font-semibold text-white'>Testnet</span>.
        //             You can airdrop up to <span className='font-semibold text-white'>50 Solana</span> at once.
        //         </p>

        //         {/* Input Section */}
        //         <div className='flex flex-col gap-4 w-full px-2 justify-center items-center'>
        //             <label htmlFor='amount' className='text-white text-lg'>Amount</label>
        //             <Input
        //                 id='amount'
        //                 className='border-2 border-gray-400 rounded-md text-white w-full p-2'
        //                 type='number'
        //                 value={amount}
        //                 onChange={(e) => setAmount((e.target.value))}
        //                 placeholder='Enter the amount'
        //                 max={50}
        //             />
        //             {Number(amount) > 50 && (
        //                 <p className='text-red-500 text-sm'>You cannot airdrop more than 50 Solana!</p>
        //             )}
        //         </div>

        //         {/* Button */}
        //         <div className='flex justify-center items-center mt-6'>
        //             <Button
        //                 onClick={() => {
        //                     if (Number(amount) <= 50) {
        //                         // Handle Airdrop logic
        //                     } else {
        //                         toast('Amount exceeds the maximum limit of 50 Solana.');
        //                     }
        //                 }}
        //                 className='w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md'
        //             >
        //                 Drop Tokens
        //             </Button>

        //             <span className='absolute top-2 right-2'><CircleX className='cursor-pointer' onClick={() => {
        //                 setModal(false);
        //             }}/></span>
        //         </div>
        //     </div>
        // </div>

        <div className='top-0 bottom-0 left-0 right-0 w-full absolute z-20 bg-[#000000a1] flex justify-center items-center'>
        <div className='w-[90%] md:w-[400px] py-3 bg-gray-800 rounded-lg p-6 shadow-lg relative'>
            {/* Modal Title */}
            <h2 className='text-2xl font-bold text-white text-center mb-4'>Send Solana</h2>

            {/* Description */}
            <p className='text-sm text-gray-300 text-center mb-6'>
                This airdrop is only work on <span className='font-semibold text-white'>Devnet</span> or <span className='font-semibold text-white'>Testnet</span>.
                You can airdrop up to <span className='font-semibold text-white'>50 Solana</span> at once.
            </p>

            {/* Reciver Section */}
            <div className='flex flex-col gap-4 w-full px-2 justify-center items-center'>
                <label htmlFor='amount' className='text-white text-lg'>Reciever Address</label>
                <Input
                    id='amount'
                    className='border-2 border-gray-400 rounded-md text-white w-full p-2'
                    type='number'
                    value={amount}
                    onChange={(e) => setAmount((e.target.value))}
                    placeholder='Enter the address'
                    max={50}
                />
                {/* {Number(amount) > 50 && (
                    <p className='text-red-500 text-sm'>You cannot airdrop more than 50 Solana!</p>
                )} */}
            </div>


               {/* Amount   */}
                 <div className='flex flex-col gap-4 w-full px-2 justify-center items-center pt-3'>
                <label htmlFor='amount' className='text-white text-lg'>Amount</label>
                <Input
                    id='amount'
                    className='border-2 border-gray-400 rounded-md text-white w-full p-2'
                    type='number'
                    value={amount}
                    onChange={(e) => setAmount((e.target.value))}
                    placeholder='Enter the address'
                    max={50}
                />
                {/* {Number(amount) > 50 && (
                    <p className='text-red-500 text-sm'>You cannot airdrop more than 50 Solana!</p>
                )} */}
            </div>
            {/* Button */}
            <div className='flex justify-center items-center mt-6'>
                <Button
                    onClick={() => {
                        if (Number(amount) <= 50) {
                            // Handle Airdrop logic
                        } else {
                            toast('Amount exceeds the maximum limit of 50 Solana.');
                        }
                    }}
                    className='w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md'
                >
                    Send Tokens
                </Button>

                <span className='absolute top-2 right-2'><CircleX className='cursor-pointer' onClick={() => {
                    setModal(false);
                }}/></span>
            </div>
        </div>
    </div>
    );
};

export default AirDropModal;
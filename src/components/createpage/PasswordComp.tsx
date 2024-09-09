'use client'
import { Heading } from "@radix-ui/themes";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { CloseEye, OpenEye } from "@/utils/Icons";

const PasswordComp = ({setStep}) => {

    const router = useRouter();

    const [passVisible, setPassVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isButtonDisabled = password.length < 8 || password !== confirmPassword;

    return (
        <div className='px-2 md:!px-0 md:w-[35%]  flex justify-center items-center flex-col gap-y-6'>

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

            <Button className={`text-lg px-10 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isButtonDisabled} onClick={(()=> router.push('/wallet'))}>
                Next
            </Button>
        </div>
    );
};


export default PasswordComp;
'use client'
import React from "react";
import { useWalletStore } from "@/state/wallet";
export default function Test() 
{

   const {allWallets,setWallet} = useWalletStore()
  return (
  <div className="h-screen flex justify-center items-center">
   
   <div className="flex flex-col gap-y-7 ">
   <h1>Hellow world: {allWallets?.length}</h1>
   <div onClick={()=>setWallet({
      publicKey: "123456",
      privateKey: "09987877",
      mnemonic: "a b sss",
      path: "path/0/1",
      blockchain: "solana"
   })}>change name</div>
   {/* <h1>here is the length : {JSON.stringify(allwallets)}</h1> */}
   </div>


   {/* <button onClick={()=> setAllwallets((prev) => [...prev,{name:"anshu",id:allwallets.legth+1}])}>Add new wallet</button> */}
  </div>  
  );
}

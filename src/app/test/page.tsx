'use client'
import React from "react";
import { useAppContext } from "@/context";
export default function Test() 
{

  const {wallets, setWallets} = useAppContext();

  return (
  <div className="h-screen flex justify-center items-center">
   
   <div className="flex flex-col gap-y-7 ">
   <h1>Hellow world: {wallets?.length}</h1>
   <div onClick={()=>setWallets((prev) => [...prev,"hii"])}>change name</div>
   {/* <h1>here is the length : {JSON.stringify(allwallets)}</h1> */}
   </div>


   {/* <button onClick={()=> setAllwallets((prev) => [...prev,{name:"anshu",id:allwallets.legth+1}])}>Add new wallet</button> */}
  </div>  
  );
}

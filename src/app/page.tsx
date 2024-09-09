'use client'
import { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import { EthWallet } from "@/components/EthWallet";
import { SolanaWallet } from "@/components/SollanaWallet";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/components/PrimaryButton";
import { CloseEye, OpenEye } from "@/utils/Icons";
import { airDropSol, fetchBalance } from "@/lib/WalletsFunctions";
function Home() {
  const buttonStyle =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
  const [label, setLabel] = useState("Switch to Devnet");

  const [refresh, setRefresh] = useState(0);
  const [mnemonic, setMnemonic] = useState("");
  const [visible, setVisible] = useState(false);
  const [visiblity, setVisiblity] = useState(false);
  const [importmnemonic, setImportMnemonic] = useState("");
  const [net, setNet] = useState("mainnet");
  function switchNet() {
    net === "mainnet" ? setNet("devnet") : setNet("mainnet");
  }




  useEffect(()=>{
    console.log('this is updated refresh',refresh)
  },[refresh])
  return (
    <div className="h-screen w-screen rounded-md overflow-hidden relative flex flex-col items-center justify-center antialiased">
      <div className="z-50 overflow-y-auto  bg-blue-400 f p-5">
          
          <PrimaryButton title="Refresh Balance"onClick={() => {
            setRefresh(refresh + 1);
          }}/>


        <button
          className={buttonStyle}
          id="switchButton"
          onClick={() => {
            switchNet();
            label === "Switch to Devnet"
              ? setLabel("Swith to Mainnet")
              : setLabel("Switch to Devnet");
          }}
        >
          {label}
        </button>
        <div className="relative">
          <input
            onChange={(e) => {
              setImportMnemonic(e.target.value);
            }}
            type={visible ? "text" : "password"}
            className="block w-full p-2 mb-2 text-sm  border bg-gray-700 placeholder-gray-400 text-white"
            placeholder="Enter Your Seed Phrase"
          />
          <button
            onClick={() => {
              setVisible(!visible);
            }}
            className="text-white bg-gray-700 border-b border-r border-t-0 absolute end-[0px] bottom-[0px] font-medium text-sm px-2 py-2"
          >
            {!visible && (
          <CloseEye/>
            )}
            {visible && (
            <OpenEye/>
            )}
          </button>
        </div>
        <button
          className={buttonStyle}
          onClick={() => {
            if (importmnemonic == "") {
              alert("Empty Seed Phrse Please insert phrse into input Area");
            } else {
              setMnemonic(importmnemonic);
            }
          }}
        >
          Import Seed Phrase
        </button>
        <span className="ml-2 mr-4 font-black text-white"> OR </span>
        <button
          className={buttonStyle}
          onClick={async () => {
            const mn = generateMnemonic();
            setMnemonic(mn);
          }}
        >
          Create Seed Phrase
        </button>
        <label className="mt-3 block mb-2 text-sm font-black text-green-700 dark:text-green-500">
          Your Seed Phrase
        </label>
        <div className="relative">
          <input
            type={visiblity ? "text" : "password"}
            className="block w-full p-2 mb-2 text-sm  border bg-gray-700 placeholder-gray-400 text-white"
            value={mnemonic}
            disabled
          />
          <button
            onClick={() => {
              setVisiblity(!visiblity);
            }}
            className="text-white bg-gray-700 border-b border-r border-t-0 absolute end-[0px] bottom-[0px] font-medium text-sm px-2 py-2"
          >
            {!visiblity && (
              <OpenEye/>
            )}
            {visiblity && (
              <CloseEye/>
            )}
          </button>

         {/* <button onClick={() => {
          airDropSol('BQtx8KrbNW3T4W5wyGATHCo6BF7Xj2nEvJbd9d1u6eAh',10)
         }}>test air drop</button> */}

<button onClick={ async() => {
            const res = await fetchBalance('BQtx8KrbNW3T4W5wyGATHCo6BF7Xj2nEvJbd9d1u6eAh');
            console.log(res);
            alert(res)
         }}>fetch balance</button>

        </div>
        <br />


        <SolanaWallet
          buttonStyle={buttonStyle}
          refreshCounter={refresh}
          mnemonic={mnemonic}
          net={net}
        />
        <br />
        <EthWallet
          buttonStyle={buttonStyle}
          refreshCounter={refresh}
          mnemonic={mnemonic}
          net={net}
        />
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
}

export default Home;

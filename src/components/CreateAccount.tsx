'use client'
import { generateMnemonic } from "bip39";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button"
import { useState } from "react";
import { CheckboxGroup, Text } from "@radix-ui/themes";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { SolanaWallet } from "./SollanaWallet";

const CreateAccount = () => {
  const [menomics, setMenomics] = useState([]);
  const [showMnemonic, setshowMnemonic] = useState(false);
  return <div className="flex flex-col gap-y-5">



    <Input className="w-[50vw] text-lg py-6 " type="password" placeholder="Enter your secret pharas (or leave blank to genrate)" />

    {/* Display Secret Phrase */}
    {menomics.length > 1 && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="group flex flex-col items-center gap-4 cursor-pointer rounded-lg border border-primary/10 p-8"
      >
        <div
          className="flex w-full justify-between items-center"
          onClick={() => setshowMnemonic(!showMnemonic)}
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
            Your Secret Phrase
          </h2>
          <Button
            onClick={() => setshowMnemonic(!showMnemonic)}
            variant="ghost"
          >
            {showMnemonic ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </div>

        {showMnemonic && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="flex flex-col w-full items-center justify-center"
          //   onClick={() => copyToClipboard(mnemonicWords.join(" "))}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-8"
            >
              {menomics.map((word, index) => (
                <p
                  key={index}
                  className="md:text-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-lg p-4"
                >
                  {word}
                </p>
              ))}
            </motion.div>
            <div className="text-sm md:text-base text-primary/50 flex w-full gap-2 items-center group-hover:text-primary/80 transition-all duration-300">
              <Copy className="size-4" /> Click Anywhere To Copy
            </div>
          </motion.div>
        )}
      </motion.div>
    )}


    {/* <motion.div 
           initial={{x:-200,opacity:0}}
           animate={{ x: 100,opacity:1 }}
           transition={{ ease: "easeOut", duration: 2 }}
          className="h-[100px] w-[200px] bg-red-400">
          </motion.div> */}

    <div className="flex gap-4 items-center ">
      <span className="flex gap-3 justify-center items-center">
        <Checkbox />
        <Text>Solana</Text>

      </span>

      <span className="flex gap-3 justify-center items-center">
        <Checkbox />
        <Text>Etherium</Text>

      </span>
    </div>

    <div className="flex gap-4 justify-center items-center">
      <Button>Import Seed Pharas</Button>


      <Button onClick={async () => {
        console.log('hello jii kaisee hoo');
        const mn = generateMnemonic();
        setMenomics(mn.split(' '));
        console.log('this is mn:', mn.split(' '))
      }}>Create Seed Pharas</Button>
    </div>

    
{menomics &&    <SolanaWallet
          mnemonic={menomics}
        />}
  </div>
}




export default CreateAccount
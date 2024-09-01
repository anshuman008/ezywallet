import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { ethers } from 'ethers'
import { toast } from "sonner";





const genrateSolWallet = (mnemonic: string, accountIndex: number,setWallets) => {
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

      setWallets((prev)=>[...prev,newwallet]);
          
      toast('solana wallet genrated sucessfully!!')
    } catch (error) {
        toast.error("Failed to generate wallet. Please try again.");
        return null;
    }

}


const genrateEthWallet = (mnemonic: string, accountIndex: number,setWallets) => {
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

        setWallets((prev)=>[...prev,newwallet]);
          
        toast('eth wallet genrated sucessfully!!')

    } catch (error) {
        toast.error("Failed to generate wallet. Please try again.");
        return null;
    }
}


export {genrateEthWallet,genrateSolWallet};
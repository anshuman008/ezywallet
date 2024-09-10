import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { ethers } from "ethers";
import { toast } from "sonner";
import axios from "axios";

const alchemyApiKey = "8t1GNvMF9wKIerYRwDSEqZdg-o-VUzxx";
const alchemyRpc = `https://solana-devnet.g.alchemy.com/v2/${alchemyApiKey}`;
const mainnetRpc = "https://fittest-white-sound.solana-mainnet.quiknode.pro/2f08cc49d2b9b2116d50437b2105afe0b63b98bb";
const devnetRpc = "https://fittest-white-sound.solana-devnet.quiknode.pro/2f08cc49d2b9b2116d50437b2105afe0b63b98bb"

const genrateSolWallet = (
  mnemonic: string,
  accountIndex: number,
  setWallet,
  setVault
) => {
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
      blockchain: "solana",
    };

    // setWallet(newwallet);

    setVault({
        accountId: 1,
        ethwallets: [],
        solwallets: [newwallet],
        mnemonic: mnemonic
      });

    toast("solana wallet genrated sucessfully!!");
  } catch (error) {
    toast.error("Failed to generate wallet. Please try again.");
    return null;
  }
};

const genrateEthWallet = (
  mnemonic: string,
  accountIndex: number,
  setWallet,
  setVault
) => {
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
      blockchain: "ethereum",
    };

    setVault({
      accountId: 1,
      ethwallets: [newwallet],
      solwallets: [],
      mnemonic: mnemonic,
    });

    // setWallet(
    //   {
    //     publicKey: "sol_public_key",
    //     privateKey: "sol_private_key",
    //     path: "m/44'/501'/0'/0'",
    //     blockchain: "ethereum",
    //   },
    //   "ethereum",
    //   1
    // );

    

    // setWallet(newwallet);

    toast("eth wallet genrated sucessfully!!");
  } catch (error) {
    toast.error("Failed to generate wallet. Please try again.");
    return null;
  }
};




const addSolWallet = (
  mnemonic: string,
  accountIndex: number,
  setWallet,
  id: number
) => {
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
      blockchain: "solana",
    };



        setWallet(
      {
        publicKey: newwallet.publicKey,
        privateKey: newwallet.privateKey,
        path: newwallet.path,
        blockchain: newwallet.blockchain,
      },
      "solana",
      id
    );

    toast("solana wallet genrated sucessfully!!");
  } catch (error) {
    toast.error("Failed to generate wallet. Please try again.");
    return null;
  }
};


const addEthWallet = (
  mnemonic: string,
  accountIndex: number,
  setWallet,
  id: number
) => {
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
      blockchain: "ethereum",
    };



        setWallet(
      {
        publicKey: newwallet.publicKey,
        privateKey: newwallet.privateKey,
        path: newwallet.path,
        blockchain: newwallet.blockchain,
      },
      "ethereum",
      id
    );

    toast("ethereum wallet genrated sucessfully!!");
  } catch (error) {
    toast.error("Failed to generate wallet. Please try again.");
    return null;
  }
};    

const airDropSol = async(
  transPubkey:string,
  transferAmt:number
) =>{
  try {
    const response = await axios.post(alchemyRpc, {
        jsonrpc: "2.0",
        id: 1,
        method: "requestAirdrop",
        params: [transPubkey, transferAmt * LAMPORTS_PER_SOL]
    });
    toast("Airdrop successful");



} catch (e) {
    toast("Too many airdrops requested. Wait 24 hours for a refill.");
    console.log("Error during airdrop", e);
}
}
  

const fetchBalance = async(
  pubKey:string
) => {
  try {
    const response = await axios.post(devnetRpc, {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [pubKey]
    });
    
    return response.data.result.value / LAMPORTS_PER_SOL;
} catch (e) {
    console.log("Error while fetching balance", e);
    return 0;
}

}

export { genrateEthWallet, genrateSolWallet ,addSolWallet,addEthWallet,airDropSol,fetchBalance};

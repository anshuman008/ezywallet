import { create } from 'zustand';

interface Wallet {
    publicKey: string;
    privateKey: string;
    mnemonic: string;
    path: string;
    blockchain: string;
}

interface WalletStore {
    allWallets: Wallet[];
    setWallet: (newWallet: Wallet) => void; 
}

export const useWalletStore = create<WalletStore>((set) => ({
    allWallets: [],
    setWallet: (newWallet: Wallet) => set((state) => ({
        allWallets: [...state.allWallets, newWallet],
    })),
}));
  
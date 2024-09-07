import { create } from 'zustand';

interface Wallet {
    publicKey: string;
    privateKey: string;
    path: string;
    blockchain: string;
}

interface vault {
    accountId: number;
    ethwallets: Wallet[]; // Array of Ethereum wallets
    solwallets: Wallet[]; // Array of Solana wallets
    mnemonic: string;
}

interface VaultStore {
    allvaults: vault[];
    setVault: (newVault: vault) => void;
    setWallet: (newWallet: Wallet, network: string, accountId: number) => void;
    getVault: (accountId: number) => vault | undefined;
}

interface PasswordStore {
    password: string;
    setPassword: (pass:string) => void;
    getPassword: () => string;
}

export const useWalletStore = create<VaultStore>((set, get) => ({
    allvaults: [],
    
    setVault: (newVault: vault) => set((state) => ({
        allvaults: [...state.allvaults, newVault],
    })),

    setWallet: (newWallet: Wallet, network: string, accountId: number) => set((state) => ({
        allvaults: state.allvaults.map(vault => 
            vault.accountId === accountId
            ? {
                ...vault,
                ethwallets: network === 'ethereum' ? [...vault.ethwallets, newWallet] : vault.ethwallets,
                solwallets: network === 'solana' ? [...vault.solwallets, newWallet] : vault.solwallets,
            }
            : vault
        ),
    })),

    getVault: (accountId: number) => {
        const { allvaults } = get();
        return allvaults.find(vault => vault.accountId === accountId);
    },
}));


export const usePasswordStore =  create <PasswordStore> ((set,get) => ({
    password: '',
    setPassword: (pass: string) => set({password:pass}),
    getPassword: () => {
        const {password} = get();
        return password;
    }
}) )
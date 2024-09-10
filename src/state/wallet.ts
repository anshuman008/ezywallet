import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Import Zustand's persist middleware

interface Wallet {
    publicKey: string;
    privateKey: string;
    path: string;
    blockchain: string;
}

interface Vault {
    accountId: number;
    ethwallets: Wallet[]; // Array of Ethereum wallets
    solwallets: Wallet[]; // Array of Solana wallets
    mnemonic: string;
}

interface VaultStore {
    allvaults: Vault[];
    setVault: (newVault: Vault) => void;
    setWallet: (newWallet: Wallet, network: string, accountId: number) => void;
    getVault: (accountId: number) => Vault | undefined;
}

interface PasswordStore {
    password: string;
    setPassword: (pass: string) => void;
    getPassword: () => string;
}

// Wallet Store with Persistence using LocalStorage
export const useWalletStore = create<VaultStore>()(
  persist(
    (set, get) => ({
      allvaults: [],

      setVault: (newVault: Vault) => set((state) => ({
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
    }),
    {
      name: 'wallet-storage', // Name of localStorage key
      getStorage: () => localStorage, // Using localStorage to persist data
    }
  )
);

// Password Store with Persistence using LocalStorage
export const usePasswordStore = create<PasswordStore>()(
  persist(
    (set, get) => ({
      password: '',
      setPassword: (pass: string) => set({ password: pass }),
      getPassword: () => {
        const { password } = get();
        return password;
      },
    }),
    {
      name: 'password-storage', // Name of localStorage key
      getStorage: () => localStorage, // Using localStorage to persist data
    }
  )
);

'use client'

import { createContext, useContext, useState } from "react"

const AppContext = createContext([]);


export function AppWrapper({children}:{
    children: React.ReactNode;
  }) {
    const [wallets,setWallets] = useState([]);

        return (
            <AppContext.Provider value={ {wallets,setWallets} }>
                {children}
            </AppContext.Provider>
        );
  }


  export function useAppContext() {
    return useContext(AppContext);
  }
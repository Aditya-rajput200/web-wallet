"use client"

import React, { createContext, useState } from 'react';

// Create the context
export const WalletContext = createContext();

// Create a provider component
export const WalletProvider = ({ children }) => {
  const [walletinfo, setWalletinfo] = useState(null);

  return (
    <WalletContext.Provider value={{ walletinfo, setWalletinfo }}>
      {children}
    </WalletContext.Provider>
  );
};

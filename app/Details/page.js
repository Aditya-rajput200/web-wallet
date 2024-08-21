'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { WalletContext } from '../../context/WalletContext';
import { JsonRpcProvider, formatEther } from 'ethers';


export default function WalletDetails() {
  const router = useRouter();
  const { walletinfo } = useContext(WalletContext);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (walletinfo) {
      const fetchBalance = async () => {
        try {
          const provider = new JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/IPOGuds9afqWqBWux0V20UhdrVRP5mA2`);
          const walletBalance = await provider.getBalance(walletinfo.address);
          setBalance(formatEther(walletBalance));
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      };

      fetchBalance();
    }
  }, [walletinfo]);

  if (!walletinfo) {
   
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Wallet Details</h1>
      <div className="mb-4">
        <strong>Wallet No:</strong> {walletinfo.walletNo}
      </div>
      <div className="mb-4">
        <strong>Address:</strong> {walletinfo.address}
      </div>
      <div className="mb-4">
        <strong>Balance:</strong> {balance !== null ? `${balance} ETH` : 'Loading...'} 
       
      </div>
      <div className="mb-4">
        <strong>Private Key:</strong> {walletinfo.privateKey}
      </div>
      <div className="mb-4">
        <strong>Public Key:</strong> {walletinfo.publicKey}
      </div>


        
    </div>
  );
}

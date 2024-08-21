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
    <div className="p-4 sm:p-6 min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Wallet Details</h1>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <strong className="text-lg sm:text-xl">Wallet No:</strong>
          <span className="text-gray-700 dark:text-gray-300">{walletinfo.walletNo}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <strong className="text-lg sm:text-xl">Address:</strong>
          <span className="text-gray-700 dark:text-gray-300">{walletinfo.address}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <strong className="text-lg sm:text-xl">Balance:</strong>
          <span className="text-gray-700 dark:text-gray-300">{balance !== null ? `${balance} ETH` : 'Loading...'}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <strong className="text-lg sm:text-xl">Private Key:</strong>
          <span className="text-gray-700 dark:text-gray-300 break-all">{walletinfo.privateKey}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <strong className="text-lg sm:text-xl">Public Key:</strong>
          <span className="text-gray-700 dark:text-gray-300 break-all">{walletinfo.publicKey}</span>
        </div>
      </div>
    </div>
  );
}

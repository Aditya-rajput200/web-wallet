'use client'; // Add this at the top of your file

import React, { useState, useContext } from 'react';
import { Wallet, HDNodeWallet } from 'ethers';
import { mnemonicToSeed } from 'bip39';
import { FaArrowRightToBracket } from "react-icons/fa6";
import Link from 'next/link';
import { WalletContext } from '../../context/WalletContext'; // Import the context
import { Toaster, toast } from 'sonner';

function Eth({ mnemonic }) {
  const [wallets, setWallets] = useState([]);
  const [index, setIndex] = useState(0);
  const [walletNo, setWalletNo] = useState(1);
  const { setWalletinfo } = useContext(WalletContext); // Use the context

  // Generating wallet
  const generateEthWallet = async () => {
    if (!mnemonic) {
      alert("Mnemonic is required to generate the wallet");
      return;
    }

    try {
      const seed = await mnemonicToSeed(mnemonic);
      const derivedPath = `m/44'/60'/${index}/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivedPath);
      const privateKey = child.privateKey;

      const wallet = new Wallet(privateKey);

      toast(`Your wallet ${walletNo} has been generated!`, {
        position: 'top-center',
        duration: 5000,
        type: 'success',
        richColors: true
      });

      // Add new wallet to the list of wallets
      setWallets(prevWallets => [
        ...prevWallets,
        {
          address: wallet.address,
          privateKey,
          publicKey: child.publicKey,
          walletNo // Include the wallet number
        }
      ]);
      setIndex(prevIndex => prevIndex + 1);
      setWalletNo(prevWalletNo => prevWalletNo + 1);

    } catch (error) {
      console.log("New wallet error: " + error.message);
    }
  };

  const handleIconClick = (wallet) => {
    setWalletinfo(wallet); // Store the wallet in the context
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 dark:text-white flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl md:text-3xl font-bold text-center w-full">Ethereum Block</div>
        </div>

        {mnemonic ? (
          <>
            <div className="flex justify-center mb-6">
              <button
                onClick={generateEthWallet}
                className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 dark:hover:bg-blue-800"
              >
                Generate
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {wallets.map((wallet) => (
                <div key={wallet.walletNo} className="relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500">
                  <div className='absolute right-4 top-4'>
                    <Link href="/Details">
                      <FaArrowRightToBracket
                        className='w-5 h-5 hover:w-6 cursor-pointer'
                        onClick={() => handleIconClick(wallet)}
                      />
                    </Link>
                  </div>
                  <div className="mb-2 text-center text-lg md:text-xl font-extrabold">Wallet no. {wallet.walletNo}</div>
                  <div className="mb-2 break-words">
                    <span className="font-semibold">Address:</span> {wallet.address}
                  </div>
                  <div className="mb-2 break-words">
                    <span className="font-semibold">Private Key:</span> {wallet.privateKey}
                  </div>
                  <div className="break-words">
                    <span className="font-semibold">Public Key:</span> {wallet.publicKey}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-xl mb-4">No mnemonic provided</p>
            <p>Please provide a mnemonic phrase to generate Ethereum wallets.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Eth;

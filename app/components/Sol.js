"use client";
import React, { useState } from 'react';
import nacl from "tweetnacl";
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from "ed25519-hd-key";
import bs58 from 'bs58';

function Sol({ mnemonic }) {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState([]);

  const generateSolWallet = () => {
    try {
      // Generate seed from mnemonic
      const seed = mnemonicToSeedSync(mnemonic);

      // Derive the path for Solana
      const path = `m/44'/501'/0'/0'`;
      const { key: derivedSeed } = derivePath(path, seed.toString("hex"));

      // Convert the derived seed into Uint8Array
      const derivedSeedUint8Array = Uint8Array.from(Buffer.from(derivedSeed, 'hex'));

      // Generate key pair from seed
      const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeedUint8Array);

      // Encode keys for display
      const privateKeyEncoded = bs58.encode(secretKey);
      const publicKeyEncoded = bs58.encode(nacl.sign.keyPair.fromSecretKey(secretKey).publicKey);

      const newWallet = {
        walletNo: wallets.length + 1,
        address: publicKeyEncoded,
        privateKey: privateKeyEncoded,
        publicKey: publicKeyEncoded,
      };

      setWallets([...wallets, newWallet]);

      console.log("Private Key:", privateKeyEncoded);
      console.log("Public Key:", publicKeyEncoded);

    } catch (error) {
      console.error("Error generating Solana wallet:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 dark:text-white flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl md:text-3xl font-bold text-center w-full">Solana Block</div>
        </div>

        {mnemonic ? (
          <>
            <div className="flex justify-center mb-6">
              <button
                onClick={generateSolWallet}
                className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 dark:hover:bg-blue-800"
              >
                Generate
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {wallets.map((wallet) => (
                <div key={wallet.walletNo} className="relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500">
                  <div className='absolute right-4 top-4'>
                    {/* Replace with actual link navigation if needed */}
                    <a href="/Details">
                      <span className='w-5 h-5 hover:w-6 cursor-pointer'>
                        &rarr;
                      </span>
                    </a>
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
            <p>Please provide a mnemonic phrase to generate Solana wallets.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sol;

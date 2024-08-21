'use client';

import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import Eth from './components/Eth';
import DarkModeToggle from '@/app/components/Darktogel';
import { toast } from 'sonner';

function Page() {
  const [mnemonic, setMnemonic] = useState("");

  const generateSeed = async () => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
    console.log(mnemonic);
    toast('Mnemonic is Generated!', {
      position: 'top-right',
      duration: 2000,
      type: 'success',
      richColors: true
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
    toast('Copied to the clipboard!', {
      position: 'top-right',
      duration: 2000,
      type: 'success',
      richColors: true
    });
  };

  const mnemonicWords = mnemonic.split(' ');

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl text-blue-500 dark:text-blue-400 font-extrabold">Welcome to Blockchain</h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-center items-center mt-4">
        <span className="text-lg font-semibold mb-2 sm:mb-0 sm:mr-2">Select the Coin</span>
        <select className="border border-gray-500 dark:border-gray-600 rounded p-2 shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <option value="eth">Eth</option>
          <option value="sol">Sol</option>
        </select>
      </div>

      <DarkModeToggle />

      <div className="mt-6">
        <label className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 block">Your Mnemonic Seed</label>
        <div
          className={`relative bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-md ${
            mnemonic ? 'cursor-pointer' : ''
          }`}
          onClick={mnemonic ? copyToClipboard : undefined}
        >
          {mnemonic ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {mnemonicWords.map((word, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-center dark:hover:bg-slate-500 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 sm:py-4 text-gray-700 dark:text-gray-300"
                >
                  {word}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-700 dark:text-gray-400 text-center">
              Generate your seed to see the mnemonic here.
            </div>
          )}
        </div>
        {mnemonic && (
          <div className="mt-2 text-blue-500 dark:text-blue-400 text-center cursor-pointer" onClick={copyToClipboard}>
            Click anywhere to copy
          </div>
        )}
        <button
          onClick={generateSeed}
          className="mt-4 bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 w-full sm:w-auto"
        >
          Generate Seed
        </button>
      </div>

      <Eth mnemonic={mnemonic} />
    </div>
  );
}

export default Page;

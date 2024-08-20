"use client";

import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import Eth from '@/components/Eth';

function Page() {
  const [mnemonic, setMnemonic] = useState("");

  const generateSeed = async () => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
    console.log(mnemonic);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
  };

  const mnemonicWords = mnemonic.split(' ');

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl text-blue-500 font-extrabold">Welcome to Blockchain</h1>
      </div>

      <div className="flex mt-4 justify-center">
        <span className="text-lg font-semibold">Select the Coin</span>
        <select className="border ml-2 border-gray-500 rounded p-2 shadow-md">
          <option value="option1">Eth</option>
          <option value="option2">Sol</option>
        </select>
      </div>

      <div className="mt-6">
        <label className="text-lg font-semibold mb-2 block">Your Mnemonic Seed</label>
        <div
          className={`relative bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-md ${
            mnemonic ? 'cursor-pointer' : ''
          }`}
          onClick={mnemonic ? copyToClipboard : undefined}
        >
          {mnemonic ? (
            <div className="grid grid-cols-4 gap-2">
              {mnemonicWords.map((word, index) => (
                <div
                  key={index}
                  className="bg-gray-200 border border-gray-300 rounded-lg p-2 text-gray-700"
                >
                  {word}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-700 text-center">
              Generate your seed to see the mnemonic here.
            </div>
          )}
        </div>
        {mnemonic && (
          <div className="mt-2 text-blue-500 text-center cursor-pointer" onClick={copyToClipboard}>
            Click anywhere to copy
          </div>
        )}
        <button
          onClick={generateSeed}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Generate Seed
        </button>
      </div>

      <Eth mnemonic={mnemonic} />
    </div>
  );
}

export default Page;

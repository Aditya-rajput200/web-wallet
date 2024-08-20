import React, { useState } from 'react';
import { Wallet, HDNodeWallet } from 'ethers';
import { mnemonicToSeed } from 'bip39';

function Eth({ mnemonic }) {
  const [wallets, setWallets] = useState([]);
  const [index, setIndex] = useState(0);

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

      // Add new wallet to the list of wallets
      setWallets(prevWallets => [
        ...prevWallets,
        {
          address: wallet.address,
          privateKey,
          publicKey: child.publicKey
        }
      ]);
      setIndex(prevIndex => prevIndex + 1);
    } catch (error) {
      console.log("New wallet error: " + error.message);
    }
  };

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">Ethereum Block</div>
      <button
        onClick={generateEthWallet}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
      >
        Generate
      </button>

      <div className="mt-6 space-y-4">
        {wallets.map((wallet, idx) => (
          <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
            <div className="mb-2">
              <span className="font-semibold">Address:</span> {wallet.address}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Private Key:</span> {wallet.privateKey}
            </div>
            <div>
              <span className="font-semibold">Public Key:</span> {wallet.publicKey}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Eth;

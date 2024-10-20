import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from '../constants/contractInfo';
// src/components/TipModal.tsx
import React, { useState } from 'react';
import { useAccount, useConnect, useWriteContract } from 'wagmi';

import { parseEther } from 'viem';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  hasNFT: boolean;
  tippingEnabled: boolean;
}

const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose, username, hasNFT, tippingEnabled }) => {
  const [tipAmount, setTipAmount] = useState('');
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { writeContract } = useWriteContract();

  const handleTip = async () => {
    if (!address || !hasNFT || !tippingEnabled) return;

    try {
      await writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: 'sendTip',
        args: [username],
        value: parseEther(tipAmount),
      });
      alert('Tip sent successfully!');
      setTipAmount('');
      onClose();
    } catch (error) {
      console.error('Error sending tip:', error);
      alert('Failed to send tip. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Tip User</h2>
        {!address ? (
          <button
            onClick={() => connect({ connector: connectors[0] })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <input
              type="number"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              placeholder="Enter tip amount (ETH)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              onClick={handleTip}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Send Tip
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TipModal;

// Import necessary libraries
import React, { useState } from 'react';
import { ethers } from 'ethers';

// Set up your contract address and ABI
import ERC20_ABI from "./abi/USDC.json"

// Example USDC token address on Arbitrum or Sepolia
const TOKEN_ADDRESS = "0x6890b3b7AE59390D840CA2ED9dFe5D0F6F102a4E"; // Replace with actual token address
const TREASURY = "0x5c64c82aE66052C85506fDe770e90080e09f8E24";

// Main React Component
const TokenTransfer = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [approveAmount, setApproveAmount] = useState("");

    // Initialize ethers provider and signer
    const initProvider = async () => {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        const tempSigner = tempProvider.getSigner();
        setProvider(tempProvider);
        setSigner(tempSigner);
    };

    // Approve function
    const handleApprove = async () => {
        if (!provider || !signer) return;

        const tokenContract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);
        try {
            const tx = await tokenContract.approve(recipient, ethers.utils.parseUnits(approveAmount, 18));
            await tx.wait();
            alert("Approval successful!");
        } catch (err) {
            console.error(err);
            alert("Approval failed!");
        }
    };

    // Transfer function
    const handleTransfer = async () => {
        if (!provider || !signer) return;

        const tokenContract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);
        try {
            const tx = await tokenContract.transfer(TREASURY, ethers.utils.parseUnits(amount, 18));
            await tx.wait();
            alert("Transfer successful!");
        } catch (err) {
            console.error(err);
            alert("Transfer failed!");
        }
    };

    return (
        <div>
            <button onClick={initProvider}>Connect Wallet</button>
            <div>
                <h3>Approve Tokens</h3>
                <input
                    type="text"
                    placeholder="Amount to Approve"
                    value={approveAmount}
                    onChange={(e) => setApproveAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Recipient Address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <button onClick={handleApprove}>Approve</button>
            </div>
            <div>
                <h3>Transfer Tokens</h3>
                <input
                    type="text"
                    placeholder="Amount to Transfer"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Recipient Address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <button onClick={handleTransfer}>Transfer</button>
            </div>
        </div>
    );
};

export default TokenTransfer;

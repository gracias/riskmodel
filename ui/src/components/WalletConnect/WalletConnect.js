import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd';
import { z } from "zod";

import "./WalletConnect.css";
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import NBButton from '../NBButton/NBButton.js';

const ethAddressSchema = z.string()
    .refine((value) => ethers.utils.isAddress(value), {
        message: "Provided address is invalid. Please insure you have typed correctly.",
    });

const WalletConnect = () => {
    const navigate = useNavigate()
    const [address, setAddress] = useState("")


    const localStorageSetHandler = e => {
        if (e.key == 'address'){
            setAddress(e.value)
        }
       
    }
    useEffect(() => {
        document.addEventListener("itemInserted", localStorageSetHandler, false);
        if (localStorage.getItem('address')) {
            setAddress(localStorage.getItem('address'))
        }

        return () => {
            document.removeEventListener('itemInserted', localStorageSetHandler)
        }

    }, [])

  



    const getBalance = async () => {

        const provider = new ethers.providers.EtherscanProvider('sepolia');

        const bal = await provider.getBalance(address);

        return bal
    }

    const check = async () => {

        const bal = await getBalance();
        const balance = ethers.BigNumber.from(bal)
        if (balance.gte(0)) {
            alert("Eligible")

        } else {
            alert("Not eligible")

        }
    }

    const checkEligibility = async () => {
        const result = ethAddressSchema.safeParse(address)
        if (result && result.success) {
            check()
        } else {
            alert("Invalid address")
        }


    }



    const connect = async () => {
        localStorage.clear()
        if (!window.ethereum) {
            alert("install metamask extension!!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const res = await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner()
        const walletAddress =  await signer.getAddress()
        
        setAddress(walletAddress)
        localStorage.setItem('address', walletAddress)
       



    }

    const onInputChange = (event) => {

        const addr = event.target.value;

       
        setAddress(addr)

    }
    const navigateToDetails = () => {
        navigate('/basic-details')
    }
    return (
        <div className='NB-Wallet-connect'>
            {address && <Input value={address} readOnly placeholder="Enter Wallet Address" />}
            {!address && <NBButton handleClick={connect}
                classes="btn-gradient"
                btnStyle={{ width: '100%' }}
                type="primary" shape='round' size={"large"}>
                Connect Wallet
            </NBButton>}

            {address && <NBButton
                classes="btn-gradient"
                btnStyle={{ width: '100%' }}
                handleClick={navigateToDetails} type="primary" shape='round' size={"large"}>
                Continue
            </NBButton>}

        </div>
    )
}

export default WalletConnect
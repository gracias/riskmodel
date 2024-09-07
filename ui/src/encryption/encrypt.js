import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers } from "ethers";

import {getAuthSig } from "./authsig.js";
import { getAccessControlConditions } from "./accesscontrols.js";
import { getLitNodeClient, litNodeClient } from "./litnode.js";

const getSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return signer;
  }
/**
 * @function encryptData
 * - Utility function to get cipher text and data hash using lit sdk
 * @param {string} dataToEncrypt 
 * @returns [ciphertext, hash]
 */
export const encryptData = async (signer, walletAddress, dataToEncrypt, statement) => {
    // const signer = await getSigner();
    // const walletAddress = signer.address;
    // const litNodeClient = await getLitNodeClient();
    
    const client = litNodeClient
    if (!client) {
        return
    }
  

	const authSig = await getAuthSig(signer, walletAddress, statement);
	const accessControlConditions = getAccessControlConditions(walletAddress);
	
	const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
		{
			authSig,
			accessControlConditions,
			dataToEncrypt: dataToEncrypt,
			chain: process.env.REACT_APP_CHAIN
		},
		client,
	);
    await client.disconnect()
	return [ciphertext, dataToEncryptHash];
}
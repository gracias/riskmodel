import { ethers } from "ethers";
import siwe from "siwe";
import dotenv from "dotenv";

import { getLitNodeClient } from "./litnode.js";

dotenv.config();

export const getAuthSig = async () => {
	const litNodeClient = await getLitNodeClient();

	let nonce = await litNodeClient.getLatestBlockhash();
	

	// Initialize the signer
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
	const address = ethers.getAddress(await wallet.getAddress());

	// Craft the SIWE message
	const domain = "localhost";
	const origin = "https://localhost/login";
	const statement = "Hello World";

	// expiration time in ISO 8601 format.  This is 21 days in the future, calculated in milliseconds
	const expirationTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString();

	const siweMessage = new siwe.SiweMessage({
		domain,
		address: address,
		statement,
		uri: origin,
		version: "1",
		chainId: process.env.chainId,
		nonce,
		expirationTime,
	});
	const messageToSign = siweMessage.prepareMessage();

	// Sign the message and format the authSig
	const signature = await wallet.signMessage(messageToSign);

	const authSig = {
		sig: signature,
		derivedVia: "web3.eth.personal.sign",
		signedMessage: messageToSign,
		address: address,
	};

	return authSig;
}

import * as LitJsSdk from "@lit-protocol/lit-node-client";

import {getAuthSig } from "./authsig.js";
import { getAccessControlConditions } from "./accesscontrols.js";
import { getLitNodeClient } from "./litnode.js";

export const encryptData = async (dataToEncrypt) => {
	const authSig = await getAuthSig();
	const accessControlConditions = getAccessControlConditions();
	const litNodeClient = await getLitNodeClient();

	// 1. Encryption
	// <Blob> encryptedString
	// <Uint8Array(32)> dataToEncryptHash
	const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
		{
			authSig,
			accessControlConditions,
			dataToEncrypt: dataToEncrypt,
			// chain: "Chronicle Yellowstone - Lit Protocol Testnet",
			chain: 'ethereum'
		},
		litNodeClient,
	);
	return [ciphertext, dataToEncryptHash];
}
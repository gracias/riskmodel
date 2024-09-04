import * as LitJsSdk from "@lit-protocol/lit-node-client";
import dotenv from "dotenv";

import { getAuthSig } from "./authsig.js";
import { getLitNodeClient } from "./litnode.js";

dotenv.config();

export const decryptData = async (ciphertext, dataToEncryptHash, accessControlConditions) => {
	const authSig = await getAuthSig();
	const litNodeClient = await getLitNodeClient();

	let decryptedString;
	try {
		decryptedString = await LitJsSdk.decryptToString(
			{
				authSig,
				accessControlConditions,
				ciphertext,
				dataToEncryptHash,
				chain: process.env.chain,
			},
			litNodeClient,
		);
	} catch (e) {
		console.log(e);
	}

	return decryptedString;
}
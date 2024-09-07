import * as LitJsSdk from "@lit-protocol/lit-node-client";
import dotenv from "dotenv";

import {getAuthSig } from "./authsig.js";
import { getAccessControlConditions } from "./accesscontrols.js";
import { getLitNodeClient } from "./litnode.js";

dotenv.config();

/**
 * @function encryptData
 * - Utility function to get cipher text and data hash using lit sdk
 * @param {string} dataToEncrypt 
 * @returns [ciphertext, hash]
 */
export const encryptData = async (dataToEncrypt) => {
	const authSig = await getAuthSig();
	const accessControlConditions = getAccessControlConditions();
	const litNodeClient = await getLitNodeClient();

	const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
		{
			authSig,
			accessControlConditions,
			dataToEncrypt: dataToEncrypt,
			chain: process.env.chain
		},
		litNodeClient,
	);
	return [ciphertext, dataToEncryptHash];
}
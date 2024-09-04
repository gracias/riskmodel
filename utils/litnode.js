import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LocalStorage } from "node-localstorage";
import dotenv from "dotenv";

dotenv.config();


// Returns a configured Lit node object
export const getLitNodeClient = async () => {
	// Initialize LitNodeClient
	const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
		alertWhenUnauthorized: true,
		litNetwork: process.env.LIT_NETWORK, 
		debug: true, 
		storageProvider: new LocalStorage(process.env.LIT_STORAGE),
	});
	await litNodeClient.connect();
	return litNodeClient;
}


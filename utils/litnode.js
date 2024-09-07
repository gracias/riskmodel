import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LocalStorage } from "node-localstorage";
import dotenv from "dotenv";

dotenv.config();

// Initialize LitNodeClient
export const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
	alertWhenUnauthorized: true,
	litNetwork: process.env.LIT_NETWORK, 
	debug: true, 
	storageProvider: new LocalStorage(process.env.LIT_STORAGE),
});

export const connect = async () => {
	await litNodeClient.connect();
}

export const disConenct = async () => {
	await litNodeClient.disconnect();
}


// Returns a configured Lit node object
export const getLitNodeClient = async () => {
	await litNodeClient.disconnect();
	await litNodeClient.connect();
	console.log("connected to lit")
	return litNodeClient;
}




import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LocalStorage } from "node-localstorage";

// Returns a configured Lit node object
export const getLitNodeClient = async () => {
	// Initialize LitNodeClient
	const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
		alertWhenUnauthorized: true,
		litNetwork: "datil-dev", 
		debug: true, 
		storageProvider: new LocalStorage("./lit_storage.db"),
	});
	await litNodeClient.connect();
	return litNodeClient;
}


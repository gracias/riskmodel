import * as LitJsSdk from "@lit-protocol/lit-node-client";

// Returns a configured Lit node object
export const getLitNodeClient = async () => {
	
	const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
		alertWhenUnauthorized: true,
		litNetwork: "datil-dev", 
		debug: true, 
	});
	await litNodeClient.connect();
	return litNodeClient;
}


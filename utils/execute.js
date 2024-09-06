import dotenv from "dotenv";

import { decryptData } from "./decrypt.js";
import { encryptData } from "./encrypt.js";
import { retrieveFromIrys } from "./retrieveFromIrys.js";
import { storeOnIrys } from "./storeOnIrys.js";
import { getLitNodeClient } from "./litnode.js";
import { getSessionSig } from "./sessionsig.js";

dotenv.config();

const RESOURCE_CID = process.env.RESOURCE_IPFS

export const executeEncryptionAndStore = async () => {
    const messageToEncrypt = "My secret message 009";

	// 1. Encrypt data
	const [cipherText, dataToEncryptHash] = await encryptData(messageToEncrypt);
    console.log("cipher: ", cipherText)
	// 2. Store cipherText and dataToEncryptHash on Irys
	const encryptedDataID = await storeOnIrys(cipherText, dataToEncryptHash);

	console.log(`Data stored at https://gateway.irys.xyz/${encryptedDataID}`);

}

export const executeRetrieveAndDecryption = async (encryptedDataID) => {
    // Posible only if access control allows it

	// 3. Retrieve data stored on Irys

	const [cipherTextRetrieved, dataToEncryptHashRetrieved, accessControlConditions] = await retrieveFromIrys(
		encryptedDataID,
	);
    console.log("fetched: ", cipherTextRetrieved)
	// 4. Decrypt data
	const decryptedString = await decryptData(cipherTextRetrieved, dataToEncryptHashRetrieved, accessControlConditions);
	console.log("decryptedString:", decryptedString);
}

const invokeAction = async (ciphertext, dataToEncryptHash, accessControlConditions) => {
    try {
        const litNodeClient = await getLitNodeClient();
        const sessionSigs = await getSessionSig();
        const res = await litNodeClient.executeJs({
            ipfsId: process.env.LIT_ACTION_IPFS,
            sessionSigs,
            jsParams: {
                accessControlConditions,
                ciphertext,
                dataToEncryptHash
            }
        });

        console.log("Ouput: ", res)
    } catch(err) {
        console.log("Error: ", err)
    }
}

const execute = async () => {
    const encryptedDataID = RESOURCE_CID

    const [cipherTextRetrieved, dataToEncryptHashRetrieved, accessControlConditions] = await retrieveFromIrys(
		encryptedDataID,
	);

    await invokeAction(cipherTextRetrieved, dataToEncryptHashRetrieved, accessControlConditions)
}

// execute();
executeRetrieveAndDecryption("-MvO0QxdDIyZihOPv9u4YNoknl2qnsy-FabtoWCu9hA")
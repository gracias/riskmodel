
import { getAccessControlConditions } from "./accesscontrols.js";
import { getIrys  } from "./irys.js";
import { getIrysUploader } from "./irysUploader.js";

export const storeOnIrys =  async (cipherText, dataToEncryptHash, owner, nominee) => {
	const irys =  await getIrysUploader()

	const dataToUpload = {
		cipherText: cipherText,
		dataToEncryptHash: dataToEncryptHash,
		accessControlConditions: getAccessControlConditions(),
	};
	const tags = [
        { name: "Content-Type", value: "application/json" },
        { name: "application-id", value: "nebula"},
        // { name: "owner", value: owner },
        // { name: "nominee", value: nominee }
    ];

	const numBytes = Buffer.byteLength(JSON.stringify(dataToUpload))
    console.log("Size to store: ", numBytes)

	let receipt;
	try {

		receipt = await irys.upload(JSON.stringify(dataToUpload), { tags });
	} catch (e) {
		console.log("Error uploading data ", e);
	}

	return receipt?.id;
}
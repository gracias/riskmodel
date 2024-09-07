
import { getAccessControlConditions } from "./accesscontrols.js";
import { getIrys  } from "./irys.js";

export const storeOnIrys =  async (cipherText, dataToEncryptHash, owner, nominee) => {
	const irys =  getIrys();

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

	let receipt;
	try {

		receipt = await irys.upload(JSON.stringify(dataToUpload), { tags });
	} catch (e) {
		console.log("Error uploading data ", e);
	}

	return receipt?.id;
}
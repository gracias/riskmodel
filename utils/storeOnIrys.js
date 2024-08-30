
import { getAccessControlConditions } from "./accesscontrols.js";
import { getIrys  } from "./irys.js";

export const storeOnIrys =  async (cipherText, dataToEncryptHash) => {
	const irys = await getIrys();

	const dataToUpload = {
		cipherText: cipherText,
		dataToEncryptHash: dataToEncryptHash,
		accessControlConditions: getAccessControlConditions(),
	};

	let receipt;
	try {
		const tags = [{ name: "Content-Type", value: "application/json" }];
		receipt = await irys.upload(JSON.stringify(dataToUpload), { tags });
	} catch (e) {
		console.log("Error uploading data ", e);
	}

	return receipt?.id;
}
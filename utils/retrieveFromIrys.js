import dotenv from "dotenv";

dotenv.config();

export const retrieveFromIrys = async (id) => {
	const gatewayAddress = process.env.IRYS_GATEWAY;
	const url = `${gatewayAddress}${id}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to retrieve data for ID: ${id}`);
		}

		const data = await response.json();
		return [data.cipherText, data.dataToEncryptHash, data.accessControlConditions];
	} catch (e) {
		console.log("Error retrieving data ", e);
	}
}
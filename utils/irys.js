
import Irys from "@irys/sdk";
import dotenv from "dotenv";

dotenv.config();

/**
 * @function getIrys
 * - Utility function to get an instancy of irys
 * url: from environment variable irysUrl
 * providerUrl: from environment variable irysProviderUrl
 * token: from environment variable irysToken
 * @returns irys instance
 */
export const getIrys = async () => {
	const url = process.env.irysUrl;
	const providerUrl = process.env.irysProviderUrl;
	const token =process.env.token;

	const irys = new Irys({
		url, // URL of the node you want to connect to
		token, // Token used for payment
		key: process.env.PRIVATE_KEY, // Private key
		config: { providerUrl }, // only required when using Devnet
	});
	return irys;
}

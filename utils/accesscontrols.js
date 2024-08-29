import dotenv from "dotenv";

dotenv.config();

/**
 * @function getAccessControlConditions
 * - utility function to generate the required access control conditions
 * 
 * @returns access control conditions as an array
 */
export const getAccessControlConditions = () => {
	// Lit action with ipfs id can decrypt
	const accessControlConditions = [
		{
            contractAddress: '',
            standardContractType: '',
            chain: process.env.chain,
            method: '',
            parameters: [':currentActionIpfsId'],
            returnValueTest: {
                comparator: '=',
                value: process.env.LIT_ACTION_IPFS,
            },
        },
	];

	
	return accessControlConditions;
}

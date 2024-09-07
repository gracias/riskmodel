
/**
 * @function getAccessControlConditions
 * - utility function to generate the required access control conditions
 * 
 * @returns access control conditions as an array
 */
export const getAccessControlConditions = (walletAddress) => {
	const accessControlConditions = [
        {
            contractAddress: '',
            standardContractType: '',
            chain: process.env.REACT_APP_CHAIN,
            method: '',
            parameters: [
              ':userAddress',
            ],
            returnValueTest: {
              comparator: '=',
              value: walletAddress
            }
          }
	];

	
	return accessControlConditions;
}

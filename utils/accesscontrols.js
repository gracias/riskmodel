export const getAccessControlConditions = () => {
	// Lit action with ipfs id can decrypt
	const accessControlConditions = [
		{
            contractAddress: '',
            standardContractType: '',
            chain: 'ethereum',
            method: '',
            parameters: [':currentActionIpfsId'],
            returnValueTest: {
                comparator: '=',
                value: 'QmcbFX9RSBjuAf72a3b3nNMgZM6hkMj9ycc25GfjFBsEAh',
            },
        },
	];

	
	return accessControlConditions;
}

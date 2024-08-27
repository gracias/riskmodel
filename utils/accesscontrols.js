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
                value: 'QmXFk7ycPMcHEsuXj9iC2o9n3LKn6VEBsmg2tFwA6FAC2n',
            },
        },
	];

	
	return accessControlConditions;
}

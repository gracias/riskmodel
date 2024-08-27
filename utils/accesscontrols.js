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


//TEST 

// {
//     contractAddress: "",
//     standardContractType: "",
//     chain: "ethereum",
//     method: "eth_getBalance",
//     parameters: [":userAddress", "latest"],
//     returnValueTest: {
//         comparator: ">=",
//         value: "0000000000000", // 0 ETH, so anyone can open
//     },
// },
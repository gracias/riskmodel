
// import { storeOnIrys } from "./storeOnIrys.js";
import { encryptData } from "./encrypt.js";
import { INSURANCE_DATA } from "./insurance.js";
import { fundAndStore, funNode } from "./irysUploader.js";
import { getAccessControlConditions } from "./accesscontrols.js";

const executeEncryptionAndStore = async (messageToEncrypt) => {
  
	const [cipherText, dataToEncryptHash] = await encryptData(messageToEncrypt);
    const dataToUpload = {
		cipherText: cipherText,
		dataToEncryptHash: dataToEncryptHash,
		accessControlConditions: getAccessControlConditions(),
	};

    // console.log("data ", dataToUpload)
	
	const encryptedDataID = await fundAndStore(JSON.stringify(dataToUpload));

	

}

const executeEncrypt = async () => {
    let data = {
        Threshold: 0.003,
        claimRate : 0.02,        //compute   
        aveSumInsured : 10000,     //compute 
        stDevSumInsured : 2000,    //compute
        netPremMargins : 0.05,      
        perMillePremLoad : 0.001,  
        grossPremMargins : 0.1,     
        psPercProf : 0.5,           
        psPercExp : 0.9,                    
        interest : 0.03,            
        profitShareLoading: 0,
        averagePVProfit: 0,
        totalPVExpectedProfit: 0,
        insuranceData: JSON.stringify(INSURANCE_DATA)
    }

    
    data = JSON.stringify(data)
   
    const res = await executeEncryptionAndStore(data)
}
const run = async () => {
    await executeEncrypt()
    // await funNode(0.0002)
}

run();
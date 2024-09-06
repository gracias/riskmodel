import {
  createSiweMessageWithRecaps,
  generateAuthSig
} from "@lit-protocol/auth-helpers";
import { litNodeClient } from "./litnode";


  export const getSessionSignatures = async (signer, walletAddress) => {
   
  
     // Get the latest blockhash
     const latestBlockhash = await litNodeClient.getLatestBlockhash();
  
     // Define the authNeededCallback function
     const authNeededCallback = async(params) => {
       if (!params.uri) {
         throw new Error("uri is required");
       }
       if (!params.expiration) {
         throw new Error("expiration is required");
       }
  
    //    if (!params.resourceAbilityRequests) {
    //      throw new Error("resourceAbilityRequests is required");
    //    }
   
       let toSign
      try {
         // Create the SIWE message
       toSign = await createSiweMessageWithRecaps({
        uri: params.uri,
        expiration: params.expiration,
        resources: params.resourceAbilityRequests,
        walletAddress: walletAddress,
        nonce: latestBlockhash,
        litNodeClient: litNodeClient,
      });
      }catch(e) {
        console.log(e)
      }
  
      let authSig;
      try {
         // Generate the authSig
       authSig = await generateAuthSig({
        signer: signer,
        toSign,
      });
      }catch(e) {
        console.log(e)
      }
  
       return authSig;
     }
  

     let sessionSigs;
     try {
      // Get the session signatures
      sessionSigs = await litNodeClient.getSessionSigs({
        chain: process.env.REACT_APP_CHAIN,
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 ).toISOString(), //  7 days
        resourceAbilityRequests: [],     

        authNeededCallback,
      
    });
     } catch(e) {
        console.log(e)
     }
 
     return sessionSigs;
  }

  

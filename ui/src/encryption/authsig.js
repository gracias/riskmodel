
import { SiweMessage } from 'siwe';
import { litNodeClient } from './litnode';

// import { getLitNodeClient } from "./litnode.js";

function isValidURI(uri) {
    try {
      new URL(uri);
      return true;
    } catch (e) {
      return false;
    }
  }



  const createSiweMessage = (address, statement, nonce) => {
    const domain = "localhost:3000";
	const origin = "http://localhost:3000/policies";
    const scheme = 'http'
    // const scheme = window.location.protocol.slice(0, -1);
    // const domain = window.location.host;
    // const origin = window.location.origin;
    

    if (!isValidURI(origin) || !isValidURI(domain)) {
        return
    }

	const expirationTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString();
    const message = new SiweMessage({
        // scheme,
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        nonce,
        chainId: process.env.REACT_APP_CHAINID,
        expirationTime
    });
   return message.prepareMessage();
}

  
export const getAuthSig = async (wallet, address, statement = 'My PI data') => {
    const chachedValue = localStorage.getItem('authSig')
 
    if (chachedValue) {
        return JSON.parse(chachedValue)
    }
	
	let nonce = await litNodeClient.getLatestBlockhash();

	const messageToSign = createSiweMessage(address, statement, nonce);

	// Sign the message and format the authSig
    let signature
	
    signature = await wallet.signMessage(messageToSign);
    

    if (!signature){
        return
    }

	const authSig = {
		sig: signature,
		derivedVia: "web3.eth.personal.sign",
		signedMessage: messageToSign,
		address: address,
	};

    localStorage.setItem('authSig', JSON.stringify(authSig))

	return authSig;
    
}

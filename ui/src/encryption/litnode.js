import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LitNetwork } from '@lit-protocol/constants';

export const litNodeClient = new LitNodeClient({
    litNetwork: LitNetwork.DatilDev,
    debug: false
  });

export const disconnectLit = async () => {
    await litNodeClient.disconnect()
    console.log("Disconnected lit!")
}

export const connectLit = async () => {
    await litNodeClient.connect()
    console.log("Connected lit!")
}

// Returns a configured Lit node object
const getLitNodeClient = async () => {
    try {
        // Initialize LitNodeClient
        const litNodeClient = new LitNodeClient({
            litNetwork: LitNetwork.DatilDev,
            debug: false
          });
        await disconnectLit();
        await connectLit();
       
	    return litNodeClient;

    } catch(err) {
        console.log(err)
    }
	
}


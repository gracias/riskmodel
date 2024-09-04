import dotenv from "dotenv";
import { ethers } from "ethers";
import {
    LitAbility,
    LitActionResource,
    LitAccessControlConditionResource,
    createSiweMessage,
    generateAuthSig
  } from "@lit-protocol/auth-helpers";

import { getLitNodeClient } from "./litnode.js";

dotenv.config();

export const getSessionSig = async () => {
    const litNodeClient = await getLitNodeClient();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
 

    const sessionSignatures = await litNodeClient.getSessionSigs({
        chain: process.env.chain,
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 ).toISOString(), //  7 days
        resourceAbilityRequests: [
          {
            resource: new LitAccessControlConditionResource("*"),
            ability: LitAbility.AccessControlConditionDecryption,
          },
          {
            resource: new LitActionResource("*"),
            ability: LitAbility.LitActionExecution,
          }
        ],
        authNeededCallback: async ({
          uri,
          expiration,
          resourceAbilityRequests,
        }) => {
          const toSign = await createSiweMessage({
            uri,
            expiration,
            resources: resourceAbilityRequests,
            walletAddress: wallet.address,
            nonce: await litNodeClient.getLatestBlockhash(),
            litNodeClient,
          });
      
          return await generateAuthSig({
            signer: wallet,
            toSign,
          });
        },
      });

      return sessionSignatures
}
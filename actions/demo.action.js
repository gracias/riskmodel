// QmUCmiFuvS3E2dHPFkoJ5Vad77hsxgocDU3obyc9ZgEaNz
const go = async () => {
    const myData = await Lit.Actions.decryptAndCombine({
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig: null,
        chain: 'ethereum',
    });
   
    Lit.Actions.setResponse({ response: myData });
}

go();
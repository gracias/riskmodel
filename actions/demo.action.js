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
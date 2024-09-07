import { Uploader } from "@irys/upload";
import { Ethereum  } from "@irys/upload-ethereum";
 
const getIrysUploader = async () => {
  const irysUploader = await Uploader(Ethereum ).withWallet(process.env.PRIVATE_KEY);
  return irysUploader;
};

export const funNode = async (price) => {
    const irys = await Uploader(Ethereum).withWallet(process.env.PRIVATE_KEY);
    const res = await irys.fund(irys.utils.toAtomic(price))
        console.log("fund res", res)
}
export const fundAndStore = async (obj) => {
    try {
        const irys = await Uploader(Ethereum).withWallet(process.env.PRIVATE_KEY);
        console.log(irys.token)
       
        const numBytes = Buffer.byteLength(obj)
        console.log("Size: ", numBytes)
        const priceAtomic = await irys.getPrice(numBytes);
        console.log("Price: ", priceAtomic)
        const priceConverted = irys.utils.fromAtomic(priceAtomic);
 
        console.log(`Uploading ${numBytes} bytes costs ${priceConverted}`);
        const atomicBalance = await irys.getBalance();
        console.log(`Node balance (atomic units) = ${atomicBalance}`);
 
        // Convert balance to standard
        const convertedBalance = irys.utils.fromAtomic(atomicBalance);
        console.log(`Node balance (converted) = ${convertedBalance}`);
       

        const tags = [
            { name: "Content-Type", value: "application/json" },
            { name: "application-id", value: "nebula"},
        ];
        const { id } = await irys.upload(obj, { tags })
          console.log(
      `Uploaded to https://gateway.irys.xyz/${id}`
    );
       

      } catch (e) {
        console.log("Error funding node ", e);
      }
}


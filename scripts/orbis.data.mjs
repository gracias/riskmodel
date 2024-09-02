import { OrbisDB } from "@useorbis/db-sdk"
import { OrbisKeyDidAuth } from "@useorbis/db-sdk/auth"
import { catchError } from "@useorbis/db-sdk/util"

const db = new OrbisDB({
    ceramic: {
        gateway: "https://ceramic-orbisdb-mainnet-direct.hirenodes.io/"
    },
    nodes: [
        {
            gateway: "https://studio.useorbis.com",
            //env: "did:pkh:eip155:1:0x360ae8ab572dc6ba044979cda6379ebeeee29e31"
            env: "did:pkh:eip155:1:0x43c81e8a1ba772ca1adc38bcd9dff0668401c963"
        }
    ]
})



// Generate the seed
// const seed = await OrbisKeyDidAuth.generateSeed()
const seed = 'b918ed5103c9a623d1fca52bffd5e50d8fc16eb4960f792521e3e21d2cc4967a'
// console.log(seed)

// Initiate the authneticator using the generated (or persisted) seed
const auth = await OrbisKeyDidAuth.fromSeed(seed)

// Authenticate the user and persist the session in localStorage
// OrbisConnectResult

const authResult = await db.connectUser({ auth })


// Log the result
console.log({ authResult })

// Get the currently connected user
const currentUser = await db.getConnectedUser()
if(!currentUser){
  // Notify the user or reconnect
  throw "There is no active user session."
}

console.log({ currentUser })

// Check if a user with the specified wallet address is connected
const connected = await db.isUserConnected("0x43c81E8a1Ba772cA1ADC38bcd9dFF0668401c963");

console.log({ connected })


const insertStatement = await db
    .insert("kjzl6hvfrbw6c8n9439zv1dq3eij3qibyyo5szoxo5wnucrd1it5skwupgh2imv") //kjzl6hvfrbw6c8n9439zv1dq3eij3qibyyo5szoxo5wnucrd1it5skwupgh2imv
    .value(
        {
            name: "Luke",
            age: 39
        }
    )
    // optionally, you can scope this insert to a specific context
    .context("kjzl6kcym7w8y5zw47vtrsfx7ca7b9c2b4py4flmr6mtd8flwpwv2ikayhizx4p")

// Perform local JSON Schema validation before running the query
const validation = await insertStatement.validate()
if(!validation.valid){
    throw "Error during validation: " + validation.error
}

const [result, error] = await catchError(() => insertStatement.run())

// All runs of a statement are stored within the statement, in case you want to reuse the same statmenet
console.log(insertStatement.runs)
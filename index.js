import express from "express"
import cors from "cors"
import { User } from "./models/insurance.model.js"
import  { sequelize } from "./utils/dbConfig.js"
import { connectToDb, disconnectDb } from "./utils/db.js"
import { executeAction } from "./utils/execute.js"
import { disConenct } from "./utils/litnode.js"

const app = express()
app.use(cors())
app.use(express.json())

// Sync models and create the table if it doesn't exist
sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.error('Unable to connect to the database:', err));

const connectDb = async () => {
    await connectToDb()
    
}

connectDb();

app.post("/simulate", async (req, res) => {
   
    const { portSize, simulations, percentile } = req.body
    if (!portSize || !simulations || !percentile) {
        res.status(400).json({ success: false, message: 'Missing required fields'})
    }
    if (!Number(portSize) || !Number(simulations) || !Number(percentile)) {
        res.status(400).json({ success: false, message: 'Pass numerical values'})
    }
    try {
        
        const result = await executeAction(Number(portSize), Number(simulations), Number(percentile))
        if (!result) {
            res.status(400).json({ success: false })
        }
        res.json({success: true, result })
    } catch(e) {
        res.json({
            success: false,
            message: e.message
        })
    }
    
})

app.post('/policies', async (req, res) => {
    const { encryptedDID } = req.body;
    try {
    
        // stor on db
        const dbId = await User.create({ resourceAddress: encryptedDID });
        res.json({
            success: true,
            id: dbId
        })
    } catch(e){
        res.json({
            success: false,
        })
        console.log(e)
    }
})

app.get('/policies', async (_req, res) => {
   
    try {
    
       
        const users = await User.findAll({});
        res.json({
            success: true,
            users
        })
    } catch(e){
        res.json({
            success: false,
        })
        console.log(e)
    }
})

app.listen(3001, () => {
    console.log("Server at 3001")
})

process.on('uncaughtException', async () => {
    await disconnectDb();
    await disConenct();
    process.exit(1)
})
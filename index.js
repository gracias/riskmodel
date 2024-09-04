import express from "express"

const app = express()

app.use(express.json())

app.get("/simulate", (_req, res) => {
    // const { simulations, portfolio } = req.body
    res.json({"message": "success"})
})

app.listen(3001, () => {
    console.log("Server at 3001")
})
import express from "express"
import "./config/dotenv.js"
import pool from "./config/database.js"
import authRouter from "./routes/AuthRouter.js"

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get("/health", async (req, res, next) => {
    try {
        await pool.query("SELECT 1")
        res.json({ status: "ok", database: "connected" })
    } catch (error) {
        next(error)
    }
})

server.use("/api/auth", authRouter)

server.use((req, res) => {
    res.status(404).json({ error: "Route not found" })
})

server.use((error, req, res, next) => {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
})

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})

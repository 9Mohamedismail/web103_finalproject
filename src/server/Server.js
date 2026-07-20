import express from "express"
import "./config/dotenv.js"

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})

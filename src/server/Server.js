import express from "express"

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const port = process.env.port || 3000

server.listen(port)

console.log(`server listening on port ${port}`)

import * as dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()
const config = {
    connectionString: process.env.DB_URL
}

const DbPool = new Pool(config)

export default DbPool

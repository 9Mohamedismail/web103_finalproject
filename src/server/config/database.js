import pg from "pg"
import "./dotenv.js"

const config = process.env.DB_URL
    ? {
        connectionString: process.env.DB_URL,
    }
    : {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
    }

if (process.env.NODE_ENV === "production")
    config.ssl = { rejectUnauthorized: false }

export const pool = new pg.Pool(config)
export default pool


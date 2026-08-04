import pg from "pg";
import "./dotenv.js";

const config = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
    };

const useSsl =
    process.env.DATABASE_SSL === "true" ||
    (!process.env.DATABASE_URL && process.env.DATABASE_SSL !== "false");

if (useSsl) {
    config.ssl = { rejectUnauthorized: false };
}

export const pool = new pg.Pool(config);

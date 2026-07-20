import pool from "./database.js"
import schema from "./schema.js"

async function clearTables() {
    await pool.query(schema.CLEAR_TABLES_QUERY)
}

async function initTables() {
    for (const query of schema.INIT_TABLE_QUERIES)
        await pool.query(query)
}

async function insertRows() {
    for (const table of Object.keys(schema.SEED_DATA)) {
        const query = schema.INSERT_QUERIES?.[table]
        const mapper = schema.PARAM_MAPPERS?.[table]
        const rows = schema.SEED_DATA[table]

        if (!(query && rows && mapper))
            continue

        for (const row of rows)
            await pool.query(query, mapper(row))
    }
}

export async function seedDatabase() {
    try {
        await clearTables()
        await initTables()
        await insertRows()
    } finally {
        await pool.end()
    }
}

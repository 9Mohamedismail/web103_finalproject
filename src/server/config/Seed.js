import DbPool from "./Pool.js"
import Consts from "./Consts.js"
async function clearTables() {
    await DbPool.query(Consts.CLEAR_TABLES_QUERY)
}

async function initTables() {
    for (const query of Consts.INIT_TABLE_QUERIES)
        await DbPool.query(query)
}

async function insertRows() {
    const data = Consts.SEED_DATA
    const tables = Object.keys(data)
    for (const table of tables) {
        const query = Consts.INSERT_QUERIES?.[table]
        const mapper = Consts.PARAM_MAPPERS?.[table]
        const rows = data?.[table]
        // cant insert if query/rows/mapper dont exist
        if (!(query && rows && mapper))
            continue

        for (const row of rows)
            await DbPool.query(query, mapper(row))
    }
}

async function seed() {
    await clearTables()
    await initTables()
    await insertRows()
}
seed()

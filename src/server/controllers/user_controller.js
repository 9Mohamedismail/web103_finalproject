import pool from "../config/database.js"
async function getByUser(req, res) {
    const uid = req.user.id
    let weights;

    const query = `
        SELECT * FROM user_perk_weights
            WHERE user_id = $1;
    `

    try {
        const res = await pool.query(query, uid)
        weights = res.rows
        res.json(weights)
    } catch (err) {
        res.status(500).json({ error: `Error: ${err}` })
    }
}

export default {
    getByUser,
}

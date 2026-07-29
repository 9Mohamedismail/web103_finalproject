import { pool } from "../config/database.js"
async function getAllScores() {
    const query = `
       SELECT * FROM credit_card_perk_scores; 
    `;

    const res = await pool.query(query);
    return res.rows;
}

async function getWeightsByUser(id) {
    const query = `
        SELECT * FROM user_perk_weights
            WHERE user_id = $1;
    `

    const res = await pool.query(query, [id])
    return res.rows
}

export default {
    getAllScores,
    getWeightsByUser
}

import { pool } from "../config/database.js";

const cardFields = `
    card_id AS id,
    name,
    issuer,
    network,
    card_type,
    image_url,
    annual_fee,
    country,
    foreign_transaction_fee,
    signup_bonus,
    reward_rates,
    benefits,
    credit_score_min,
    updated_at
`;

async function getAll(req, res) {
    try {
        const result = await pool.query(`
            SELECT ${cardFields}
            FROM credit_cards
            ORDER BY credit_cards.id;
        `);

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve cards" });
    }
}

async function getById(req, res) {
    try {
        const result = await pool.query(`
            SELECT ${cardFields}
            FROM credit_cards
            WHERE card_id = $1;
        `, [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Card not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve card" });
    }
}

export default {
    getAll,
    getById,
};

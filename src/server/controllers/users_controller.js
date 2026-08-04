import { pool } from "../config/database.js";

async function updateCreditScore(req, res) {
    const creditScore = req.body?.credit_score;

    if (!Number.isInteger(creditScore) || creditScore < 300 || creditScore > 850) {
        return res.status(400).json({
            error: "Credit score must be an integer from 300 to 850",
        });
    }

    try {
        const result = await pool.query(
            `
                UPDATE users
                SET credit_score = $1
                WHERE id = $2
                RETURNING credit_score;
            `,
            [creditScore, req.user.id],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(result.rows[0]);
    } catch {
        return res.status(500).json({ error: "Unable to update credit score" });
    }
}

export default {
    updateCreditScore,
};

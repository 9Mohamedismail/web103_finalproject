import { pool } from "../config/database.js";

const favoriteFields = `
    credit_cards.card_id AS id,
    credit_cards.name,
    credit_cards.issuer,
    credit_cards.image_url,
    favorites.created_at AS saved_at
`;

async function getMine(req, res) {
    try {
        const result = await pool.query(
            `
                SELECT ${favoriteFields}
                FROM favorites
                JOIN credit_cards ON credit_cards.id = favorites.credit_card_id
                WHERE favorites.user_id = $1
                ORDER BY favorites.created_at DESC, favorites.id DESC;
            `,
            [req.user.id],
        );

        return res.status(200).json(result.rows);
    } catch {
        return res.status(500).json({ error: "Unable to retrieve favorites" });
    }
}

async function create(req, res) {
    try {
        const cardResult = await pool.query(
            "SELECT id FROM credit_cards WHERE card_id = $1",
            [req.params.cardId],
        );

        if (cardResult.rows.length === 0) {
            return res.status(404).json({ error: "Card not found" });
        }

        await pool.query(
            `
                INSERT INTO favorites (user_id, credit_card_id)
                VALUES ($1, $2);
            `,
            [req.user.id, cardResult.rows[0].id],
        );

        const result = await pool.query(
            `
                SELECT ${favoriteFields}
                FROM favorites
                JOIN credit_cards ON credit_cards.id = favorites.credit_card_id
                WHERE favorites.user_id = $1 AND credit_cards.card_id = $2;
            `,
            [req.user.id, req.params.cardId],
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({ error: "Card is already a favorite" });
        }

        return res.status(500).json({ error: "Unable to add favorite" });
    }
}

async function remove(req, res) {
    try {
        const result = await pool.query(
            `
                DELETE FROM favorites
                USING credit_cards
                WHERE favorites.credit_card_id = credit_cards.id
                    AND favorites.user_id = $1
                    AND credit_cards.card_id = $2
                RETURNING favorites.id;
            `,
            [req.user.id, req.params.cardId],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Favorite not found" });
        }

        return res.status(204).send();
    } catch {
        return res.status(500).json({ error: "Unable to remove favorite" });
    }
}

export default {
    getMine,
    create,
    remove,
};

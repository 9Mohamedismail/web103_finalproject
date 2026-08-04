import { pool } from "../config/database.js";

const reviewFields = `
    reviews.id,
    reviews.rating,
    reviews.review_text,
    reviews.created_at,
    reviews.updated_at,
    users.username
`;

function validateReview(body) {
    const rating = body?.rating;
    const reviewText = body?.review_text;

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return { error: "Rating must be an integer from 1 to 5" };
    }

    if (typeof reviewText !== "string") {
        return { error: "Review text is required" };
    }

    const trimmedReviewText = reviewText.trim();

    if (trimmedReviewText.length < 1 || trimmedReviewText.length > 1000) {
        return { error: "Review text must be between 1 and 1000 characters" };
    }

    return { rating, reviewText: trimmedReviewText };
}

async function getAll(req, res) {
    try {
        const cardResult = await pool.query(
            "SELECT id FROM credit_cards WHERE card_id = $1",
            [req.params.cardId],
        );

        if (cardResult.rows.length === 0) {
            return res.status(404).json({ error: "Card not found" });
        }

        const userId = req.user?.id ?? -1;
        const result = await pool.query(
            `
                SELECT
                    ${reviewFields},
                    reviews.user_id = $2 AS is_owner
                FROM reviews
                JOIN users ON users.id = reviews.user_id
                WHERE reviews.credit_card_id = $1
                ORDER BY reviews.created_at DESC, reviews.id DESC;
            `,
            [cardResult.rows[0].id, userId],
        );

        return res.status(200).json(result.rows);
    } catch {
        return res.status(500).json({ error: "Unable to retrieve reviews" });
    }
}

async function getMine(req, res) {
    try {
        const result = await pool.query(
            `
                SELECT
                    reviews.id,
                    reviews.rating,
                    reviews.review_text,
                    reviews.updated_at,
                    credit_cards.card_id,
                    credit_cards.name AS card_name,
                    credit_cards.image_url
                FROM reviews
                JOIN credit_cards ON credit_cards.id = reviews.credit_card_id
                WHERE reviews.user_id = $1
                ORDER BY reviews.updated_at DESC, reviews.id DESC;
            `,
            [req.user.id],
        );

        return res.status(200).json(result.rows);
    } catch {
        return res.status(500).json({ error: "Unable to retrieve your reviews" });
    }
}

async function create(req, res) {
    const review = validateReview(req.body);

    if (review.error) {
        return res.status(400).json({ error: review.error });
    }

    try {
        const cardResult = await pool.query(
            "SELECT id FROM credit_cards WHERE card_id = $1",
            [req.params.cardId],
        );

        if (cardResult.rows.length === 0) {
            return res.status(404).json({ error: "Card not found" });
        }

        const result = await pool.query(
            `
                WITH new_review AS (
                    INSERT INTO reviews (
                        user_id,
                        credit_card_id,
                        rating,
                        review_text
                    )
                    VALUES ($1, $2, $3, $4)
                    RETURNING *
                )
                SELECT
                    new_review.id,
                    new_review.rating,
                    new_review.review_text,
                    new_review.created_at,
                    new_review.updated_at,
                    users.username,
                    TRUE AS is_owner
                FROM new_review
                JOIN users ON users.id = new_review.user_id;
            `,
            [
                req.user.id,
                cardResult.rows[0].id,
                review.rating,
                review.reviewText,
            ],
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({ error: "You already reviewed this card" });
        }

        return res.status(500).json({ error: "Unable to create review" });
    }
}

async function update(req, res) {
    const review = validateReview(req.body);

    if (review.error) {
        return res.status(400).json({ error: review.error });
    }

    try {
        const result = await pool.query(
            `
                WITH updated_review AS (
                    UPDATE reviews
                    SET
                        rating = $1,
                        review_text = $2,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $3 AND user_id = $4
                    RETURNING *
                )
                SELECT
                    updated_review.id,
                    updated_review.rating,
                    updated_review.review_text,
                    updated_review.created_at,
                    updated_review.updated_at,
                    users.username,
                    TRUE AS is_owner
                FROM updated_review
                JOIN users ON users.id = updated_review.user_id;
            `,
            [review.rating, review.reviewText, req.params.reviewId, req.user.id],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Review not found" });
        }

        return res.status(200).json(result.rows[0]);
    } catch {
        return res.status(500).json({ error: "Unable to update review" });
    }
}

async function remove(req, res) {
    try {
        const result = await pool.query(
            "DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING id",
            [req.params.reviewId, req.user.id],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Review not found" });
        }

        return res.status(204).send();
    } catch {
        return res.status(500).json({ error: "Unable to delete review" });
    }
}

export default {
    getAll,
    getMine,
    create,
    update,
    remove,
};

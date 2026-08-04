// Contributor credit: Chris Lin.

import { pool } from "./database.js";
import cardData from "../data/cardData.js";

const schemaQuery = `
    DROP TABLE IF EXISTS
        credit_card_perk_scores,
        user_perk_weights,
        perk_categories,
        reviews,
        favorites,
        credit_cards,
        users
    CASCADE;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        githubid BIGINT NOT NULL UNIQUE,
        username VARCHAR(200) NOT NULL,
        credit_score INTEGER CHECK (credit_score BETWEEN 300 AND 850),
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE credit_cards (
        id SERIAL PRIMARY KEY,
        card_id VARCHAR(200) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        issuer VARCHAR(100) NOT NULL,
        network VARCHAR(20) NOT NULL CHECK (
            network IN ('amex', 'visa', 'mastercard', 'discover')
        ),
        card_type VARCHAR(20) NOT NULL CHECK (
            card_type IN ('personal', 'student', 'business', 'secured')
        ),
        image_url TEXT NOT NULL,
        annual_fee DOUBLE PRECISION NOT NULL CHECK (annual_fee >= 0),
        country CHAR(2) NOT NULL,
        foreign_transaction_fee DOUBLE PRECISION NOT NULL CHECK (
            foreign_transaction_fee >= 0
        ),
        signup_bonus JSONB,
        reward_rates JSONB NOT NULL,
        benefits JSONB NOT NULL,
        credit_score_min INTEGER NOT NULL CHECK (
            credit_score_min BETWEEN 300 AND 850
        ),
        updated_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE favorites (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        credit_card_id INTEGER NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, credit_card_id)
    );

    CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        credit_card_id INTEGER NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
        review_text TEXT NOT NULL CHECK (
            char_length(btrim(review_text)) BETWEEN 1 AND 1000
        ),
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, credit_card_id)
    );

    CREATE INDEX reviews_credit_card_id_idx ON reviews (credit_card_id);
`;

const insertCardQuery = `
    INSERT INTO credit_cards (
        card_id,
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
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
`;

async function resetDatabase() {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        await client.query(schemaQuery);

        for (const card of cardData) {
            await client.query(insertCardQuery, [
                card.id,
                card.name,
                card.issuer,
                card.network,
                card.card_type,
                card.image_url,
                card.annual_fee,
                card.country,
                card.foreign_transaction_fee,
                card.signup_bonus === null
                    ? null
                    : JSON.stringify(card.signup_bonus),
                JSON.stringify(card.reward_rates),
                JSON.stringify(card.benefits),
                card.credit_score_min,
                card.updated_at,
            ]);
        }

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

resetDatabase()
    .then(() => console.log("Database reset and catalog seeded successfully"))
    .catch((error) => {
        console.error("Database reset failed", error);
        process.exitCode = 1;
    });

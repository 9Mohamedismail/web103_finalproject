// Contributor credit: Chris Lin.

import { pool } from "./database.js";
import seedData from "../data/seed_data.js";

const clearTablesQuery = `
    DROP TABLE IF EXISTS
        reviews,
        favorites,
        credit_cards,
        users
    CASCADE;
`;

const createUsersTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            githubid INT NOT NULL UNIQUE,
            username VARCHAR(200) NOT NULL UNIQUE,
            avatarurl VARCHAR(500),
            accesstoken VARCHAR(500) NOT NULL,
            credit_score INTEGER,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;

    await pool.query(createTableQuery);
};

const createCreditCardsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS credit_cards (
            id SERIAL PRIMARY KEY,
            api_card_id VARCHAR NOT NULL UNIQUE,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;

    await pool.query(createTableQuery);
};

const createFavoritesTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS favorites (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            credit_card_id INTEGER NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (user_id, credit_card_id)
        );
    `;

    await pool.query(createTableQuery);
};

const createReviewsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            credit_card_id INTEGER NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
            rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
            review_text TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;

    await pool.query(createTableQuery);
};

const createPerkCategoriesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS perk_categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL UNIQUE
        );
    `;

    await pool.query(query);
}

const createPerkScoresTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS credit_card_perk_scores(
            id SERIAL PRIMARY KEY,
            credit_card_id INTEGER NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
            perk_category_id INTEGER NOT NULL REFERENCES perk_categories(id) ON DELETE CASCADE,
            score INTEGER NOT NULL CHECK(score BETWEEN 0 AND 100),
            UNIQUE(credit_card_id, perk_category_id)
        );
    `;

    await pool.query(query);
}

const createUserWeightsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS user_perk_weights (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            perk_category_id INTEGER NOT NULL REFERENCES perk_categories(id) ON DELETE CASCADE,
            weight INTEGER NOT NULL CHECK (weight BETWEEN 0 AND 100),
            UNIQUE (user_id, perk_category_id)
        );
    `;

    await pool.query(query);
}



const createTables = async () => {
    await createUsersTable();
    await createCreditCardsTable();
    await createFavoritesTable();
    await createReviewsTable();

    // card rec tbls
    await createPerkCategoriesTable();
    await createPerkScoresTable();
    await createUserWeightsTable();
};

const clearTables = async () => {
    await pool.query(clearTablesQuery);
};

const seedUsersTable = async () => {
    const insertQuery = `
        INSERT INTO users (githubid, username, avatarurl, accesstoken, credit_score)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (username) DO NOTHING
    `;

    for (const user of seedData.users)
        await pool.query(insertQuery, [
            user.githubid,
            user.username,
            user.avatarurl,
            user.accesstoken,
            user.credit_score,
        ]);
};

const seedCreditCardsTable = async () => {
    const insertQuery = `
        INSERT INTO credit_cards (api_card_id)
        VALUES ($1)
        ON CONFLICT (api_card_id) DO NOTHING
    `;

    for (const card of seedData.credit_cards)
        await pool.query(insertQuery, [card.api_card_id]);
};

const seedFavoritesTable = async () => {
    const insertQuery = `
        INSERT INTO favorites (user_id, credit_card_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, credit_card_id) DO NOTHING
    `;

    for (const favorite of seedData.favorites)
        await pool.query(insertQuery, [favorite.user_id, favorite.credit_card_id]);
};

const seedReviewsTable = async () => {
    const insertQuery = `
        INSERT INTO reviews (user_id, credit_card_id, rating, review_text)
        VALUES ($1, $2, $3, $4)
    `;

    for (const review of seedData.reviews)
        await pool.query(insertQuery, [
            review.user_id,
            review.credit_card_id,
            review.rating,
            review.review_text,
        ]);
};

const seedTables = async () => {
    await seedUsersTable();
    await seedCreditCardsTable();
    await seedFavoritesTable();
    await seedReviewsTable();
};

const resetDatabase = async () => {
    try {
        await clearTables();
        await createTables();
        await seedTables();
    } finally {
        await pool.end();
    }
};

resetDatabase()
    .then(() => console.log("Database reset and seeded successfully"))
    .catch((error) => {
        console.error("Database reset failed", error);
        process.exitCode = 1;
    });

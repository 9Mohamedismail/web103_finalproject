const CLEAR_TABLES_QUERY = `
    DROP TABLE IF EXISTS
        users,
        credit_cards,
        spending_categories,
        favorites,
        reviews,
        recommendations,
        user_spending_interests,
        card_spending_categories
        card_spending_categories CASCADE;
`
const INIT_TABLE_QUERIES = [
    `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR NOT NULL UNIQUE,
            email VARCHAR NOT NULL UNIQUE,
            password_hash VARCHAR NOT NULL,
            credit_score INTEGER,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `,

    `
        CREATE TABLE IF NOT EXISTS credit_cards (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            issuer VARCHAR NOT NULL,
            image_url VARCHAR,
            intro_bonus TEXT,
            reward_rates TEXT,
            annual_fee DECIMAL(10, 2),
            apr VARCHAR,
            unique_perks TEXT,
            benefits TEXT,
            drawbacks TEXT,
            recommended_credit_score INTEGER
        );
    `,

    `
        CREATE TABLE IF NOT EXISTS spending_categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL UNIQUE
        );
    `,

    `
        CREATE TABLE IF NOT EXISTS favorites (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            credit_card_id INTEGER NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
            UNIQUE (user_id, credit_card_id)
        );
    `,

    `
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            credit_card_id INTEGER NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
            rating INTEGER NOT NULL,
            review_text TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `,

    `
        CREATE TABLE IF NOT EXISTS recommendations (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            credit_card_id INTEGER NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
            match_score INTEGER,
            reason TEXT
        );
    `,

    `
        CREATE TABLE IF NOT EXISTS user_spending_interests (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            spending_category_id INTEGER NOT NULL REFERENCES spending_categories(id) ON DELETE CASCADE,
            UNIQUE (user_id, spending_category_id)
        );
    `,

    `
        CREATE TABLE IF NOT EXISTS card_spending_categories (
            id SERIAL PRIMARY KEY,
            credit_card_id INTEGER NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
            spending_category_id INTEGER NOT NULL REFERENCES spending_categories(id) ON DELETE CASCADE,
            UNIQUE (credit_card_id, spending_category_id)
        );
    `,

]

const SEED_DATA = {
    users: [
        { username: 'jsmith', email: 'jsmith@example.com', password_hash: '$2b$10$examplehash1', credit_score: 720 },
        { username: 'amiller', email: 'amiller@example.com', password_hash: '$2b$10$examplehash2', credit_score: 680 },
        { username: 'rgarcia', email: 'rgarcia@example.com', password_hash: '$2b$10$examplehash3', credit_score: 750 },
        { username: 'tchen', email: 'tchen@example.com', password_hash: '$2b$10$examplehash4', credit_score: 610 },
        { username: 'kpatel', email: 'kpatel@example.com', password_hash: '$2b$10$examplehash5', credit_score: 800 },
    ],

    credit_cards: [
        {
            name: 'Sapphire Preferred',
            issuer: 'Chase',
            image_url: 'https://example.com/images/sapphire-preferred.png',
            intro_bonus: 'Earn 60,000 bonus points after spending $4,000 in the first 3 months',
            reward_rates: '2x on travel and dining, 1x on everything else',
            annual_fee: 95.00,
            apr: '21.24% - 28.24% Variable',
            unique_perks: 'Points transfer to airline and hotel partners',
            benefits: 'Trip cancellation insurance, no foreign transaction fees',
            drawbacks: 'Annual fee applies even in year one',
            recommended_credit_score: 700,
        },
        {
            name: 'Freedom Unlimited',
            issuer: 'Chase',
            image_url: 'https://example.com/images/freedom-unlimited.png',
            intro_bonus: 'Earn $200 after spending $500 in the first 3 months',
            reward_rates: '1.5% cash back on everything',
            annual_fee: 0.00,
            apr: '19.99% - 28.74% Variable',
            unique_perks: 'No annual fee ever',
            benefits: 'Purchase protection, extended warranty',
            drawbacks: 'Lower rewards ceiling than premium travel cards',
            recommended_credit_score: 650,
        },
        {
            name: 'Blue Cash Preferred',
            issuer: 'American Express',
            image_url: 'https://example.com/images/blue-cash-preferred.png',
            intro_bonus: 'Earn $250 statement credit after spending $3,000 in 6 months',
            reward_rates: '6% at U.S. supermarkets (up to $6,000/year), 3% at gas stations',
            annual_fee: 95.00,
            apr: '19.24% - 29.99% Variable',
            unique_perks: 'Highest grocery cash back category in the market',
            benefits: 'Return protection, car rental loss and damage insurance',
            drawbacks: 'Grocery rewards cap out at $6,000 in annual spend',
            recommended_credit_score: 670,
        },
        {
            name: 'Venture Rewards',
            issuer: 'Capital One',
            image_url: 'https://example.com/images/venture-rewards.png',
            intro_bonus: 'Earn 75,000 miles after spending $4,000 in the first 3 months',
            reward_rates: '2x miles on every purchase',
            annual_fee: 95.00,
            apr: '19.99% - 29.99% Variable',
            unique_perks: 'Flat-rate miles with no rotating categories to track',
            benefits: 'Global Entry/TSA PreCheck credit, travel accident insurance',
            drawbacks: 'Fewer transfer partners compared to Chase',
            recommended_credit_score: 690,
        },
        {
            name: 'Discover it Cash Back',
            issuer: 'Discover',
            image_url: 'https://example.com/images/discover-it-cash-back.png',
            intro_bonus: 'Cashback match: Discover matches all cash back earned in the first year',
            reward_rates: '5% rotating quarterly categories (up to quarterly max), 1% on everything else',
            annual_fee: 0.00,
            apr: '17.24% - 28.24% Variable',
            unique_perks: 'First-year cashback match effectively doubles year-one rewards',
            benefits: 'Free FICO score access, no foreign transaction fees',
            drawbacks: 'Rotating categories require quarterly activation',
            recommended_credit_score: 640,
        },
    ],

    spending_categories: [
        { name: 'Groceries' },
        { name: 'Dining' },
        { name: 'Travel' },
        { name: 'Gas' },
        { name: 'Online Shopping' },
        { name: 'Entertainment' },
        { name: 'Utilities' },
        { name: 'Drugstores' },
    ],

    favorites: [
        { user_id: 1, credit_card_id: 1 },
        { user_id: 1, credit_card_id: 4 },
        { user_id: 2, credit_card_id: 3 },
        { user_id: 3, credit_card_id: 1 },
        { user_id: 3, credit_card_id: 2 },
        { user_id: 4, credit_card_id: 5 },
        { user_id: 5, credit_card_id: 4 },
        { user_id: 5, credit_card_id: 1 },
    ],

    reviews: [
        { user_id: 1, credit_card_id: 1, rating: 5, review_text: 'Excellent travel perks and the points transfer options make redemptions very flexible.' },
        { user_id: 2, credit_card_id: 3, rating: 4, review_text: 'Great grocery cash back, though the category cap can be limiting for larger households.' },
        { user_id: 3, credit_card_id: 1, rating: 5, review_text: 'Best card I have owned for dining and travel combined.' },
        { user_id: 3, credit_card_id: 2, rating: 3, review_text: 'Solid no-fee option, but rewards feel modest compared to premium cards.' },
        { user_id: 4, credit_card_id: 5, rating: 4, review_text: 'The first-year cashback match was a huge win for me.' },
        { user_id: 5, credit_card_id: 4, rating: 5, review_text: 'Simple flat-rate rewards with no category tracking required.' },
    ],

    recommendations: [
        { user_id: 1, credit_card_id: 4, match_score: 88, reason: 'Matches your frequent travel spending with strong flat-rate rewards.' },
        { user_id: 2, credit_card_id: 5, match_score: 75, reason: 'Good fit given your rotating category spending patterns.' },
        { user_id: 3, credit_card_id: 4, match_score: 91, reason: 'High credit score and travel spend align well with this card.' },
        { user_id: 4, credit_card_id: 2, match_score: 70, reason: 'No annual fee option suited to your current credit profile.' },
        { user_id: 5, credit_card_id: 1, match_score: 95, reason: 'Excellent credit score and dining spend make this a strong match.' },
    ],

    user_spending_interests: [
        { user_id: 1, spending_category_id: 2 },
        { user_id: 1, spending_category_id: 3 },
        { user_id: 2, spending_category_id: 1 },
        { user_id: 2, spending_category_id: 4 },
        { user_id: 3, spending_category_id: 3 },
        { user_id: 3, spending_category_id: 6 },
        { user_id: 4, spending_category_id: 5 },
        { user_id: 4, spending_category_id: 7 },
        { user_id: 5, spending_category_id: 1 },
        { user_id: 5, spending_category_id: 8 },
    ],

    card_spending_categories: [
        { credit_card_id: 1, spending_category_id: 2 },
        { credit_card_id: 1, spending_category_id: 3 },
        { credit_card_id: 2, spending_category_id: 5 },
        { credit_card_id: 3, spending_category_id: 1 },
        { credit_card_id: 3, spending_category_id: 4 },
        { credit_card_id: 3, spending_category_id: 8 },
        { credit_card_id: 4, spending_category_id: 3 },
        { credit_card_id: 5, spending_category_id: 6 },
    ],
}

const INSERT_QUERIES = {
    users: `
        INSERT INTO users (username, email, password_hash, credit_score)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
    `,

    credit_cards: `
        INSERT INTO credit_cards
            (name, issuer, image_url, intro_bonus, reward_rates, annual_fee, apr, unique_perks, benefits, drawbacks, recommended_credit_score)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `,

    spending_categories: `
        INSERT INTO spending_categories (name)
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING
    `,

    favorites: `
        INSERT INTO favorites (user_id, credit_card_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, credit_card_id) DO NOTHING
    `,

    reviews: `
        INSERT INTO reviews (user_id, credit_card_id, rating, review_text)
        VALUES ($1, $2, $3, $4)
    `,

    recommendations: `
        INSERT INTO recommendations (user_id, credit_card_id, match_score, reason)
        VALUES ($1, $2, $3, $4)
    `,

    user_spending_interests: `
        INSERT INTO user_spending_interests (user_id, spending_category_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, spending_category_id) DO NOTHING
    `,

    card_spending_categories: `
        INSERT INTO card_spending_categories (credit_card_id, spending_category_id)
        VALUES ($1, $2)
        ON CONFLICT (credit_card_id, spending_category_id) DO NOTHING
    `,
}


const PARAM_MAPPERS = {
    users: (u) => [u.username, u.email, u.password_hash, u.credit_score],

    credit_cards: (c) => [
        c.name, c.issuer, c.image_url, c.intro_bonus, c.reward_rates,
        c.annual_fee, c.apr, c.unique_perks, c.benefits, c.drawbacks, c.recommended_credit_score,
    ],

    spending_categories: (s) => [s.name],

    favorites: (f) => [f.user_id, f.credit_card_id],

    reviews: (r) => [r.user_id, r.credit_card_id, r.rating, r.review_text],

    recommendations: (r) => [r.user_id, r.credit_card_id, r.match_score, r.reason],

    user_spending_interests: (i) => [i.user_id, i.spending_category_id],

    card_spending_categories: (c) => [c.credit_card_id, c.spending_category_id],
}


export default {
    CLEAR_TABLES_QUERY,
    INIT_TABLE_QUERIES,
    SEED_DATA,
    INSERT_QUERIES,
    PARAM_MAPPERS
}

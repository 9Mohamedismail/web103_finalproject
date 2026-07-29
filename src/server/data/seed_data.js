// Contributor credit: Chris Lin.

const seedData = {
    users: [
        { githubid: 1001, username: "jsmith", avatarurl: "https://example.com/avatars/jsmith.png", accesstoken: "example-token-1", credit_score: 720 },
        { githubid: 1002, username: "amiller", avatarurl: "https://example.com/avatars/amiller.png", accesstoken: "example-token-2", credit_score: 680 },
        { githubid: 1003, username: "rgarcia", avatarurl: "https://example.com/avatars/rgarcia.png", accesstoken: "example-token-3", credit_score: 750 },
        { githubid: 1004, username: "tchen", avatarurl: "https://example.com/avatars/tchen.png", accesstoken: "example-token-4", credit_score: 610 },
        { githubid: 1005, username: "kpatel", avatarurl: "https://example.com/avatars/kpatel.png", accesstoken: "example-token-5", credit_score: 800 },
    ],

    credit_cards: [
        { api_card_id: "aaadvantage-aviator-red-world-elite-mastercard" },
        { api_card_id: "aadvantage-aviator-world-elite-business-mastercard" },
        { api_card_id: "aer-lingus-visa-signature-credit-card" },
        { api_card_id: "aeroplan-card" },
        { api_card_id: "air-france-klm-visa-signature-credit-card" },
        { api_card_id: "alliant-visa-signature-credit-card-with-cashback" },
        { api_card_id: "allure-mastercard" },
        { api_card_id: "allways-rewards-visa-credit-card" },
        { api_card_id: "amazon-prime-visa" },
        { api_card_id: "amazon-visa" },
        { api_card_id: "amazonca-rewards-mastercard" },
        { api_card_id: "american-airlines-aadvantage-mileup-card" },
        { api_card_id: "american-express-aeroplan-card" },
        { api_card_id: "american-express-air-miles-platinum-business-card" },
        { api_card_id: "american-express-blue-business-cash-card" },
        { api_card_id: "american-express-blue-business-plus-card" },
        { api_card_id: "american-express-business-edge-card" },
        { api_card_id: "american-express-business-gold-card" },
        { api_card_id: "american-express-business-green-card" },
        { api_card_id: "american-express-cobalt-card" },
    ],

    favorites: [
        { user_id: 1, credit_card_id: 3 },
        { user_id: 1, credit_card_id: 20 },
        { user_id: 2, credit_card_id: 6 },
        { user_id: 3, credit_card_id: 4 },
        { user_id: 3, credit_card_id: 10 },
        { user_id: 4, credit_card_id: 12 },
        { user_id: 5, credit_card_id: 20 },
        { user_id: 5, credit_card_id: 3 },
    ],

    reviews: [
        { user_id: 1, credit_card_id: 3, rating: 5, review_text: "Great signup bonus and the Avios transfer to British Airways is a huge win for European travel." },
        { user_id: 2, credit_card_id: 6, rating: 4, review_text: "Simple flat cash back with no annual fee, exactly what I wanted." },
        { user_id: 3, credit_card_id: 4, rating: 5, review_text: "Strong bonus categories for groceries and dining, worth the annual fee." },
        { user_id: 3, credit_card_id: 10, rating: 3, review_text: "Decent for Amazon purchases but rewards feel modest outside that category." },
        { user_id: 4, credit_card_id: 12, rating: 4, review_text: "No annual fee and a solid bonus for a starter AAdvantage card." },
        { user_id: 5, credit_card_id: 20, rating: 5, review_text: "The dining multiplier alone makes the annual fee worth it for me." },
    ],

    // perk_categories id map
    // 1 = annual_fee
    // 2 = annual_fee_waived
    // 3 = signup_bonus
    // 4 = reward_currency
    perk_categories: [
        { name: "annual_fee" },
        { name: "annual_fee_waived" },
        { name: "signup_bonus" },
        { name: "reward_currency" },
    ],

    // Normalization basis (from this 20-card set):
    // maxFee = 191.88 (american-express-cobalt-card)
    // maxSignupBonus = 75000 (aer-lingus-visa-signature-credit-card)
    // fee score = round(100 - (annual_fee / maxFee * 100))
    // waived score = annual_fee_waived_first_year ? 100 : 0  (all false in this set)
    // signup_bonus score = round(signup_bonus_value / maxSignupBonus * 100), null -> 0
    // reward_currency score = reward_currency !== null ? 100 : 0
    credit_card_perk_scores: [
        // 1 aaadvantage-aviator-red — fee0, waived false, bonus null, currency null
        { credit_card_id: 1, perk_category_id: 1, score: 100 },
        { credit_card_id: 1, perk_category_id: 2, score: 0 },
        { credit_card_id: 1, perk_category_id: 3, score: 0 },
        { credit_card_id: 1, perk_category_id: 4, score: 0 },

        // 2 aadvantage-aviator-business — fee0, waived false, bonus null, currency null
        { credit_card_id: 2, perk_category_id: 1, score: 100 },
        { credit_card_id: 2, perk_category_id: 2, score: 0 },
        { credit_card_id: 2, perk_category_id: 3, score: 0 },
        { credit_card_id: 2, perk_category_id: 4, score: 0 },

        // 3 aer-lingus — fee95, waived false, bonus75000, currency Avios
        { credit_card_id: 3, perk_category_id: 1, score: 50 },
        { credit_card_id: 3, perk_category_id: 2, score: 0 },
        { credit_card_id: 3, perk_category_id: 3, score: 100 },
        { credit_card_id: 3, perk_category_id: 4, score: 100 },

        // 4 aeroplan-card — fee95, waived false, bonus60000, currency points
        { credit_card_id: 4, perk_category_id: 1, score: 50 },
        { credit_card_id: 4, perk_category_id: 2, score: 0 },
        { credit_card_id: 4, perk_category_id: 3, score: 80 },
        { credit_card_id: 4, perk_category_id: 4, score: 100 },

        // 5 air-france-klm — fee89, waived false, bonus500, currency miles
        { credit_card_id: 5, perk_category_id: 1, score: 54 },
        { credit_card_id: 5, perk_category_id: 2, score: 0 },
        { credit_card_id: 5, perk_category_id: 3, score: 1 },
        { credit_card_id: 5, perk_category_id: 4, score: 100 },

        // 6 alliant-cashback — fee0, waived false, bonus null, currency Cash Back
        { credit_card_id: 6, perk_category_id: 1, score: 100 },
        { credit_card_id: 6, perk_category_id: 2, score: 0 },
        { credit_card_id: 6, perk_category_id: 3, score: 0 },
        { credit_card_id: 6, perk_category_id: 4, score: 100 },

        // 7 allure-mastercard — fee0, waived false, bonus150, currency points
        { credit_card_id: 7, perk_category_id: 1, score: 100 },
        { credit_card_id: 7, perk_category_id: 2, score: 0 },
        { credit_card_id: 7, perk_category_id: 3, score: 0 },
        { credit_card_id: 7, perk_category_id: 4, score: 100 },

        // 8 allways-rewards — fee59, waived false, bonus300, currency points
        { credit_card_id: 8, perk_category_id: 1, score: 69 },
        { credit_card_id: 8, perk_category_id: 2, score: 0 },
        { credit_card_id: 8, perk_category_id: 3, score: 0 },
        { credit_card_id: 8, perk_category_id: 4, score: 100 },

        // 9 amazon-prime-visa — fee0, waived false, bonus null, currency null
        { credit_card_id: 9, perk_category_id: 1, score: 100 },
        { credit_card_id: 9, perk_category_id: 2, score: 0 },
        { credit_card_id: 9, perk_category_id: 3, score: 0 },
        { credit_card_id: 9, perk_category_id: 4, score: 0 },

        // 10 amazon-visa — fee0, waived false, bonus50, currency cash back
        { credit_card_id: 10, perk_category_id: 1, score: 100 },
        { credit_card_id: 10, perk_category_id: 2, score: 0 },
        { credit_card_id: 10, perk_category_id: 3, score: 0 },
        { credit_card_id: 10, perk_category_id: 4, score: 100 },

        // 11 amazonca-rewards — fee0, waived false, bonus150, currency points
        { credit_card_id: 11, perk_category_id: 1, score: 100 },
        { credit_card_id: 11, perk_category_id: 2, score: 0 },
        { credit_card_id: 11, perk_category_id: 3, score: 0 },
        { credit_card_id: 11, perk_category_id: 4, score: 100 },

        // 12 aadvantage-mileup — fee0, waived false, bonus15000, currency AA
        { credit_card_id: 12, perk_category_id: 1, score: 100 },
        { credit_card_id: 12, perk_category_id: 2, score: 0 },
        { credit_card_id: 12, perk_category_id: 3, score: 20 },
        { credit_card_id: 12, perk_category_id: 4, score: 100 },

        // 13 amex-aeroplan-card — fee0, waived false, bonus null, currency miles
        { credit_card_id: 13, perk_category_id: 1, score: 100 },
        { credit_card_id: 13, perk_category_id: 2, score: 0 },
        { credit_card_id: 13, perk_category_id: 3, score: 0 },
        { credit_card_id: 13, perk_category_id: 4, score: 100 },

        // 14 amex-air-miles-platinum-business — fee0, waived false, bonus null, currency null
        { credit_card_id: 14, perk_category_id: 1, score: 100 },
        { credit_card_id: 14, perk_category_id: 2, score: 0 },
        { credit_card_id: 14, perk_category_id: 3, score: 0 },
        { credit_card_id: 14, perk_category_id: 4, score: 0 },

        // 15 amex-blue-business-cash — fee0, waived false, bonus null, currency null
        { credit_card_id: 15, perk_category_id: 1, score: 100 },
        { credit_card_id: 15, perk_category_id: 2, score: 0 },
        { credit_card_id: 15, perk_category_id: 3, score: 0 },
        { credit_card_id: 15, perk_category_id: 4, score: 0 },

        // 16 amex-blue-business-plus — fee0, waived false, bonus null, currency null
        { credit_card_id: 16, perk_category_id: 1, score: 100 },
        { credit_card_id: 16, perk_category_id: 2, score: 0 },
        { credit_card_id: 16, perk_category_id: 3, score: 0 },
        { credit_card_id: 16, perk_category_id: 4, score: 0 },

        // 17 amex-business-edge — fee0, waived false, bonus null, currency null
        { credit_card_id: 17, perk_category_id: 1, score: 100 },
        { credit_card_id: 17, perk_category_id: 2, score: 0 },
        { credit_card_id: 17, perk_category_id: 3, score: 0 },
        { credit_card_id: 17, perk_category_id: 4, score: 0 },

        // 18 amex-business-gold — fee0, waived false, bonus null, currency null
        { credit_card_id: 18, perk_category_id: 1, score: 100 },
        { credit_card_id: 18, perk_category_id: 2, score: 0 },
        { credit_card_id: 18, perk_category_id: 3, score: 0 },
        { credit_card_id: 18, perk_category_id: 4, score: 0 },

        // 19 amex-business-green — fee0, waived false, bonus null, currency null
        { credit_card_id: 19, perk_category_id: 1, score: 100 },
        { credit_card_id: 19, perk_category_id: 2, score: 0 },
        { credit_card_id: 19, perk_category_id: 3, score: 0 },
        { credit_card_id: 19, perk_category_id: 4, score: 0 },

        // 20 amex-cobalt — fee191.88, waived false, bonus15000, currency MR
        { credit_card_id: 20, perk_category_id: 1, score: 0 },
        { credit_card_id: 20, perk_category_id: 2, score: 0 },
        { credit_card_id: 20, perk_category_id: 3, score: 20 },
        { credit_card_id: 20, perk_category_id: 4, score: 100 },
    ],

    user_perk_weights: [
        { user_id: 1, perk_category_id: 1, weight: 20 },
        { user_id: 1, perk_category_id: 2, weight: 30 },
        { user_id: 1, perk_category_id: 3, weight: 90 },
        { user_id: 1, perk_category_id: 4, weight: 50 },

        { user_id: 2, perk_category_id: 1, weight: 90 },
        { user_id: 2, perk_category_id: 2, weight: 80 },
        { user_id: 2, perk_category_id: 3, weight: 20 },
        { user_id: 2, perk_category_id: 4, weight: 40 },

        { user_id: 3, perk_category_id: 1, weight: 60 },
        { user_id: 3, perk_category_id: 2, weight: 50 },
        { user_id: 3, perk_category_id: 3, weight: 60 },
        { user_id: 3, perk_category_id: 4, weight: 60 },

        { user_id: 4, perk_category_id: 1, weight: 95 },
        { user_id: 4, perk_category_id: 2, weight: 70 },
        { user_id: 4, perk_category_id: 3, weight: 10 },
        { user_id: 4, perk_category_id: 4, weight: 20 },

        { user_id: 5, perk_category_id: 1, weight: 10 },
        { user_id: 5, perk_category_id: 2, weight: 10 },
        { user_id: 5, perk_category_id: 3, weight: 95 },
        { user_id: 5, perk_category_id: 4, weight: 70 },
    ],
}

export default seedData

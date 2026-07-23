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
        { api_card_id: "chase-sapphire-preferred" },
        { api_card_id: "chase-freedom-unlimited" },
        { api_card_id: "blue-cash-preferred" },
        { api_card_id: "capital-one-venture-rewards" },
        { api_card_id: "discover-it-cash-back" },
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
        { user_id: 1, credit_card_id: 1, rating: 5, review_text: "Excellent travel perks and the points transfer options make redemptions very flexible." },
        { user_id: 2, credit_card_id: 3, rating: 4, review_text: "Great grocery cash back, though the category cap can be limiting for larger households." },
        { user_id: 3, credit_card_id: 1, rating: 5, review_text: "Best card I have owned for dining and travel combined." },
        { user_id: 3, credit_card_id: 2, rating: 3, review_text: "Solid no-fee option, but rewards feel modest compared to premium cards." },
        { user_id: 4, credit_card_id: 5, rating: 4, review_text: "The first-year cashback match was a huge win for me." },
        { user_id: 5, credit_card_id: 4, rating: 5, review_text: "Simple flat-rate rewards with no category tracking required." },
    ],
}

export default seedData

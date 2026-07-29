import express from "express"
import rec_service from "../services/rec_service.js"
import card_controller from "./card_controller.js"

//get req score for all cards
//expects user card preferences attached in body weight property
async function getAll(req, res) {
    let data;
    try {
        const cardApiResponse = await fetch(
            "https://adaptable-dream-production-2fce.up.railway.app/v1/cards",
            {
                headers: {
                    Authorization: `Bearer ${process.env.CARDAPI_API_KEY}`,
                },
            },
        );

        data = await cardApiResponse.json();

        if (!cardApiResponse.ok) {
            return res.status(cardApiResponse.status).json(data);
        }

    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve cards" });
    }



    let user_weights = req.body?.weights
    const user_id = req.user.id
    // user already finished survey, fetch from db
    if (!user_weights)
        user_weights = await rec_service.getWeightsByUser(user_id)


    // flatten to { perk: weight, ... }
    const weights_by_perk = {};
    user_weights.forEach(weight => {
        weights_by_perk[weight.perk_category_id] = weight.weight
    })

    const card_scores = await rec_service.getAllScores()
    const card_perks = {};

    // group by card { card: [ { ... } ] }
    card_scores.forEach(row => {
        card_perks[row.credit_card_id] ??= []
        card_perks[row.credit_card_id].push(row)
    })

    const rec_scores = {}

    // weighted sum
    for (const [card, perk_scores] of Object.entries(card_perks)) {
        let card_score = 0;
        let weights_sum = 0;
        for (const { perk_category_id, score } of perk_scores) {
            const weight = weights_by_perk[perk_category_id] ?? 0
            card_score += weight * score
            weights_sum += weight
        }
        //normalize
        card_score = Math.round(card_score / (weights_sum))
        rec_scores[card] = card_score
    }

    res.json(rec_scores)
}

export default {
    getAll,
}

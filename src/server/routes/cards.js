import express from "express";
import passport from "passport";
import rec_controller from "../controllers/rec_controller.js";
import card_controller from "../controllers/card_controller.js";

const is_authenticated = async (req, res, next) => {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Error: must be authenticated to access this resource" })

    next()
}

const router = express.Router();

router.get("/", card_controller.getAll);

router.post("/rec", is_authenticated, rec_controller.getAll);


export default router;

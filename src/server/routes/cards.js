import express from "express";
import passport from "passport";
import rec_controller from "../controllers/rec_controller.js";
import card_controller from "../controllers/card_controller.js";

const router = express.Router();

router.get("/", card_controller.getAll);

router.get("/rec/:user", passport.authenticate("github", {
    scope: ["read:user"],
}), rec_controller.getAll);


export default router;

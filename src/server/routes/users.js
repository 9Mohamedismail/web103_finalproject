import express from "express";
import requireAuthentication from "../middleware/require_auth.js";
import users_controller from "../controllers/users_controller.js";

const router = express.Router();

router.patch(
    "/me/credit-score",
    requireAuthentication,
    users_controller.updateCreditScore,
);

export default router;

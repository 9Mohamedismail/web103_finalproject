import express from "express";
import favorites_controller from "../controllers/favorites_controller.js";
import requireAuthentication from "../middleware/require_auth.js";

const router = express.Router();

router.get("/favorites/me", requireAuthentication, favorites_controller.getMine);
router.post(
    "/cards/:cardId/favorite",
    requireAuthentication,
    favorites_controller.create,
);
router.delete(
    "/cards/:cardId/favorite",
    requireAuthentication,
    favorites_controller.remove,
);

export default router;

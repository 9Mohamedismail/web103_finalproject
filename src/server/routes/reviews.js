import express from "express";
import reviews_controller from "../controllers/reviews_controller.js";
import requireAuthentication from "../middleware/require_auth.js";

const router = express.Router();

router.get("/cards/:cardId/reviews", reviews_controller.getAll);
router.get("/reviews/me", requireAuthentication, reviews_controller.getMine);
router.post(
    "/cards/:cardId/reviews",
    requireAuthentication,
    reviews_controller.create,
);
router.patch(
    "/reviews/:reviewId",
    requireAuthentication,
    reviews_controller.update,
);
router.delete(
    "/reviews/:reviewId",
    requireAuthentication,
    reviews_controller.remove,
);

export default router;

import express from "express";
import card_controller from "../controllers/card_controller.js";

const router = express.Router();

router.get("/", card_controller.getAll);
router.get("/:id", card_controller.getById);

export default router;

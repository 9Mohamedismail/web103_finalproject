import express from "express";

const router = express.Router();

router.get("/cards", async (req, res) => {
  try {
    const cardApiResponse = await fetch(
      "https://adaptable-dream-production-2fce.up.railway.app/v1/cards",
      {
        headers: {
          Authorization: `Bearer ${process.env.CARDAPI_API_KEY}`,
        },
      },
    );

    const data = await cardApiResponse.json();

    if (!cardApiResponse.ok) {
      return res.status(cardApiResponse.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve cards" });
  }
});

export default router;

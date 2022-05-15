const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

const axios = require("axios").default;

const apiKey = process.env.API_KEY;

router.get("/comics/:comicsId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicsId}?apiKey=${apiKey}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

const axios = require("axios");

const apiKey = process.env.API_KEY;

router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
    );
    // console.log(response.data.results[0].name);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

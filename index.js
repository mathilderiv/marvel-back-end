const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const axios = require("axios").default;

const app = express();
app.use(formidable());
app.use(cors());

require("dotenv").config();

///import des différentes routes

const comicsRoute = require("./routes/comics");
app.use(comicsRoute);

const charactersRoute = require("./routes/characters");
app.use(charactersRoute);

const comicIdRoute = require("./routes/comicsCharacters");
app.use(comicIdRoute);

const characterCharacterRoute = require("./routes/charactersCharacters");
app.use(characterCharacterRoute);

app.get("/", (req, res) => {
  res.status(200).json("Welcome");
});

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

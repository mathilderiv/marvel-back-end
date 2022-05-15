require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const axios = require("axios");

const mongoose = require("mongoose");

const app = express();
app.use(formidable());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
  console.log("connected");
});

///import des différentes routes

const comicsRoute = require("./routes/comics");
app.use(comicsRoute);

const charactersRoute = require("./routes/characters");
app.use(charactersRoute);

const comicIdRoute = require("./routes/comicsCharacters");
app.use(comicIdRoute);

const characterCharacterRoute = require("./routes/name");
app.use(characterCharacterRoute);

const signinRoute = require("./routes/signin");
app.use(signinRoute);

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

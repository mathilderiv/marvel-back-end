const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//Import du modèle User

const User = require("../models/User");

router.post("/signin", async (req, res) => {
  // Ici je vais mettre toute la logique pour le login et le signup
  const { username, email, password } = req.fields;
  try {
    if (username && email && password) {
      const emailExist = await User.findOne({ email: email });
      const usernameExist = await User.findOne({ username: username });

      //Si email n'existe pas déjà

      if (!usernameExist) {
        if (!emailExist) {
          const token = uid2(16);
          const salt = uid2(16);
          const hash = SHA256(password + salt).toString(encBase64);

          const newUser = new User({
            username,
            email,
            token,
            salt,
            hash,
          });

          await newUser.save();

          res.json({
            _id: newUser._id,
            email: email,
            username: username,
            token: token,
          });
        } else {
          res.status(400).json({ message: "Cet email existe déjà" });
        }
      } else {
        res.status(400).json({ message: "Cet username existe déjà" });
      }
    } else {
      res.status(400).json({ message: "Vous devez compléter tous les champs" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

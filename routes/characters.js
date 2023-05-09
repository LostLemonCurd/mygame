const express = require("express");
const router = express.Router();
const characters = require("../services/characters");

/* GET */
router.get("/", async function (req, res, next) {
  try {
    res.json(await characters.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting characters `, err.message);
    next(err);
  }
});

module.exports = router;
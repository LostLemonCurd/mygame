const express = require("express");
const router = express.Router();
const characters = require("../services/getCharacter");

/* GET */
router.get("/", async function (req, res, next) {
  try {
    console.log(req.query.id);
    res.json(await characters.getMultiple(req.query.page, req.query.id));
  } catch (err) {
    console.error(`Error while getting characters `, err.message);
    next(err);
  }
});

module.exports = router;
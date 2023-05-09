const express = require("express");
const router = express.Router();
const patterns = require("../services/pattern.js");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await patterns.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting patterns `, err.message);
    next(err);
  }
});

module.exports = router;
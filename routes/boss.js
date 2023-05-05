const express = require("express");
const router = express.Router();
const boss = require("../services/boss.js");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await boss.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting boss `, err.message);
    next(err);
  }
});

module.exports = router;
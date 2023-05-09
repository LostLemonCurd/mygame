const express = require("express");
const router = express.Router();
const projectile = require("../services/projectile");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await projectile.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting projectile `, err.message);
    next(err);
  }
});

module.exports = router;
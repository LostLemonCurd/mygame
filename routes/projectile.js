const express = require("express");
const router = express.Router();
const projectile = require("../services/projectile");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    console.log(req.query.id);
    res.json(await projectile.getMultiple(req.query.page, req.query.id));
  } catch (err) {
    console.error(`Error while getting projectile `, err.message);
    next(err);
  }
});

module.exports = router;
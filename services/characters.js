// importations

const db = require("./db");
const helper = require("../helper");
const config = require("../config");

// on récupère toutes les infos de characters 

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM characters`);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

module.exports = {
  getMultiple
};
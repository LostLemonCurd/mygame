const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1, params) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`SELECT * FROM characters WHERE id = ${params}`);
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
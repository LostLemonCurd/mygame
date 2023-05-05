let mysql = require("mysql");
const config = require("../config")

// Prepare the connection to the database named "dbTest"
let con = mysql.createConnection(config.db);

// Tries to connect
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  // If it works, insert 4 new rows inside the characters table
  let sql = "INSERT INTO projectile (sprite, dmg, speed, isFriendly) VALUES ?";
  let values = [
    ["bullet", 12, 1400, true],
    ["couteau", 8, 1200, true],
    ["carotte", 10, 900, true],
    ["punch", 5, 1800, true],
    ["rock", 10, 1600, true],
    ["snowball", 20, 1000, true],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
  // If it works, insert 4 new rows inside the characters table
  sql = "INSERT INTO characters (sprite, health, speed, jumpForce, canFly, projectile, spliceX) VALUES ?";
  values = [
    ["stormy", "300", "200", "800", "1", "3", "7"],
    ["ninja", "150", "400", "1000", "0", "2", "8"],
    ["bunny", "240", "300", "1200", "0", "1", "9"],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

  // If it works, insert 4 new rows inside the characters table
  sql = "INSERT INTO boss (sprite, health) VALUES ?";
  values = [
    ["robot", "200"],
    ["golem", "400"],
    ["snowman", "800"],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });



  // If it works, insert 4 new rows inside the characters table
  sql = "INSERT INTO pattern (idBoss, idProj, amount) VALUES ?";
  values = [
    [1, 4, 1],
    [2, 5, 1],
    [3, 6, 1],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
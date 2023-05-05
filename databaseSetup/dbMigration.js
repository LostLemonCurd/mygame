let mysql = require("mysql");

// Prepare the connection to the database named "dbTest"
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 8889,
  database: "arenaHeroes"
});

// Tries to connect
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // If it works, insert 4 new rows inside the characters table
  let sql = "INSERT INTO characters (sprite, health, speed, jumpForce, canFly, projectile) VALUES ?";
  let values = [
    ["bunny", "240", "300", "1200", "false", "1"],
    ["ninja", "150", "400", "1000", "false", "2"],
    ["stormy", "300", "200", "800", "true", "3"],
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
  sql = "INSERT INTO projectile (sprite, dmg, speed, isFriendly) VALUES ?";
  values = [
    ["carotte", 10, 900, true],
    ["couteau", 8, 1200, true],
    ["bullet", 12, 1400, true],
    ["punch", 5, 1800, true],
    ["rock", 10, 1600, true],
    ["snowball", 20, 1000, true],
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
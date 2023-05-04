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
  let sql = "INSERT INTO characters (name, hitpoints) VALUES ?";
  let values = [
    ["Bender B Rodriguez", "345"],
    ["Nicolas Cage", "200"],
    ["George Abitbol", "300"],
    ["Joel Fauvelet de Charbonniere de Bourrienne", "666"]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
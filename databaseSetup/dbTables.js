const mysql = require("mysql");

// createConnection prépare la connexion à la base de données
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "arenaHeroes",
}); 

con.connect(function (err){
    if (err) throw err;
    console.log("Connected!");
    // If the table characters does not exists, create it
    let sql = 
    "CREATE TABLE IF NOT EXISTS characters (id INT AUTO_INCREMENT PRIMARY KEY, sprite VARCHAR(255), health INT, speed INT, jumpForce INT, canFly BOOLEAN, projectile INT, FOREIGN KEY (projectile) references projectile(id))";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("Table characters created");
    });

    sql = 
    "CREATE TABLE IF NOT EXISTS boss (id INT AUTO_INCREMENT PRIMARY KEY, sprite VARCHAR(255), health INT)";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("Table boss created");
    });

    sql = 
    "CREATE TABLE IF NOT EXISTS projectile (id INT AUTO_INCREMENT PRIMARY KEY, sprite VARCHAR(255), dmg INT, speed INT, gravity FLOAT, isFriendly BOOLEAN)";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("Table projectile created");
    });

    sql = 
    "CREATE TABLE IF NOT EXISTS pattern (id INT AUTO_INCREMENT PRIMARY KEY, idBoss INT, idProj INT, amount INT, FOREIGN KEY (idBoss) references boss(id), FOREIGN KEY (idProj) references projectile(id))";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("Table pattern created");
    });
});
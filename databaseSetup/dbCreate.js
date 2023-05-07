const mysql = require("mysql");


// createConnection prépare la connexion à la base de données
let con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
}); 

// connect permet de se connecter à la base de données on execute la préparation de la connexion
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS arenaHeroes", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});



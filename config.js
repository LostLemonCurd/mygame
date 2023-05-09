const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "root", // Enlever le mot de passe si vous êtes sur Windows  (password: "",)
        port: 8889, // Enlever la ligne si vous êtes sur Windowss
        database: "arenaHeroes"
    },
    listPerPages: 10
};

module.exports = config;
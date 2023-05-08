const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "root", // Enlever le mot de passe si vous êtes sur Windows
        port: 8889, // À modifier selon votre OS
        database: "arenaHeroes"
    },
    listPerPages: 10
};

module.exports = config;
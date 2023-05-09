const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const charactersRouter = require('./routes/characters');
const bossRouter = require('./routes/boss');
const patternRouter = require('./routes/pattern');
const projectileRouter = require('./routes/projectile');
const getCharacterRouter = require('./routes/getCharacter');
const getProjectileRouter = require('./routes/getProjectile');

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(express.static('public'));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/characters", charactersRouter);
app.use("/boss", bossRouter);
app.use("/projectile", projectileRouter);
app.use("/pattern", patternRouter);
app.use("/getCharacter", getCharacterRouter);
app.use("/getProjectile", getProjectileRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});


var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Example server listening at http://${host}:${port}`)
});
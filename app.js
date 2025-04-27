require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_, res) => {
    res.send('Serverul funcționează!');
});

app.listen(PORT, () => {
    console.log(`Serviciul rulează la http://localhost:${PORT}`);
});

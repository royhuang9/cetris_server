const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

const key = fs.readFileSync(path.join(__dirname, 'certs', 'signed', 'key.pem'));
const cert = fs.readFileSync(path.join(__dirname, 'certs', 'signed', 'cert.pem'));

const options = {
    key: key,
    cert: cert
};


const PORT = process.env.PORT || 3500;

app.use(express.static('Tetris-js'));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/cetris', (req, res) => {
    res.sendFile(path.join(__dirname, 'Tetris-js', 'Mobilegame.html'));
});


app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

let server = https.createServer(options, app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
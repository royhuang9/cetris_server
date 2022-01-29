const express = require('express');
const app = express();

const path = require('path');
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
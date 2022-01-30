const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const { score_board, insert_score} = require('./data.js')

const app = express();

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.static('Tetris-js'));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/cetris', (req, res) => {
    res.sendFile(path.join(__dirname, 'Tetris-js', 'Mobilegame.html'));
});

app.get('/score.json', (req, res) => {
    res.json(score_board);
});

app.post('/score.json', (req, res) => {
    let new_score = req.body;
    console.log(new_score);

    insert_score(new_score.username, new_score.lines, new_score.level, new_score.score);

    res.json(score_board);
    console.log(score_board);
});

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
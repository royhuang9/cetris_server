const fs = require('fs');
const path = require('path');

let score_board = {};

if (fs.existsSync(path.join(__dirname, 'scores.json'))) {
    score_board = JSON.parse(fs.readFileSync(path.join(__dirname, 'scores.json'), 'utf8'));
} else {
    score_board = {
        user_count: 2,
        scores: [{
            username: "Rick",
            lines: "123",
            level: "12",
            score: 105310
        },
        {
            username: "Roy",
            lines: "2",
            level: "1",
            score: 100
        }]
    }
};


const insert_score = (username, lines, level, score) => {
    let index = score_board.scores.findIndex( ele => ele.username === username);

    if (index === -1) {
        score_board.user_count++;
        score_board.scores.push(
            {
                username: username,
                lines: lines,
                level: level,
                score: score
            });
    } else {
        if (score > score_board.scores[index].score) {
            score_board.scores[index].lines = lines;
            score_board.scores[index].level = level;
            score_board.scores[index].score = score;
        }
    }

    score_board.scores.sort((a, b) => {
        return b.score - a.score ;   
    });

    while (score_board.user_count > 10) {
        score_board.scores.pop();
        score_board.user_count --;
    }

    fs.writeFile(path.join(__dirname, 'scores.json'), JSON.stringify(score_board), err => {
        if (err) {
            console.log('Eoor writing file', err);
        }
    });
};

console.log(JSON.stringify(score_board));

module.exports = {
    score_board,
    insert_score
}
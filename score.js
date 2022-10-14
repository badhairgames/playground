class Score {
    constructor(game) {
        this.docWidth = game.width;
        this.docHeight = game.height;
        this.ctx = game.ctx;
        this.game = game;
        this.reset();
    }

    reset() {
        this.score = 0;
        this.highscore = localStorage.getItem(this.game.storageHighScore);
        if (!this.highscore) this.highscore = 0;
        this.highscoreColour = '#999999';
    }

    draw() {
        this.ctx.font = '30pt sans-serif';
        this.ctx.fillStyle = '#ffffff';
        let scoreStr = String(this.score).padStart(5, '0');
        let text = this.ctx.measureText(scoreStr);
        this.ctx.fillText(scoreStr, this.docWidth - text.width - 10, 50);

        this.ctx.font = '15pt sans-serif';
        this.ctx.fillStyle = this.highscoreColour;
        let hiscoreStr = 'HIGH: ' + String(this.highscore).padStart(5, '0');
        text = this.ctx.measureText(hiscoreStr);
        this.ctx.fillText(hiscoreStr, this.docWidth - text.width - 10, 80);
    }
 
    update(add) {
        this.score += add;
        if (this.score > this.highscore) {
            this.highscore = this.score;
            this.highscoreColour = '#77ff77';
        }
    }
}

export { Score };
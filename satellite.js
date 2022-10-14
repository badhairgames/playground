class Satellite {
    constructor(game) {
        this.game = game;
        this.ctx = game.ctx;
        this.satW = 150;
        this.satH = 100;
        this.frameCount = 2;
        this.hit = false;
        this.opacity = 1;

        this.satellite = new Image(this.satW, this.satH);
        this.satellite.src = 'images/satSprites.png';
        this.docWidth = game.canvas.clientWidth;
        this.docHeight = game.canvas.clientHeight;
        this.frame = 0;
        this.x = 0;
        this.y = 0;
        this.diff = 5;
        this.interval = 5;
        this.complete = false;

        this.resetPosition();
    }

    update(elapsedTime) {
        var multiplier = elapsedTime / 25;

        if (this.x >= this.docWidth || this.x < -this.satW) {
            this.diff = -this.diff;
            this.y = getRandomInt(30, 350);
            this.game.lives.update(-1);
        }
    
        let yOffset = Math.sin(this.x / 50) * 5;

        this.x += this.diff * multiplier;
        this.y += yOffset;

        this.interval -= multiplier;
        if (this.interval <= 0) {
            this.interval = 5;
            this.nextFrame();
        }
    }

    draw() {
        const frameX = this.frame * this.satW;
        this.ctx.drawImage(this.satellite, frameX, 0, this.satW, this.satH, this.x, this.y, this.satW, this.satH);
    }

    isHit(x, y) {
        if (x < this.boundX1 || x > this.boundX2) return false;
        if (y < this.boundY1 || y > this.boundY2) return false;
        return true;
    }

    nextFrame() {
        this.frame++;
        if (this.frame >= this.frameCount) {
            this.frame = 0;
        }
    }

    resetPosition() {
        this.x = -this.satW;
        this.y = getRandomInt(0, 250);
    }

    isComplete() {
        if (this.complete) return true;
        const tolerance = this.satW + 10;
        if (this.x < -tolerance || this.x > this.docWidth + tolerance) return true;
        if (this.y < -tolerance) return true;
        return false;
    }

    get boundX1() { return this.x + 30; }
    get boundX2() { return this.x + this.satW - 50; }
    get boundY1() { return this.y + 10; }
    get boundY2() { return this.y + this.satH - 18; }
}

export { Satellite };
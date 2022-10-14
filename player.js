class Player {
    constructor(game) {
        this.docWidth = game.width;
        this.docHeight = game.height;
        this.ctx = game.ctx;
        this.halfWidth = this.docWidth / 2;
        this.rotationLimit = 80;
        this.direction = 0;
        this.rotation = 0;

        this.turnLeft();
        // this.draw();
    }

    turnLeft() {
        this.rotation--;
        this.direction = -1;
    }

    turnRight() {
        this.rotation++;
        this.direction = 1;
    }

    update(elapsedTime) {
        var multiplier = elapsedTime / 25;

        if (this.rotation > -this.rotationLimit && this.rotation < this.rotationLimit) {
            this.rotation += this.direction * multiplier;
        }

        if (this.rotation <= -this.rotationLimit) this.rotation = -this.rotationLimit;
        if (this.rotation >= this.rotationLimit) this.rotation = this.rotationLimit;
    }

    draw() {
        const colour = "#6699ff";
        const rotation = this.rotation * (Math.PI / 180);
        this.ctx.save();
        
        this.ctx.translate(this.halfWidth, this.docHeight);
        this.ctx.rotate(rotation);
        this.ctx.translate(-this.halfWidth, -this.docHeight);

        this.ctx.beginPath();
        this.ctx.fillStyle = colour;
        this.ctx.arc(this.halfWidth, this.docHeight, 50, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.strokeStyle = colour;
        this.ctx.moveTo(this.halfWidth, this.docHeight);
        this.ctx.lineWidth = 10;
        this.ctx.lineCap = 'round';
        this.ctx.lineTo(this.halfWidth, this.docHeight - 60);
        this.ctx.stroke();

        this.ctx.restore();
    }
}

export { Player };
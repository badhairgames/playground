class Background {
    constructor(game) {
        this.docWidth = game.width;
        this.docHeight = game.height;
        this.ctx = game.ctx;
        this.imgW = 1920;
        this.imgH = 1280;

        this.y = 0;
        this.diff = 1;
        this.limit = 40;

        this.layer1stars = [];
        this.layer2stars = [];
        this.layer3stars = [];

        this.populateStars(this.layer1stars, 400);
        this.populateStars(this.layer2stars, 200);
        this.populateStars(this.layer3stars, 100);

        this.gradient = this.ctx.createLinearGradient(0, 0, 0, this.docHeight);
        this.gradient.addColorStop(0, '#000000');
        this.gradient.addColorStop(1, '#000044');
    }

    populateStars(layer, amount) {
        for (let i = 0; i < amount; i++) {
            const x = getRandomInt(0, this.docWidth);
            const y = getRandomInt(0, this.docHeight);
            layer.push({ x: x, y: y });
        }
    }

    update(elapsedTime) {
        if (this.y > this.limit || this.y < 0) this.diff = -this.diff;
        const time1 = elapsedTime / 100;
        const time2 = elapsedTime / 70;
        const time3 = elapsedTime / 50;

        this.y += (this.diff * (elapsedTime / 100));
        this.moveStars(this.layer1stars, time1);
        this.moveStars(this.layer2stars, time2);
        this.moveStars(this.layer3stars, time3);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, this.docWidth, this.docHeight);
        this.ctx.fill();
        this.drawStars(this.layer1stars, '#444444', 1);
        this.drawStars(this.layer2stars, '#444488', 1.5);
        this.drawStars(this.layer3stars, '#888888', 2);
    }
 
    drawStars(layer, colour, size) {
        for (let i = 0; i < layer.length; i++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = colour;
            this.ctx.arc(layer[i].x, layer[i].y, size, 0, 2 * Math.PI);
            this.ctx.fill();    
        }
    }

    moveStars(layer, amount) {
        for (let i = 0; i < layer.length; i++) {
            layer[i].y += amount;
            if (layer[i].y > this.docHeight) {
                layer[i].y -= this.docHeight;
            }
        }
    }

}

export { Background };
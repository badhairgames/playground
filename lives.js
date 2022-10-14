import { Particle } from './particle.js';

class Lives {
    constructor(game) {
        this.docWidth = game.width;
        this.docHeight = game.height;
        this.ctx = game.ctx;
        this.lives = 2;
        this.heartWidth = 35;
        this.heartColour = '#ff6600';
        this.particleX = (this.lives * this.heartWidth) + 20;
        this.particles = [];
        this.loseLifeSound = new Audio('sounds/lifegone.mp3');
    }

    draw() {
        var x = 20;
        var y = 10;
        for (var i = 0; i < this.lives; i++) {
            this.drawHeart(x, y, this.heartWidth, this.heartWidth, this.heartColour);
            x += this.heartWidth + 10;
        }

        this.drawParticles();
    }

    update(add) {
        this.lives += add;
        if (this.lives < 0) {
            this.lives = 0;
        }
        else if (add < 0) {
            this.explode();
        }
    }

    // From https://stackoverflow.com/questions/58333678/draw-heart-using-javascript-in-any-postionx-y
    drawHeart(x, y, width, height, colour) {
        x += (this.heartWidth / 2);
        this.ctx.save();
        this.ctx.beginPath();
        var topCurveHeight = height * 0.3;
        this.ctx.moveTo(x, y + topCurveHeight);
        // top left curve
        this.ctx.bezierCurveTo(
          x, y, 
          x - width / 2, y, 
          x - width / 2, y + topCurveHeight
        );
      
        // bottom left curve
        this.ctx.bezierCurveTo(
          x - width / 2, y + (height + topCurveHeight) / 2, 
          x, y + (height + topCurveHeight) / 2, 
          x, y + height
        );
      
        // bottom right curve
        this.ctx.bezierCurveTo(
          x, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + topCurveHeight
        );
      
        // top right curve
        this.ctx.bezierCurveTo(
          x + width / 2, y, 
          x, y, 
          x, y + topCurveHeight
        );
      
        this.ctx.closePath();
        this.ctx.fillStyle = colour;
        this.ctx.fill();
        this.ctx.restore();
      
    }
      
    explode() {
        this.particles.length = 0;
        for (var i = 0; i < 100; i++) {
            var particle = new Particle(this.ctx, this.particleX, 20, this.heartColour, 3);
            this.particles.push(particle);
        }

        this.particleX -= (this.heartWidth + 10);
        this.loseLifeSound.play();
    }

    drawParticles() {
        if (this.particles && this.particles.length > 0) {
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        }
    }
}

export { Lives };
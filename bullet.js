import { Particle } from './particle.js';

class Bullet {
    constructor(game, hitCallback) {
        this.docWidth = game.width;
        this.docHeight = game.height;
        this.ctx = game.ctx;
        this.startX = this.docWidth / 2;
        this.startY = this.docHeight;
        this.x = this.startX;
        this.y = this.startY;
        this.satellites = game.satellites;
        this.fireLineLength = Math.sqrt(this.startX * this.startX + this.startY * this.startY) + 50;
        this.fireDistance = 0;
        this.rotation = 0;
        this.particles = [];
        this.hitCallback = hitCallback;
        this.fireSound = new Audio('sounds/shoot.ogg');
        this.explodeSound = new Audio('sounds/explode.mp3');
    }

    fire(rotation) {
        this.reset();
        this.fireDistance = 50;
        this.rotation = rotation;
        this.fireSound.play();
    }

    clear() {
        this.particles.length = 0;
    }

    reset() {
        this.fireDistance = 0;
    }

    explode() {
        this.particles.length = 0;
        for (var i = 0; i < 100; i++) {
            var particle = new Particle(this.ctx, this.x, this.y);
            this.particles.push(particle);
        }
        this.explodeSound.play();
    }

    update(elapsedTime) {
        if (this.fireDistance == 0) return;
        var multiplier = elapsedTime / 10;

        this.fireDistance =
            this.fireDistance > this.fireLineLength ? this.fireDistance : this.fireDistance + 3 * multiplier;

        if (this.satellites && this.satellites.length > 0) {
            for (var s = 0; s < this.satellites.length; s++) {
                if (this.satellites[s].isHit(this.x, this.y)) {
                    this.hitCallback(this, this.satellites[s]);
                    this.reset();
                }
            }
        }
    }

    draw() {
        const colour = '#ff0000';
        const rotation = this.rotation * (Math.PI / 180);

        var p = this.startX;
        var q = this.startY;
        var x = this.startX;
        var y = this.startY - this.fireDistance;
        var cos = Math.cos(rotation);
        var sin = Math.sin(rotation);

        var x2 = (x - p) * cos - (y - q) * sin + p;
        var y2 = (x - p) * sin + (y - q) * cos + q;

        this.ctx.beginPath();
        this.ctx.fillStyle = colour;
        this.ctx.arc(x2, y2, 10, 0, 2 * Math.PI);
        this.ctx.fill();

        this.x = x2;
        this.y = y2;
    }

    drawParticles() {
        if (this.particles && this.particles.length > 0) {
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        }
    }

    isComplete() {
        const tolerance = 10;
        if (this.x < -tolerance || this.x > this.docWidth + tolerance) return true;
        if (this.y < -tolerance) return true;
        if (this.particles && this.particles.length > 0) {
            for (let i = 0; i < this.particles.length; i++) {
                if (this.particles[i].r > 0.1) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}

export { Bullet };

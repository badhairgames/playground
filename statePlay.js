import { GameState } from './gameState.js';
import { Bullet } from './bullet.js';
import { Satellite } from './satellite.js';
import { Lives } from './lives.js';

class StatePlay extends GameState {
    constructor(game) {
        super(game);

        this.bulletRate = 250;
        this.currentRate = this.bulletRate;
        this.canShoot = true;

        this.hit = (bullet, satellite) => {
            if (!bullet || !this.game.bullets || this.game.bullets.length == 0) {
                return;
            }

            bullet.explode();
            satellite.complete = true;
            this.game.score.update(10);
        };
    }

    setup() {
        this.game.lives = new Lives(this.game);
        this.game.score.score = 0;
        this.game.satellites.length = 0;
        this.game.score.reset();
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.touchStartEvent = (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        };
        this.touchEndEvent = (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        };
        this.mouseMoveEvent = (e) => {
            this.touchStartX = 0;
            this.touchEndX = e.movementX;
            this.handleSwipe();
        };
        this.touchEndEvent = (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        };
        this.clickEvent = (e) => {
            this.fire();
        };

        this.keyEvents = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.game.player.turnLeft();
                    break;
                case 'ArrowRight':
                    this.game.player.turnRight();
                    break;
                case ' ':
                    this.fire();
                    break;
            }
        };

        document.body.addEventListener('keydown', this.keyEvents);
        document.body.addEventListener('touchstart', this.touchStartEvent);
        document.body.addEventListener('touchend', this.touchEndEvent);
        document.body.addEventListener('mousemove', this.mouseMoveEvent);
        document.body.addEventListener('pointerdown', this.clickEvent);
    }

    handleSwipe() {
        if (this.touchEndX < this.touchStartX) {
            this.game.player.turnLeft();
        } else if (this.touchEndX > this.touchStartX) {
            this.game.player.turnRight();
        }
    }

    fire() {
        if (this.canShoot) {
            var b = new Bullet(this.game, this.hit);
            b.fire(this.game.player.rotation);
            this.game.bullets.push(b);
            this.canShoot = false;
        }
    }

    update(elapsed) {
        if (elapsed > this.game.satelliteSpawnTime || this.game.satellites.length === 0) {
            this.game.satelliteSpawnTime = 6000;
            this.game.satellites.push(new Satellite(this.game));
        }

        if (this.currentRate < 0) {
            this.currentRate = this.bulletRate;
            this.canShoot = true;
        } else {
            this.currentRate -= elapsed;
        }

        this.game.satelliteSpawnTime -= elapsed;

        this.game.bg.update(elapsed);

        for (var s = 0; s < this.game.satellites.length; s++) {
            this.game.satellites[s].update(elapsed);
        }

        for (var i = 0; i < this.game.bullets.length; i++) {
            this.game.bullets[i].update(elapsed);
        }

        this.game.player.update(elapsed);
    }

    draw() {
        this.game.bg.draw();

        for (var s = 0; s < this.game.satellites.length; s++) {
            this.game.satellites[s].draw();
        }

        for (var i = 0; i < this.game.bullets.length; i++) {
            this.game.bullets[i].draw();
            this.game.bullets[i].drawParticles();
        }
        this.game.player.draw();
        this.cleanBullets();
        this.cleanSatellites();
        this.game.score.draw();
        this.game.lives.draw();

        if (this.game.lives.lives === 0) {
            this.game.changeState(this.game.stateGameOver);
        }
    }

    teardown() {
        document.body.removeEventListener('keydown', this.keyEvents);
        document.body.removeEventListener('touchstart', this.touchStartEvent);
        document.body.removeEventListener('touchend', this.touchEndEvent);
        document.body.removeEventListener('mousemove', this.mouseMoveEvent);
        document.body.removeEventListener('pointerdown', this.clickEvent);

        const oldHighScore = localStorage.getItem(this.game.storageHighScore);
        if (!oldHighScore || this.game.score.score > oldHighScore) {
            localStorage.setItem(this.game.storageHighScore, this.game.score.score);
        }
    }

    cleanBullets() {
        for (var i = this.game.bullets.length - 1; i >= 0; i--) {
            if (this.game.bullets[i].isComplete()) {
                this.game.bullets[i].clear();
                this.game.bullets.splice(i, 1);
            }
        }
    }

    cleanSatellites() {
        for (var i = this.game.satellites.length - 1; i >= 0; i--) {
            if (this.game.satellites[i].isComplete()) {
                this.game.satellites.splice(i, 1);
            }
        }
    }
}

export { StatePlay };

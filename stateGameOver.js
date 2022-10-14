import { GameState } from "./gameState.js";

class StateGameOver extends GameState {
    constructor(game) {
        super(game);
    }

    setup() {
        this.keyEvents = (e) => {
            switch (e.key) {
                case ' ':
                    this.game.changeState(this.game.statePlay);
                    break;
                }
        };

        document.body.addEventListener('keydown', this.keyEvents);

        this.sound = new Audio('sounds/gameover.mp3');
        this.sound.play();
    }

    update(elapsed) {
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
        this.game.score.draw();
        this.game.lives.draw();
        this.game.drawBigMessage('GAME OVER');
        this.game.drawSmallMessage('Press space to go again');
    }
    
    teardown() {
        document.body.removeEventListener('keydown', this.keyEvents);
    }
}

export { StateGameOver };

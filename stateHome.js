import { GameState } from "./gameState.js";

class StateHome extends GameState {
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
    }

    update(elapsed) {
        this.game.bg.update(elapsed);
    }

    draw() {
        this.game.bg.draw();
        this.game.drawBigMessage('THINGY GAME');
        this.game.drawSmallMessage('Press space to play');

    }

    teardown() {
        document.body.removeEventListener('keydown', this.keyEvents);
    }
}

export { StateHome };

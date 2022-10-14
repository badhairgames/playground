import { Background } from "./background.js";
import { Lives } from "./lives.js";
import { Player } from "./player.js";
import { Score } from "./score.js";
import { StateHome } from "./stateHome.js";
import { StatePlay } from "./statePlay.js";
import { StateGameOver } from "./stateGameOver.js";

class Game {
    get stateHome() { return 0; }
    get statePlay() { return 1; }
    get stateGameOver() { return 2; }

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        this.currentTimestamp = 0;
        this.satelliteSpawnTime = 0;
        this.states = [new StateHome(this), new StatePlay(this), new StateGameOver(this)];
        this.state = this.states[this.stateHome];

        this.bg = new Background(this);
        this.satellites = [];
        this.player = new Player(this);
        this.bullets = [];
        this.score = new Score(this);
        this.lives = new Lives(this);

        this.storageHighScore = 'satellite.highscore';

        this.state.setup();
    }

    changeState(state) {
        this.state.teardown();
        this.state = this.states[state];
        this.state.setup();
    }

    update(elapsed) {
        this.state.update(elapsed);
    }
    
    draw() {
        this.state.draw();
    }

    drawBigMessage(msg) {
        this.ctx.font = '60pt sans-serif';
        this.ctx.fillStyle = '#ffffff';
        let text = this.ctx.measureText(msg);
        let msgX = (this.width - text.width) / 2;
        let msgY = (this.height - 60) / 2;
        this.ctx.fillText(msg, msgX, msgY);
    }

    drawSmallMessage(msg) {
        this.ctx.font = '30pt sans-serif';
        this.ctx.fillStyle = '#999999';
        let text = this.ctx.measureText(msg);
        let msgX = (this.width - text.width) / 2;
        let msgY = ((this.height - 30) / 2) + 40;
        this.ctx.fillText(msg, msgX, msgY);
    }
}

export { Game };
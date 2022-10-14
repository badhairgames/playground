import { Game } from "./game.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
var game = new Game(canvas, ctx);
var currentTimestamp = 0;

function animate(timeStamp) {
    var elapsed = timeStamp - currentTimestamp;
    currentTimestamp = timeStamp;

    game.update(elapsed);
    game.draw();
    window.requestAnimationFrame(animate);
}

animate(0);

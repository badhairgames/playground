import { SVGBackground } from './svgBackground.js';
import { SVGBullet } from './svgBullet.js';
import { SVGSatellite } from './svgSatellite.js';
import { SVGScore } from './svgScore.js';
import { SVGPlayer } from './svgPlayer.js';

const svgDocument = document.getElementById('graphic');

var background = new SVGBackground(svgDocument);
var bullet = new SVGBullet(svgDocument);
var satellite = new SVGSatellite(svgDocument, background);
var player = new SVGPlayer(svgDocument);
var score = new SVGScore(svgDocument);

function hit() {
    satellite.resetPosition();
    score.update(10);
}

document.body.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            player.turnLeft();
            break;
        case 'ArrowRight':
            player.turnRight();
            break;
        case ' ':
            bullet.fire(satellite.satellite, player.rotation, hit);
            break;
    }
});

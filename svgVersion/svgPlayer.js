import * as svg from './svglib.js';

class SVGPlayer {
    constructor(svgDocument) {
        this.docWidth = svgDocument.clientWidth;
        this.docHeight = svgDocument.clientHeight;
        this.halfWidth = this.docWidth / 2;
        this.rotationLimit = 80;
        this.direction = 0;
        this.rotation = 0;

        this.player = this.drawPlayer('player');
        svgDocument.append(this.player);

        setInterval(() => {
            if (this.rotation > -this.rotationLimit && this.rotation < this.rotationLimit) {
                this.rotation += this.direction;
            }
            this.player.setAttribute('transform', 'rotate(' + this.rotation + ')');
        }, 25);
    }

    turnLeft() {
        this.rotation--;
        this.direction = -1;
    }

    turnRight() {
        this.rotation++;
        this.direction = 1;
    }

    drawPlayer(id) {
        var group = svg.newGroup(id);
        var circle = svg.newCircle('circle1', this.halfWidth, this.docHeight, 40, 'rgb(40,200,20)');
        var line = svg.newLine('playerLine', this.halfWidth, this.docHeight + 50, this.halfWidth, this.docHeight - 50, 5, 'rgb(40,200,20)');
    
        group.appendChild(circle);
        group.appendChild(line);
        group.setAttribute('transform-origin', `${this.halfWidth} ${this.docHeight}`);
        return group;
    }
}

export { SVGPlayer };
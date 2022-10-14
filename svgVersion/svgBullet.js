import * as svg from './svglib.js';

class SVGBullet {
    constructor(svgDocument) {
        this.docWidth = svgDocument.clientWidth;
        this.docHeight = svgDocument.clientHeight;
        this.startX = this.docWidth / 2;
        this.startY = this.docHeight;
        this.x = this.startX;
        this.y = this.startY;
        this.fireInterval = undefined;
        this.fireLineLength = Math.sqrt(this.startX * this.startX + this.startY * this.startY);
        this.shape = svg.newCircle('bullet', this.startX, this.startY, 10, 'rgba(255, 0, 0, 1)');
        this.shape.setAttribute('transform-origin', `${this.startX} ${this.startY}`);
        this.firePath = svg.newLine('firePath', this.startX, this.startY, this.startX, this.docHeight - this.fireLineLength, 1, 'rgba(255,100,100,0)');
        this.firePath.setAttribute('transform-origin', `${this.startX} ${this.startY}`);
        this.fireDistance = 0;

        svgDocument.appendChild(this.firePath);
        svgDocument.appendChild(this.shape);
    }

    fire(satellite, rotation, hitCallback) {
        this.reset();
        this.firePath.setAttribute('transform', 'rotate(' + rotation + ')');
        this.fireInterval = setInterval(() => {
            const point = this.firePath.getPointAtLength(this.fireDistance);
            this.shape.setAttribute('cx', point.x);
            this.shape.setAttribute('cy', point.y);
            this.shape.setAttribute('transform', 'rotate(' + rotation + ')');
    
            if (svg.isCollision(this.shape, satellite)) {
                hitCallback();
                this.reset();
            }
            this.fireDistance += 3;
        }, 10);
    }

    reset() {
        clearInterval(this.fireInterval);
        this.fireDistance = 0;
        this.shape.setAttribute('cx', this.startX);
        this.shape.setAttribute('cy', this.startY);
    }
}

export { SVGBullet };
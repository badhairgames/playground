import * as svg from './svglib.js';

class SVGSatellite {
    constructor(svgDocument, background) {
        this.docWidth = svgDocument.clientWidth;
        this.docHeight = svgDocument.clientHeight;

        this.satellite = this.drawSatellite('satellite');
        this.x = 0;
        this.y = 0;
        this.diff = 5;

        this.resetPosition();
        svgDocument.appendChild(this.satellite);

        setInterval(() => {
            if (this.x >= this.docWidth || this.x <= -50) {
                this.diff = -this.diff;
                this.y = getRandomInt(0, 250);
            }
        
            this.x += this.diff;
        
            this.satellite.setAttribute('transform', 'translate(' + this.x + ', ' + (this.y + background.y * 2) + ')');
        }, 25);
    }

    drawSatellite(id) {
        var group = svg.newGroup(id);
        var line1 = svg.newLine('line1', 10, 10, 30, 30, 10, 'rgba(255,0,100');
        var line2 = svg.newLine('line2', 30, 10, 10, 30, 10, 'rgba(255,0,100');
        var line3 = svg.newLine('line3', 0, 20, 40, 20, 5, 'rgba(255,0,100');
        var line4 = svg.newLine('line4', 20, 0, 20, 40, 5, 'rgba(255,0,100');
        group.appendChild(line1);
        group.appendChild(line2);
        group.appendChild(line3);
        group.appendChild(line4);
        return group;
    }

    resetPosition() {
        this.x = -49;
        this.y = getRandomInt(0, 250);
    }
}

export { SVGSatellite };
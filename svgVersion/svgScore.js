import * as svg from './svglib.js';

class SVGScore {
    constructor(svgDocument) {
        this.docWidth = svgDocument.clientWidth;
        this.docHeight = svgDocument.clientHeight;

        this.score = 0;
        this.display = svg.newText('score', this.docWidth - 10, 50, 50, 'Arial', '00000', '#ffffff');
        this.display.setAttribute('text-anchor', 'end');
        svgDocument.append(this.display);
        this.update(0);
    }

    update(add) {
        this.score += add;
        this.display.textContent = String(this.score).padStart(5, '0');
    }
}

export { SVGScore };
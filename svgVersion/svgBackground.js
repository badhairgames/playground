class SVGBackground {
    constructor(svgDocument) {
        this.docWidth = svgDocument.clientWidth;
        this.docHeight = svgDocument.clientHeight;
        this.y = 0;
        this.diff = 1;
        this.limit = 20;

        svgDocument.style.backgroundImage = 'url("../images/space.jpg")';
        svgDocument.style.backgroundSize = 'cover';

        setInterval(() => {
            if (this.y > this.limit || this.y < -this.limit) this.diff = -this.diff;
            this.y += this.diff;
            svgDocument.style.backgroundPosition = '0 ' + this.y + 'px';
        }, 100);
    }
}

export { SVGBackground };
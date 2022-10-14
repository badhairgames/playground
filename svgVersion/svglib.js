const svgNS = 'http://www.w3.org/2000/svg';

function newGroup(id) {
    var group = document.createElementNS(svgNS, 'g');
    group.setAttribute('id', id);
    return group;
}

function newLine(id, x1, y1, x2, y2, width, color) {
    var newLine = document.createElementNS(svgNS, 'line');
    newLine.setAttribute('id', id);
    newLine.setAttribute('x1', x1);
    newLine.setAttribute('y1', y1);
    newLine.setAttribute('x2', x2);
    newLine.setAttribute('y2', y2);
    newLine.setAttribute('stroke-width', width);
    newLine.setAttribute('stroke', color);
    newLine.setAttribute('stroke-linecap', 'round');
    return newLine;
}

function newText(id, x, y, size, font, message, color) {
    var newText = document.createElementNS(svgNS, 'text');
    newText.setAttribute('id', id);
    newText.setAttribute('x', x);
    newText.setAttribute('y', y);
    newText.setAttribute('font-size', size);
    newText.setAttribute('font-family', font);
    newText.setAttribute('fill', color);
    newText.textContent = message;
    return newText;
}

function newCircle(id, cx, cy, radius, color) {
    var newCircle = document.createElementNS(svgNS, 'circle');
    newCircle.setAttribute('id', id);
    newCircle.setAttribute('cx', cx);
    newCircle.setAttribute('cy', cy);
    newCircle.setAttribute('r', radius);
    newCircle.setAttribute('fill', color);
    return newCircle;
}

function isCollision(el1, el2) {
    var bb1 = el1.getBoundingClientRect();
    var bb2 = el2.getBoundingClientRect();
    return !(bb2.left > bb1.right || 
        bb2.right < bb1.left || 
        bb2.top > bb1.bottom ||
        bb2.bottom < bb1.top);
}

export { newGroup, newLine, newCircle, newText, isCollision };
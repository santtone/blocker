blockerGame.player = (function (width, height, x, y) {
    return {
        width: width,
        height: height,
        x: x,
        y: y,
        color: 'black',
        move: function (vector) {
            this.y = this.y + vector;
        }
    }
});
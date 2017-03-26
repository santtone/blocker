blockerGame.block = (function (width, height, x, y, color) {
    return {
        width: width,
        height: height,
        color: color || 'red',
        x: x,
        y: y
    }
});
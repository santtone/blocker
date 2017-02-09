var blockerUtils = (function(){

    function block(width, height, x, y, color){
        return {
            width: width,
            height: height,
            color: color || 'red',
            x: x,
            y: y
        }
    }

    return {
        buildBlockPair: function (minHeight, maxHeight, width, canvasHeight, canvasWidth, holeHeight) {
            var bottomBlockHeight = Math.random() * (maxHeight - minHeight) + minHeight;
            var topBlockHeight = gameField.canvas.height - bottomBlockHeight - holeHeight;
            var topBlock = block(width, topBlockHeight, canvasWidth, 0);
            var bottomBlock = block(width, bottomBlockHeight, canvasWidth, canvasHeight - bottomBlockHeight);
            return [topBlock, bottomBlock];
        }
    }

})();
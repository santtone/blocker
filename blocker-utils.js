blockerUtils = (function () {

    function block(width, height, x, y, color) {
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
            var topBlockHeight = canvasHeight - bottomBlockHeight - holeHeight;
            var topBlock = block(width, topBlockHeight, canvasWidth, 0);
            var bottomBlock = block(width, bottomBlockHeight, canvasWidth, canvasHeight - bottomBlockHeight);
            return [topBlock, bottomBlock];
        },
        isCrashed: function (player, blocks) {
            var playerLeft = player.x;
            var playerRight = player.x + player.width;
            var playerTop = player.y;
            var playerBottom = player.y + player.height;
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                var blockLeft = block.x;
                var blockRight = block.x + block.width;
                var blockTop = block.y;
                var blockBottom = block.y + block.height;
                if ((playerBottom > blockTop) && (playerTop < blockBottom) && (playerRight > blockLeft) && (playerLeft < blockRight)) {
                    return true;
                }
            }
            return false;
        }
    }

})();
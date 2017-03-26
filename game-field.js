blockerGame.gameField = (function () {

    var blocks = [];
    var canvas;
    var context;

    function resetGameField() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function updateAndDrawBlocks(frameCount, player) {
        if (frameCount === 0 || (frameCount / 200) % 1 === 0) {
            var blockPair = blockerGame.utils.buildBlockPair(20, 160, 10, canvas.height, canvas.width, player.height + 20);
            blocks.push(blockPair[0]);
            blocks.push(blockPair[1]);
        }
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].x -= 1;
            context.fillStyle = blocks[i].color;
            context.fillRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);
        }
    }

    function drawPlayer(player) {
        context.fillStyle = player.color;
        context.fillRect(player.x, player.y, player.width, player.height);
    }

    function checkCrashes(player) {
        return blockerGame.utils.isCrashed(player, blocks);
    }


    return {
        initialize: function (canvasElement) {
            canvas = canvasElement;
            context = canvas.getContext("2d");
        },
        refresh: function (frameCount, player, onCrash) {
            resetGameField();
            updateAndDrawBlocks(frameCount, player);
            drawPlayer(player);
            var crash = checkCrashes(player);
            if (crash) {
                onCrash();
            }
        }
    }
})();
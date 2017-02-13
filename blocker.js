var blocker = (function () {

    var onGameOverCallback;
    var gameInterval;
    var game;
    var player;
    var blocks;

    function initialize() {
        var canvas = document.getElementById('gameField');
        game = {
            canvas: canvas,
            context: canvas.getContext("2d"),
            clear: function () {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },
            frameCount: 0
        };
        player = {
            width: 30,
            height: 30,
            x: 0,
            y: game.canvas.height / 2 - 15,
            color: 'black',
            move: function (vector) {
                this.y = this.y + vector;
            }
        };
        blocks = [];
        if(gameInterval){
            clearInterval(gameInterval);
        }
    }
    
    function updateAndDrawBlocks() {
        if (game.frameCount == 0 || (game.frameCount / 200) % 1 == 0) {
            var blockPair = blockerUtils.buildBlockPair(20, 160, 10, game.canvas.height, game.canvas.width, player.height + 20);
            blocks.push(blockPair[0]);
            blocks.push(blockPair[1]);
        }
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].x -= 1;
            game.context.fillStyle = blocks[i].color;
            game.context.fillRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);
        }
    }

    function drawPlayer() {
        game.context.fillStyle = player.color;
        game.context.fillRect(player.x, player.y, player.width, player.height);
    }

    function checkCrashes() {
        var crash = blockerUtils.isCrashed(player, blocks);
        if (crash) {
            stop();
            onGameOverCallback('GAME OVER');
        }
    }

    function refresh() {
        game.clear();
        game.frameCount++;
        drawPlayer(player.x, player.y);
        updateAndDrawBlocks();
        checkCrashes();
    }

    function start() {
        initialize();
        gameInterval = setInterval(function () {
            refresh();
        });
    }

    function stop() {
        clearInterval(gameInterval);
    }


    return {
        initialize: initialize,
        startGame: start,
        stopGame: stop,
        movePlayer: function (vector) {
            player.move(vector);
            drawPlayer();
        },
        onGameOver: function (callback) {
            onGameOverCallback = callback;
        }
    };

})();
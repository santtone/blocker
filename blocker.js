blockerGame.game = (function () {

    var onGameOver;
    var gameInterval;
    var player;
    var frameCount = 0;

    function initialize() {
        var canvas = document.getElementById('gameField');
        blockerGame.gameField.initialize(canvas);
        player = blockerGame.player(30, 30, 0, canvas.height / 2 - 15);
        if (gameInterval) {
            clearInterval(gameInterval);
        }
    }

    function onCrash() {
        stop();
        onGameOver();
    }

    function refresh() {
        frameCount++;
        blockerGame.gameField.refresh(frameCount, player, onCrash);
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
        startGame: function (gameOverCallback) {
            onGameOver = gameOverCallback;
            start();
        },
        movePlayer: function (vector) {
            player.move(vector);
        }
    };

})();
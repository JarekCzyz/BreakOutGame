const {
    ctx,
    canvas,
    eventsHandler
} = require('./../core.js')

class ScoreGame {
    constructor() {
        this.score = 0
    }

    drawScore() {
        eventsHandler.updateScore(this.score)
    }

    addScore() {
        return this.score++
    }

    gameOver() {
        console.error('GAME OVER');
        document.location.reload()
        newGame.stopAnimate();
        return;
    }

   successGame() {
        console.log('Congratualte YOU WIN ')
        newGame.resetPositionAll();
        newGame.brick.refreshBricks()
        this.refresh()
    }

    refresh() {
        this.score = 0
    }

    checkedScore(bricksCount) {
        if (this.score === bricksCount) {
            newGame.levelGame.updateLevel()
            this.successGame();
            return;
        }
    }
}

module.exports = ScoreGame
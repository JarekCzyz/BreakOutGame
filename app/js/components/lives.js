const {
    ctx,
    canvas,
    eventsHandler
} = require('./../core.js')

class LivesGame {
    constructor() {
        this.lives = 3
    }

    drawLives() {
        eventsHandler.updateLives(this.lives);
    }

    removeLives() {
        console.log('Before change ', this.lives)
        this.lives--
        newGame.livesGame.lives = this.lives
        console.log('After change ' ,this.lives);
        return  (this.lives === 0) ? true : false
    }
}

module.exports = LivesGame
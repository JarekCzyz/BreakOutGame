// App game 
require('../sass/main.scss')

const {
    ctx,
    canvas,
    reversePosition,
    eventsHandler
} = require('./core.js') 
 
const BrickElement = require('./components/bricks.js')
const ScoreGame = require('./components/score.js')
const LivesGame = require('./components/lives.js')
const LevelGame = require('./components/level.js')
const Paddle = require('./components/paddle.js')
const Ball = require('./components/ball.js')
const DialogContainer = require('./components/dialog.js')

class BreakoutGame {

    constructor() {
        this.ball = new Ball()
        this.paddle = new Paddle()
        this.brick = new BrickElement()
        this.brick.init()

        this.livesGame = new LivesGame()
        this.scoreGame = new ScoreGame()
        this.levelGame = new LevelGame()

        this.dialogView = new DialogContainer();
        this.dialogView.init()
    }

    updateDraw() {
        if (!this.onlyPaddle) {
            if (this.brick.collisionDetection(this.ball.x, this.ball.y)) {
                reversePosition(this.ball, 'dy')
            }
            this.ball.updatePosition(this.paddle.paddleX)
            this.paddle.movePaddle()
            this.ball.movePosition()
        } else {
            this.paddle.movePaddle()
            this.ball.moveWithPaddle(this.paddle.paddleX)
        }
    }

    startAnimate() {
        this.requestAnimate()

        this.ball.drawBall()
        this.paddle.drawPaddle()
        this.brick.updateBricks()

        this.updateDraw()
    }

    firstDraw() {
        this.ball.drawBall()
        this.paddle.drawPaddle()
        this.brick.updateBricks()

        this.livesGame.drawLives()
        this.levelGame.drawLevel()
    }

    resetPositionAll() {
        this.ball.resetPosition()
        this.paddle.resetPosition()
        this.brick.resetPosition()
        this.firstDraw();
        this.stopAnimate();
        this.resetSpaceFn();
        this.moveOnlyPaddle()
    }

    moveOnlyPaddle() {
        this.onlyPaddle = true;
        this.startAnimatePaddle()
        this.ball.drawBallX()
        this.paddle.drawPaddle()

        this.brick.updateBricks()
        this.updateDraw()
    }

    startAnimatePaddle() {
        this.animatePaddleHandler = requestAnimationFrame(this.moveOnlyPaddle.bind(this))
        this.clearAll()
    }

    stopAnimatePadle() {
        cancelAnimationFrame(this.animatePaddleHandler)
        this.onlyPaddle = false;
        delete this.animatePaddleHandler;
    }

    requestAnimate() {
        this.animateHandler = requestAnimationFrame(this.startAnimate.bind(this))
        this.clearAll();
    }

    stopAnimate() {
        cancelAnimationFrame(this.animateHandler)
        delete this.animateHandler;
    }

    resetSpaceFn() {
        return (eventsHandler.spaceBar = !eventsHandler.spaceBar)
    }

    clearAll() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    init() {
        eventsHandler.init()
        this.firstDraw();
        this.moveOnlyPaddle()
    }
}

window.newGame = new BreakoutGame();
newGame.init()
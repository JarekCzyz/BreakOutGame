const {
    ctx,
    canvas,
    reversePosition
} = require('./../core.js')

const Paddle = require('./paddle.js')

class Ball {

    constructor() {
        this.dx = 2;
        this.dy = 5;
        this.ballRadius = 10;

        this.paddle = new Paddle()
        this.baseBallYPos = this.paddle.paddleY - (this.dy * 1.6);
        this.x = canvas.width / 2;
        this.y = this.baseBallYPos;

        this.temp = this.basePosition()

        this.ball = new Image();
        this.ball.src = '../app/gfx/ballBlue.png'
    }

    basePosition() {
        let temp = Object.assign({}, {
            x: this.x,
            y: this.y,
            dx: this.dx,
            dy: this.dy,
            paddleX: this.paddle.paddleX

        })
        return temp
    }

    resetPosition() {
        this.clearBall(this.x, this.y, this.ballRadius)
        this.setBasePosition(this.temp)
    }

    setBasePosition(options) {
        this.x = options.x
        this.y = options.y
        this.dx = options.dx 
        this.dy = options.dy
    }

    drawImageBall() {
        ctx.drawImage(this.ball, this.x - this.ballRadius,this.y-this.ballRadius, 22,22)
    }

    drawBall() {
       this.drawImageBall()
    }

    drawBallX() {
        this.drawImageBall()
    }

    clearBall(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.clearRect(x - radius - 1, y - radius - 1,
                          radius * 2 + 2, radius * 2 + 2);
    }

    collisionOnXAxis() {
        return (this.x + this.dx > canvas.width - this.ballRadius ||
                this.x + this.dx < this.ballRadius) ?
            reversePosition(this, 'dx') :
            false
    }

    collisionOnYTop() {
        return (this.y + this.dy < this.ballRadius) ? reversePosition(this, 'dy') : false
    }

    collisionWithBottomY() {
        return this.y + this.dy > this.baseBallYPos;
    }

    collisionWithPaddle() {
        return (this.x > this.paddle.paddleX && 
            this.x < this.paddle.paddleX + this.paddle.paddleWidth &&
            this.y >= this.baseBallYPos) ? 
            reversePosition(this, 'dy') : false
    }

    movePosition() {
        this.x += this.dx;
        this.y += this.dy
    }

    moveWithPaddle(paddleX) {
        this.x = paddleX + this.paddle.paddleWidth / 2;
    }

    updatePosition(paddleX) {
        this.paddle.paddleX = paddleX
        this.collisionOnXAxis()
        if (!this.collisionOnYTop()) {
            if (this.collisionWithBottomY()) {
                if (!this.collisionWithPaddle()) {
                    let result = newGame.livesGame.removeLives() ? newGame.scoreGame.gameOver() : newGame.resetPositionAll();
                }
            }
        }
    }
}

module.exports = Ball
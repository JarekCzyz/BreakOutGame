const {
    ctx,
    canvas,
    eventsHandler
} = require('./../core.js')

class Paddle {

    constructor() {
        this.paddleWidth = 100
        this.paddleHeight = 15
        this.paddleX = (canvas.width - this.paddleWidth) / 2
        this.paddleY = canvas.height - this.paddleHeight
        this.moveStep = 6

        this.temp = this.basePosition()

        this.paddleImg = new Image();
        this.paddleImg.src = '../app/gfx/paddleBlu.png'
    
    }

    basePosition() {
        let temp = Object.assign({}, {
            paddleY: this.paddleY,
            paddleX: this.paddleX

        })
        return temp
    }

    drawPaddle() {
        ctx.drawImage(this.paddleImg, this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight)
    }

    resetPosition() {
        this.clearPaddle()
        this.paddleX = this.temp.paddleX
    }

    clearPaddle() {
       ctx.clearRect(0, canvas.height - this.paddleHeight, canvas.width, this.paddleHeight);
    }

    movePaddleWithMouse() {
        if (eventsHandler.mousemoveX < canvas.width - this.paddleWidth){
            this.paddleX = eventsHandler.mousemoveX
        }
    }

    movePaddle() {
        if (eventsHandler.rightPressed && this.paddleX < canvas.width - this.paddleWidth) {
            this.paddleX += this.moveStep
        }
        if (eventsHandler.leftPressed && this.paddleX > 0) {
            this.paddleX -= this.moveStep
        }
    }

}

module.exports = Paddle
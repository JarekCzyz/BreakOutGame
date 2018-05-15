const {
    ctx,
    canvas
} = require('./../core.js')

class BrickElement {

    constructor() {
        this.brickRowCount = 5
        this.brickColumnCount = 6
        this.brickPadding = 4
        this.brickHeight = 18
        this.brickOffsetTop = 0
        this.brickOffsetLeft = 0
        
        this.brickWidth = 80
        this.brickStatus = 1
        this.bricks = []

        this.bricksImg = new Image();
        this.bricksImg.src = '../app/gfx/element_blue_rectangle.png'
    
    }

    setWidth() {
        if (!this.brickWidth) {
            this.brickWidth = (canvas.width / this.brickColumnCount) - (this.brickOffsetLeft * (this.brickColumnCount / 2))
        }
    }

    createBricks() {

        for (let a = 0; a < this.brickColumnCount; a++) {
            this.bricks[a] = [];
            for (let b = 0; b < this.brickRowCount; b++) {
                this.bricks[a][b] = Object.assign({}, {
                    x: 0,
                    y: 0,
                    status: 1
                });
            }
        }
    }

    drawBricks(bricksX, bricksY) {
        ctx.drawImage(this.bricksImg, bricksX, bricksY, this.brickWidth, this.brickHeight)
    }

    resetPosition() {
        ctx.clearRect(0, 0, canvas.width, 200)
    }

    refreshBricks() {
        for (let a = 0; a < this.brickColumnCount; a++) {
            for (let b = 0; b < this.brickRowCount; b++) {
                this.bricks[a][b].status = 1;
            }
        }
        this.updateBricks()
    }

    updateBricks() {
        // if (newGame.animatePaddleHandler && newGame.animatePaddleHandler > 4) {
        //     return
        // }
        for (let a = 0; a < this.brickColumnCount; a++) {
            for (let b = 0; b < this.brickRowCount; b++) {
                if (this.bricks[a][b].status == 1) {
                    let bricksX = a * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft
                    let bricksY = b * (this.brickHeight + this.brickPadding) + this.brickOffsetTop
                    this.bricks[a][b].x = bricksX
                    this.bricks[a][b].y = bricksY
                    this.drawBricks(bricksX, bricksY)
                }

            }
        }
        if (!newGame.animatePaddleHandler) {
            newGame.scoreGame.drawScore()
        }
    }

    collisionDetection(xBall, yBall) {
        for (let a = 0; a < this.brickColumnCount; a++) {
            for (let b = 0; b < this.brickRowCount; b++) {
                let bk = this.bricks[a][b]
                if (bk.status == 1) {
                    if (xBall > bk.x - (this.brickPadding / 2) &&
                        xBall < bk.x + this.brickWidth + this.brickPadding &&
                        yBall > bk.y - (this.brickPadding / 2) &&
                        yBall < bk.y + this.brickHeight + this.brickPadding) {
                        bk.status = 0;
                        newGame.scoreGame.addScore();
                        newGame.scoreGame.checkedScore(this.brickColumnCount * this.brickRowCount)
                        return true
                    }
                }
            }
        }
    }

    init() {
        this.setWidth();
        this.createBricks();
    }
}

module.exports = BrickElement
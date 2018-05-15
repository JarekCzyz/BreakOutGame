const UI = require('./ui.js')

class EventsHandler extends UI { 

    constructor() {
        super(UI)
        this.rightPressed = false;
        this.leftPressed = false;
        this.spaceBar = false
    }

    eventsHandler() {
        this.body.addEventListener('keydown', this.keyDownHandler.bind(this))
        this.body.addEventListener('keyup', this.keyUpHandler.bind(this))
        
        this.playButton[0]
            .addEventListener('click', this.handlerPlayButton)
        this.pauseButton[0]
            .addEventListener('click', this.handlerPauseButton)
    }

    updateLives(livesCounter) {
        this.lives[0].children[0].innerText = livesCounter
    }

    updateLevel(levelCounter) {
        this.level[0].children[0].innerText = levelCounter
    }

    updateScore(scoreCounter) {
        this.score[0].children[0].innerText = scoreCounter
    }

    handlerPlayButton(event) {
        if(event) {
            event.preventDefault()
        }
        if (!newGame.animateHandler) {
            newGame.stopAnimatePadle()
            newGame.startAnimate()
        }
        return false;
    }

    handlerPauseButton(event) {
        if (event) {
            event.preventDefault()
        }
        if (newGame.animateHandler) {
            newGame.stopAnimate()
        }
        return false
    }

    spaceBarFn(e) {
        if ((e.keyCode || e.which) == 32) {
            console.log('SpaceBar before', this.spaceBar)
            this.spaceBar = !this.spaceBar;
            console.log('SpaceBar after', this.spaceBar);
            if (this.spaceBar) {
                this.handlerPlayButton()
             }
        }
    }

    keyDownHandler(e) {
        if (e.keyCode == 37) {
            console.log('left Down')
            this.leftPressed = true
        }
        if (e.keyCode == 39) {
            console.log('right Down')
            this.rightPressed = true
        }
       this.spaceBarFn(e)
    }

    keyUpHandler(e) {
        if (e.keyCode == 37) {
            console.log('left Up')
            this.leftPressed = false
            
        }
        if (e.keyCode == 39) {
            console.log('right UP')
            this.rightPressed = false
        }
    }
    init() {
        this.eventsHandler();
    }

}

module.exports = EventsHandler
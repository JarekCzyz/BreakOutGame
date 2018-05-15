
class UI {

    constructor() {
        this.body = document;

        this.playButton = document.getElementsByClassName('btn-play');
        this.pauseButton = document.getElementsByClassName('btn-pause')
        this.lives = document.getElementsByClassName('lives')
        this.level = document.getElementsByClassName('level')
        this.score = document.getElementsByClassName('score')
    }

}

module.exports = UI
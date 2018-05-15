const {
    ctx,
    canvas,
    eventsHandler
} = require('./../core.js')

class LevelGame {
    constructor() {
        this.level = 1
    }

    drawLevel() {
        eventsHandler.updateLevel(this.level)
    }

    addLevel() {
       return this.level++;
    }

    updateLevel() {
        this.addLevel();
        this.drawLevel();
    }

    checkedLevel(bricksCount) { 
        console.log('checked');
    }
}

module.exports = LevelGame
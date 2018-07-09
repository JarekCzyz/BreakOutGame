const EventsHandler = require('./generic/events_handler.js');

class CoreClass {

    constructor() {
        this.canvas = document.getElementById('app_game');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.canvas.width  = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.eventsHandler = new EventsHandler()
        this.testMode = false;
    }

    reversePosition(obj, key) {
        return Object.assign(obj, {
            [key]: -obj[key]
        })
    }
}

const core = new CoreClass()

module.exports = {
    canvas: core.canvas,
    ctx: core.ctx,
    reversePosition: core.reversePosition,
    eventsHandler: core.eventsHandler
}
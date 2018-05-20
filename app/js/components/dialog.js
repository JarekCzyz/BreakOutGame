const {
    ctx,
    canvas,
    eventsHandler
} = require('./../core.js')
const tpl = require('./../../partial_view/dialog.html')

class DialogContainer {

    constructor() {
        this.htmlObj = document.createElement('div');
        this.htmlObj.innerHTML = tpl;
        this.playButton = this.htmlObj.getElementsByClassName('btn')[0];
        this.dialogContent = this.htmlObj.children[0];
    }

    closeDialog() {
        this.dialogContent.getElementsByClassName('dialog')[0].remove();
    }
    init() {
        console.log(ctx);
        this.closeDialog()
        this.body.apeendChild(htmlObj);
    }
}

module.exports = DialogContainer
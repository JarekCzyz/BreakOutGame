const {
    ctx,
    canvas,
    eventsHandler
} = require('./../core.js')
const tpl = require('./../../partial_view/dialog.html')

class DialogContainer {

    constructor() {
        this.wrappDialog = document.createElement('div');
        this.wrappDialog.innerHTML = tpl;
        this.dialogContent = this.wrappDialog.children[0];
        this.playButton = this.wrappDialog.getElementsByClassName('btn')[0];
        
        this.playButton.addEventListener('click', this.closeDialog.bind(this));
    }

    closeDialog() {
        this.dialogContent.remove();
    }

    renderHtml() {
        document.body.appendChild(this.wrappDialog);
    }

    init() {
        this.renderHtml()
    }
}

module.exports = DialogContainer
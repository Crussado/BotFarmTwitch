const TIME_BUTTON = 900003;

function getButton() {
    return document.querySelectorAll('button.ScCoreButton-sc-1qn4ixc-0.ScCoreButtonSuccess-sc-1qn4ixc-5')[0];
}

function getPoints() {
    const button = getButton();
        if (button) {
            button.click()
        }
}

function farm() {
    getPoints();
    setTimeout(() => {
        farm();
    }, TIME_BUTTON);
}

function ifStreamPage() {
    return document.querySelectorAll('h4#chat-room-header-label').length == 1;
}

function main () {
    window.onload = function funLoad() {
        if(ifStreamPage()) {
            farm();
        }
    }
}

main();

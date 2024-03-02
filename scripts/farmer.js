const TIME_BUTTON = 10000; // 10 seconds
const CHAT_CLASS = 'stream-chat';
const ANON_USER_CLASS = 'anon-user';
const BUTTON_LABEL = 'Claim Bonus';
const BONUS_POINTS = 50;

function getButton() {
    return document.querySelector('button[aria-label="' + BUTTON_LABEL + '"]');
}

function getPoints() {
    const button = getButton();
        if (button) {
            button.click();
            chrome.runtime.sendMessage({updatePoints: BONUS_POINTS}, function(response) {
            });
        }
}

function farm() {
    getPoints();
    setTimeout(() => {
        farm();
    }, TIME_BUTTON);
}

function ifStreamPage() {
    return document.querySelectorAll('.'+CHAT_CLASS).length > 0;
}

function isUserLogIn() {
    return document.querySelectorAll('.'+ANON_USER_CLASS).length === 0;
}

function main () {
    window.onload = function funLoad() {
        if(ifStreamPage() && isUserLogIn()) {
            farm();
        }
    }
}

main();

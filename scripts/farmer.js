const TIME_BUTTON = 10000; // 10 seconds
const CHAT_CLASS = 'stream-chat';
const ANON_USER_CLASS = 'anon-user';
const STREAM_CLASS = 'channel-info-content';
const BONUS_BUTTON_LABEL = ['Claim Bonus', 'Reclamar bonificación'];
const POINT_BUTTON_LABEL = ['Points Balance', 'Saldo de puntos'];
const BONUS_POINTS = 50;

let initialPoints = 0;
let firstGet = true;
let points = 0;
let stream = '';

function getButton() {
    return document.querySelector(`button[aria-label="${BONUS_BUTTON_LABEL[0]}"]`) || document.querySelector(`button[aria-label="${BONUS_BUTTON_LABEL[1]}"]`);
}

function getStream() {
    const container_stream = document.querySelector(`div.${STREAM_CLASS}`);;
    if (container_stream) {
        return container_stream.querySelector('a').href;
    }
}

function farmPoints() {
    const button = getButton();
        if (button) {
            button.click();
            chrome.runtime.sendMessage({ updatePoints: BONUS_POINTS }, function(response) {
            });
        }
}

// TODO: transform format points a numbers.
// 940 -> 940
// 1k -> 1000
// 2.4k -> 2400
function formatPoints(rawPoints) {
    return Number(rawPoints);
}

function getPoints() {
    let button = document.querySelector(`button[aria-label="${POINT_BUTTON_LABEL[0]}"]`) || document.querySelector(`button[aria-label="${POINT_BUTTON_LABEL[1]}"]`);
    if (button) {
        points = formatPoints(button.textContent);
        if (firstGet) {
            firstGet = false;
            initialPoints = points;
        }
        return points;
    }
    return 0;
}

function farm() {
    if(getStream() !== stream) {
        track()
    }
    farmPoints();
    let points = getPoints();
    chrome.runtime.sendMessage({ informPoints: (points - initialPoints) }, function(response) {
    });
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

function checkStream() {
    return ifStreamPage() && isUserLogIn();
}

function track() {
    if(checkStream()) {
        firstGet = true;
        time = new Date().getTime();
        chrome.runtime.sendMessage({ initialTime: time }, function(response) {
        });
        initialPoints = getPoints();
        stream = getStream();
        farm();
    }
}

function main () {
    window.onload = function funLoad() {
        track()
    }
}

main();

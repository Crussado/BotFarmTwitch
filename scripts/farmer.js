const TIME_BUTTON = 10000; // 10 seconds
const CHAT_CLASS = 'stream-chat';
const ANON_USER_CLASS = 'anon-user';
const BONUS_BUTTON_LABEL = ['Claim Bonus', 'Reclamar bonificación'];
const POINT_BUTTON_LABEL = ['Points Balance', 'Saldo de puntos'];
const BONUS_POINTS = 50;

initialPoints = 0;
firstGet = true;

function getButton() {
    return document.querySelector(`button[aria-label="${BONUS_BUTTON_LABEL[0]}"]`) || document.querySelector(`button[aria-label="${BONUS_BUTTON_LABEL[1]}"]`);
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
    farmPoints();
    let points = getPoints();
    console.log(points, initialPoints, firstGet);
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

function main () {
    window.onload = function funLoad() {
        if(ifStreamPage() && isUserLogIn()) {
            time = new Date().getTime();
            chrome.runtime.sendMessage({ initialTime: time }, function(response) {
            });
            initialPoints = getPoints();
            farm();
        }
    }
}

main();

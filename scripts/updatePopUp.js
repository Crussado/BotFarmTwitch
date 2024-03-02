const bonusText = document.getElementById('bonusPoints');
const automaticText = document.getElementById('automaticPoints');
const timeText = document.getElementById('time');
const averageText = document.getElementById('average');

function renderText(bonusPoints, automaticPoints, time) {
    bonusText.textContent = `${bonusPoints}`;
    automaticText.textContent = `${automaticPoints}`;
    timeText.textContent = `${time}`;
    averageText.textContent = `${time !== 0 ? Math.round((bonusPoints+automaticPoints)/time) : 0}`;
}

chrome.runtime.sendMessage({ requestPoints: true }, function(response) {
    renderText(response.bonusPoints, response.automaticPoints, response.time);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.bonusPoints) {
        renderText(request.bonusPoints, request.automaticPoints, request.time);
    }
});

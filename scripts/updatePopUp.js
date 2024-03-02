const bonusText = document.getElementById('bonusPoints');

function renderText(bonusPoints, automaticPoints, time) {
    bonusText.textContent = `${bonusPoints}, ${automaticPoints}, ${time}`;
}

chrome.runtime.sendMessage({ requestPoints: true }, function(response) {
    renderText(response.bonusPoints, response.automaticPoints, response.time);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.bonusPoints) {
        renderText(request.bonusPoints, request.automaticPoints, request.time);
    }
});

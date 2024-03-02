const bonusText = document.getElementById('bonusPoints');

function renderText(bonusPoints, automaticPoints) {
    bonusText.textContent = `${bonusPoints}, ${automaticPoints}`;
}

chrome.runtime.sendMessage({ requestPoints: true }, function(response) {
    renderText(response.bonusPoints, response.automaticPoints);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.bonusPoints) {
        renderText(request.bonusPoints, request.automaticPoints);
    }
});

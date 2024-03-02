const bonusText = document.getElementById('bonusPoints');

chrome.runtime.sendMessage({ requestPoints: true }, function(response) {
    bonusText.textContent = response.requestPoints;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.totalPoints) {
        bonusText.textContent = request.totalPoints;
    }
});

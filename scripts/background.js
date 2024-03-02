let farmPointsByBonus = 0;
let automaticPoints = 0;

function renderPoints() {
  chrome.runtime.sendMessage({
    bonusPoints: farmPointsByBonus,
    automaticPoints,
  }, function(response) {
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.requestPoints) {
      sendResponse({
        bonusPoints: farmPointsByBonus,
        automaticPoints,
      });
    } else if (request.updatePoints) {
        farmPointsByBonus += request.updatePoints;
        renderPoints();
    } else if (request.informPoints) {
        automaticPoints = request.informPoints - farmPointsByBonus;
        renderPoints();
    }
});

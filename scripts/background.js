let farmPointsByBonus = 0;
let automaticPoints = 0;
let initialTime = 0;

function getTime() {
  if (initialTime) {
    return Math.round((new Date().getTime() - initialTime) / (1000 * 60));
  }
  return 0;
}

function renderPoints() {
  chrome.runtime.sendMessage({
    bonusPoints: farmPointsByBonus,
    automaticPoints,
    time: getTime(),
  }, function(response) {
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.requestPoints) {
      sendResponse({
        bonusPoints: farmPointsByBonus,
        automaticPoints,
        time: getTime(),
      });
    } else if (request.updatePoints) {
        farmPointsByBonus += request.updatePoints;
        renderPoints();
    } else if (request.informPoints) {
        automaticPoints = request.informPoints - farmPointsByBonus;
        renderPoints();
    } else if (request.initialTime) {
      initialTime = request.initialTime;
      farmPointsByBonus = 0;
      automaticPoints = 0;
    }
});

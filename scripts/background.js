let farmPointsByBonus = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.requestPoints) {
      sendResponse({ requestPoints: farmPointsByBonus });
    } else if (request.updatePoints) {
        farmPointsByBonus += request.updatePoints;
        chrome.runtime.sendMessage({totalPoints: farmPointsByBonus}, function(response) {
        });
    
    }
});


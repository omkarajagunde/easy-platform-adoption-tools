/* global chrome */

chrome.action.onClicked.addListener(function (tab) {
	chrome.scripting.executeScript({
		files: ["content.js"],
		target: { tabId: tab.id },
	});
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {    
	console.log(request, sender, sendResponse);
    if (request.contentScriptQuery == "getTours") {
        var url = request.url;
        fetch(url)
            .then(response => response.text())
            .then(response => sendResponse({ ...JSON.parse(response), contentScriptQuery: request.contentScriptQuery }))
            .catch(error => console.log('Error:', error))
        return true;
    }

    if (request.contentScriptQuery === "deleteTour") {
        fetch(request.url, request.reqOptions)
            .then(response => response.json())
            .then(response => sendResponse({ ...response, contentScriptQuery: request.contentScriptQuery }))
            .catch(error => console.log('Error:', error));
        return true;
    }

    if (request.contentScriptQuery == "postTour") {
        fetch(request.url, request.reqOptions)
            .then(response => response.json())
            .then(response => sendResponse({ ...response, contentScriptQuery: request.contentScriptQuery }))
            .catch(error => console.log('Error:', error));
        return true;
    }

    return true

});

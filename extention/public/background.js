/* global chrome */

chrome.action.onClicked.addListener(function (tab) {
	chrome.scripting.executeScript({
		files: ["content.js"],
		target: { tabId: tab.id },
	});
});

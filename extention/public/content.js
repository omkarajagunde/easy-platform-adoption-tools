if (typeof init === "undefined") {
	/* global chrome */
	console.log("EasyTalk Extension instance created");
	function init() {
		var ele = document.createElement("script");
		var scriptPath = chrome.runtime.getURL("leader-line.min.js"); //verify the script path
		console.log("leader-line.min.js scriptPath :: ", scriptPath);
		ele.setAttribute("src", scriptPath);
		document.body.appendChild(ele);

		var ele1 = document.createElement("script");
		var scriptPath1 = chrome.runtime.getURL("plain-draggable.min.js"); //verify the script path
		console.log("leader-line.min.js scriptPath1 :: ", scriptPath1);
		ele1.setAttribute("src", scriptPath1);
		document.body.appendChild(ele1);
		
		// eslint-disable-next-line no-undef
		const extensionOrigin = "chrome-extension://" + chrome.runtime.id;
		console.log(chrome.runtime, extensionOrigin, chrome.runtime.getURL("index.html"));
		console.log("BEEURL : ", chrome.runtime.getURL("bee.svg"))
		// eslint-disable-next-line no-restricted-globals
		if (!location.ancestorOrigins.contains(extensionOrigin)) {
			// Fetch the local React index.html page
			// eslint-disable-next-line no-undef
			fetch(chrome.runtime.getURL("index.html") /*, options */)
				.then((response) => response.text())
				.then((html) => {
					const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
					// eslint-disable-next-line no-undef
					$(styleStashHTML).appendTo("body");
					$(`<div style="display: none" id="beeURL">${chrome.runtime.getURL("bee.svg")}</div>`).appendTo("body")
					$(`<div style="display: none" id="extId">${chrome.runtime.id}</div>`).appendTo("body")
				})
				.catch((error) => {
					console.warn(error);
				});
		}
	}

	init();

	window.addEventListener("message", function (event) {
		if (event.source !== window) return;
		onDidReceiveMessage(event);
	});

	async function onDidReceiveMessage(event) {
		if (event.data.type && event.data.type === "GET_EXTENSION_ID") {
			window.postMessage({ type: "EXTENSION_ID_RESULT", extensionId: chrome.runtime.id }, "*");
		}
	}
}

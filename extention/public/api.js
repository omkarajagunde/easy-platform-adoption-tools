const makeApiCall = (options) => {
    chrome.runtime.sendMessage({
            contentScriptQuery: options.contentScriptQuery
            , reqOptions: oprions.reqOptions
            , url: options.url
    }, (response) => {
        // if (!chrome.runtime.lastError) {
        // 	console.log("lastError : ", response);
        // } 
        
        if (response != undefined && response != "") {
            console.log("POST /v1/api/tour SUCCESS : ", response);
        }
        else {
            console.log("POST /v1/api/tour ERR : ", response);
        }
    });
}
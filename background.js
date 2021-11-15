

// --------------------------------- CREATING context Menus and making its functionality
chrome.contextMenus.create({
    id: "robiulhasan1",
    title: "Add to bookmark",
    contexts: ["all"]
}, () => {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
    } else {
        console.log("no error occoured with context menu");
    }
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    chrome.storage.sync.get(["name"], function (result) {
        let AlltabInfo = result.name ? JSON.parse(result.name) : [];
        AlltabInfo.push({ favIconUrl: tab.favIconUrl, url: tab.url, title: tab.title });
        let stringifyAlltabinfo = JSON.stringify(AlltabInfo)
        chrome.storage.sync.set({ name: stringifyAlltabinfo }, function () {
            // console.log('Value is set to ' + stringifyAlltabinfo);
        })
    })
});


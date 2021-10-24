console.log("Hello World");

// let color = '#3aa757';

chrome.runtime.onInstalled.addListener((reason) => {
    // chrome.storage.sync.set({ color });
    // console.log('Default background color set to %cgreen', `color: ${color}`);

    // ----------------------------------------------
    console.log(chrome.runtime.OnInstalledReason.INSTALL);
    console.log(reason);
    if (reason.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        console.log("true");
        chrome.tabs.create({
            url: 'AfterInstall/AllinOne.html'
        });
    }
    // ---------------------------------------------------------------------------------------------
    // async function getCurrentTab() {
    //     let queryOptions = { active: true, currentWindow: true };
    //     let [tab] = await chrome.tabs.query(queryOptions);
    //     console.log(tab);
    //     return tab;
    // }
    // getCurrentTab()
});

// --------------------------------------------------------------------------------
chrome.action.setBadgeText({ text: 'ON' });
chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
// ---------------------------------------------------------------------------------------
// chrome.action.onClicked.addListener(function (tab) {
//     chrome.action.setTitle({ tabId: tab.id, title: "You are on tab:" + tab.id });
//     console.log(tab);
// });
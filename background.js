chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
  });
  
  chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
      // All windows are minimized or focus is shifted away from the browser
      chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, { action: "pause" });
        });
      });
    } else {
      // A window is focused
      chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, { action: "checkVisibility" });
        });
      });
    }
  });
  
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(tab.id, { action: "checkVisibility" });
      }
    });
  });
  
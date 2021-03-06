// enable action only on messenger page
chrome.runtime.onInstalled.addListener(function () {
  chrome.action.disable();
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              urlMatches: "https://www.messenger.com/*",
            },
          }),
        ],
        // And shows the extension's page action.
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

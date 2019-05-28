let enabled = true;
const insertSmile = location => location.replace(/www.amazon/gi, 'smile.amazon');

chrome.browserAction.onClicked.addListener(() => {
  if (enabled) {
    enabled = false;
    chrome.browserAction.setBadgeText({text: 'Off'});
  } else {
    enabled = true;
    chrome.browserAction.setBadgeText({text: ''});
  }
});

chrome.webRequest.onBeforeRequest.addListener(({ url }) => enabled ? {
  redirectUrl: insertSmile(url)
} : undefined, {
  urls: ["*://www.amazon.co.uk/*", "*://www.amazon.com/*", "*://www.amazon.de/*"],
  types: ['main_frame']
}, ["blocking"]);

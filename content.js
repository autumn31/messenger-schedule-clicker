// aria-label="送 1 個讚"
// aria-label="按 Enter 即可傳送"

function clickSend() {
  let elems = document.querySelectorAll('[aria-label="按 Enter 即可傳送"]');
  console.log(elems);
  elems[0].click();
}

function getWaitTime(timeStr) {
  let appt = new Date(new Date().toISOString().slice(0, 11) + timeStr);
  let wait = appt.getTime() - new Date().getTime();
  if (wait < 0) {
    wait = 0;
  }
  console.log("wait time: ", wait);
  return wait;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 只讓合法網站可以存取
  console.log("received message: ", message);
  if (message.type === "set_appt") {
    sendResponse({ result: "ok" });
    let timeStr = message.data.appt;
    if (!timeStr) {
      alert("appt can't be empty");
      return;
    }
    let wait = getWaitTime(timeStr);
    setTimeout(clickSend, wait);
  }
});

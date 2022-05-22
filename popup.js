"use strict";

let appt = document.getElementById("appt");
let submit = document.getElementById("submit");

submit.onclick = sendAppt;

function sendAppt() {
  var query = { active: true, currentWindow: true };
  chrome.tabs.query(query, function (tabs) {
    let cur_tab = tabs[0];
    chrome.tabs.sendMessage(
      cur_tab.id,
      { type: "set_appt", data: { appt: appt.value } },
      function (response) {
        if (!response) {
          alert("something errors happened");
        } else {
          console.log("appt sent");
          close();
        }
      }
    );
  });
}

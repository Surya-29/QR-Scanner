let textBox = document.getElementById("dialog");
let countBox = document.getElementById("counterDialog");
let initId = document.getElementById("initId");
let contentBox = document.getElementById("content-box");
let dayFlag = document.getElementById("dayId");
let cacheArray = [];
let index = 0;
let counter = 0;
let checkVar = "";

function init() {
  window.localStorage.setItem("readJSON", 1);
  if (window.localStorage.getItem("readJSON")) {
    $.getJSON("content.json", function (data) {
      window.localStorage.setItem("data", JSON.stringify(data));
    });
  }
  window.localStorage.setItem("readJSON", 0);
}
if (window.localStorage.getItem("readJSON")) {
  initId.remove();
}
function reScan() {
  textBox.innerHTML = "";
  html5QrcodeScanner.resume();
}
function clr() {
  window.localStorage.clear();
}

function getData(encText, dayID, index) {
  html5QrcodeScanner.pause();
  let cont = JSON.parse(window.localStorage.getItem("data"));
  checkVar = cont[encText.slice(0, -4)];

  if (checkVar == undefined) {
    textBox.innerHTML = "QR CODE INVALID &#10060";
    textBox.style.color = "red";
    textBox.style.fontSize = "26px";
  } else {
    if (checkVar.includes(encText) && dayID == encText.slice(-4)) {
      count+=1;
      textBox.innerHTML = "VALID &#10003";
      textBox.style.fontSize = "26px";
      textBox.style.color = "green";
      countBox.innerHTML = "Counter:"+count;
      let indOfEntry = checkVar.indexOf(encText);
      checkVar.splice(indOfEntry, 1);
      cont[encText.slice(0, -4)] = checkVar;

      window.localStorage.setItem("data", JSON.stringify(cont));
    } else {
      if (!(dayID == encText.slice(-4))) {
        textBox.innerHTML = "Wrong day code is being used! &#10060";
        textBox.style.fontSize = "26px";
        textBox.style.color = "red";
      } else {
        textBox.innerHTML = "User has already scanned! &#10060";
        textBox.style.fontSize = "26px";
        textBox.style.color = "red";
      }
    }
  }
}

function onScanSuccess(decodedText, decodedResult) {
  // Handle on success condition with the decoded text or result.
  console.log(`Scan result: ${decodedText}`, decodedResult);
  textBox.innerHTML = decodedText;

  let dayID = dayFlag.options[dayFlag.selectedIndex].value;

  index = parseInt(dayID.slice(-1));
  // console.log(dayID,index);
  window.localStorage.getItem("data");
  getData(decodedText, dayID, index);
}

var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 15,
  qrbox: 350,
  aspectRatio: 0.8,
});

html5QrcodeScanner.render(onScanSuccess);

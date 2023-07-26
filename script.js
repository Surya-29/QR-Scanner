let textBox = document.getElementById("dialog");
let contentBox = document.getElementById("content-box");
let dayFlag = document.getElementById("dayId");
let cacheArray = [];
let obj = { entry: [] };
var json;
let index = 0;

let checkVar = "";

function reScan() {
  textBox.innerHTML = "";
  html5QrcodeScanner.resume();
}
function getData(encText, dayID, ind) {
//   console.log(checkVar, dayID, ind, json);

  if (checkVar == undefined) {
    textBox.innerHTML = "QR CODE INVALID";
  } else {
    if (
      encText == checkVar[ind - 1] &&
      !obj.entry.includes(checkVar[ind - 1])
    ) {
      textBox.innerHTML = "VALID";
      obj.entry.push(checkVar[ind - 1]);
      json = JSON.stringify(obj);
    } else {
        if(obj.entry.includes(checkVar[ind - 1])){
            textBox.innerHTML = "User has already scanned!";
        }
        else{
            textBox.innerHTML = "Wrong day code is being used!";
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
  console.log(decodedText.slice(0, -4));
  $.getJSON("content.json", function (data) {
    checkVar = data[decodedText.slice(0, -4)];
    getData(decodedText, dayID, index);
  });

  html5QrcodeScanner.pause();
}

var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 300,
});

html5QrcodeScanner.render(onScanSuccess);

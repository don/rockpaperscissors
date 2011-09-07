/*global NdefPlugin, Ndef */
var choice = null,
    listening = false,
    mimeType = "game/rockpaperscissors";

function stop() {
    navigator.nfc.unshareTag();
    listening = false;
    // TODO deselect button. blur doesn't work
}

function onNfc(nfcEvent) {
  if (!listening) {
      return;
  }

  var tag = nfcEvent.tag,
      records = tag.ndefMessage,
      opponentsChoice = navigator.nfc.util.bytesToString(records[0].payload),
      result;
  
  if (choice === opponentsChoice) {
      result = "tie";
  } else if (choice === "Rock" && opponentsChoice === "Scissors") {
      result = "win";
  } else if (choice === "Paper" && opponentsChoice === "Rock") {
      result = "win";      
  } else if (choice === "Scissors" && opponentsChoice === "Paper") {
      result = "win";
  } else {
      result = "loose";
  }  
  
  if (result === "tie") {
      navigator.notification.alert(choice + " === " + opponentsChoice, stop, "Tie", "Meh");
  } else if (result === "win") {
      navigator.notification.alert(message(choice, opponentsChoice), stop, "You Win!", "OK");      
  } else {
      navigator.notification.alert(message(opponentsChoice, choice), stop, "You Lose", "Bummer");
  }
  navigator.notification.vibrate(100);   
}

function message(win, lose) {
    if (/s$/.test(win)) {
        return win + " beat " + lose;
    } else {
        return win + " beats " + lose;
    }
}

function choose(text) {
    choice = text;
    var ndefMessage = [
        Ndef.mimeMediaRecord(mimeType, Ndef.stringToBytes(choice))
    ];
    
    navigator.nfc.shareTag(
        ndefMessage,
        function () { 
           navigator.notification.vibrate(100);
        }, function () {
           alert("Failed to share tag.");
        }
    );
    listening = true;
}

var ready = function () {
  var buttons = document.getElementsByTagName('button');
  
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () { choose(this.innerHTML); }, false);
  }
      
  function win() {
    console.log("Listening for tags with mime type "+ mimeType);
  }
  
  function fail() {
    alert('Failed to register mime type ' + mimeType + ' with NFC');
  }
  
  navigator.nfc.addMimeTypeListener(mimeType, onNfc, win, fail);
          
};

document.addEventListener('deviceready', ready, false);
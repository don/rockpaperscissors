/*global NdefPlugin, Ndef */
var choice = null;

function onNfc(nfcEvent) {
  console.log(JSON.stringify(nfcEvent.tagData));

  var records = nfcEvent.tagData,
      opponentsChoice = Ndef.bytesToString(records[0].payload),
      result;
  
  // If choice is null, prompt the user or wait for a choice, then determine the winner
  
  // TODO clean up logic, doesn't handle edge cases
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
      alert("Tie! " + choice);
  } else if (result === "win") {
      alert("You WIN!  " + choice + " beats " + opponentsChoice); // TODO grammar for Scissors
  } else {
      alert("You LOOSE!  " + opponentsChoice + " beats " + choice);      
  }
  navigator.notification.vibrate(100);   
}

function choose(text) {
    choice = text;
    // TODO write choice as peer to peer message
}

var ready = function () {
  var mimeType = "game/rockpaperscissors", 
      buttons = document.getElementsByTagName('button');
  
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () { choose(this.innerHTML); }, false);
  }
      
  function win() {
    console.log("Listening for tags with mime type "+ tagMimeType);
  }
  
  function fail() {
    alert('Failed to register mime type ' + tagMimeType + ' with NFC');
  }
  
  window.plugins.NdefPlugin.addMimeTypeListener(tagMimeType, onNfc, win, fail);
  // don't want this but need as a hack
  window.plugins.NdefPlugin.addNdefFormattableListener(function () { alert("This tag is formattable"); });
          
};

// deviceready is being called before the plugins finish initializing
// add setTimeout as a kludge until the real problem is fixed
document.addEventListener('deviceready', function () { window.setTimeout(ready, 500); }, false);
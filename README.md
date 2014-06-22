# Rock Paper Scissors

Demo web app that allows you to play Rock Paper Scissors with another user via NFC

* Reads NFC tags
* Writes NFC peer to peer messages

Warning

The RockPaperScissors demo was written for Android 2.3.3, where the phone sent the NFC message to the peer immediately. Later versions of Android changed how this worked. Google added "push to beam" functionality which essentially breaks this demo.

Requires 

* Google Nexus S phone
* PhoneGap 1.0
* phonegap-nfc plugin

Building 

PhoneGap 1.0 is included in the project

Build instructions assume you have the following installed
 * Android SDK
 * Android API Level 10 (2.3.3)
 * Apache Ant
 * Java SDK
 
$ git clone https://github.com/don/rockpaperscissors
$ cd rockpaperscissors/
$ ln -s lib libs
$ android update project -p . -t android-10
$ ant debug install


See [phonegap-nfc](https://github.com/chariotsolutions/phonegap-nfc) for more info